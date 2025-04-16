/**
 * Database Connection Service
 * Core service for managing SQL Server database connections
 */

import pkg from 'mssql';
const { connect, Transaction } = pkg;
import config from '../../config.js';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

/**
 * Database Connection Service
 * Enhanced version with microservice capabilities for handling 
 * SQL Server database connections throughout the application
 */
class DbService extends EventEmitter {
  constructor() {
    super();
    this.pool = null;
    this.connectionConfig = config.sql;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectInterval = 5000; // 5 seconds
    this.connectionStatus = 'disconnected';
    this.healthCheckInterval = null;
    this.healthCheckFrequency = 30000; // 30 seconds
  }

  /**
   * Get current connection status
   * @returns {string} - Status of the connection ('connected', 'connecting', 'disconnected', 'error')
   */
  getStatus() {
    return this.connectionStatus;
  }

  /**
   * Update connection configuration
   * @param {Object} newConfig - New configuration parameters
   */
  updateConfig(newConfig) {
    this.connectionConfig = { ...this.connectionConfig, ...newConfig };
    this.emit('config-updated', this.connectionConfig);
    console.log('Database connection configuration updated');
    return this.connectionConfig;
  }

  /**
   * Initialize connection pool with optional custom config
   * @param {Object} customConfig - Optional custom connection config
   * @param {boolean} setupTables - Whether to check and setup tables
   */
  async init(customConfig = null, setupTables = true) {
    // If already connecting, wait for it to finish
    if (this.isConnecting) {
      console.log('Connection attempt already in progress');
      return new Promise((resolve) => {
        this.once('connected', () => resolve(this.pool));
      });
    }

    try {
      this.isConnecting = true;
      this.connectionStatus = 'connecting';
      this.emit('connecting');
      
      if (customConfig) {
        this.updateConfig(customConfig);
      }

      // Close existing pool if it exists
      if (this.pool) {
        try {
          await this.pool.close();
        } catch (err) {
          console.log('Error closing existing pool:', err.message);
        }
        this.pool = null;
      }

      // Create new connection pool
      this.pool = await connect(this.connectionConfig);
      
      this.connectionStatus = 'connected';
      this.reconnectAttempts = 0;
      this.isConnecting = false;
      this.emit('connected', this.pool);
      
      console.log('Database connection established successfully');
      
      // Setup health check monitoring
      this.setupHealthCheck();

      // Check and create tables if needed
      if (setupTables) {
        await this.checkAndCreateTables();
      }
      
      return this.pool;
    } catch (error) {
      this.connectionStatus = 'error';
      this.isConnecting = false;
      this.emit('error', error);
      
      console.error('Error connecting to database:', error);
      
      // Try to reconnect if appropriate
      this.attemptReconnect();
      
      throw error;
    }
  }

  /**
   * Setup periodic health check for the connection
   */
  setupHealthCheck() {
    // Clear any existing interval
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    // Set up new health check
    this.healthCheckInterval = setInterval(async () => {
      try {
        if (!this.pool || this.connectionStatus !== 'connected') {
          return;
        }
        
        // Simple query to test connection
        await this.executeQuery('SELECT 1 AS HealthCheck');
        this.emit('health-check-success');
      } catch (error) {
        console.warn('Database connection health check failed:', error.message);
        this.emit('health-check-failed', error);
        
        // Connection might be broken, try to reconnect
        if (this.connectionStatus === 'connected') {
          this.connectionStatus = 'error';
          this.attemptReconnect();
        }
      }
    }, this.healthCheckFrequency);
  }

  /**
   * Attempt to reconnect to the database
   */
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Maximum reconnection attempts (${this.maxReconnectAttempts}) reached`);
      this.emit('reconnect-failed');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      this.emit('reconnecting', this.reconnectAttempts);
      this.init().catch(() => {
        // Error handling is already done in init()
      });
    }, this.reconnectInterval);
  }

  /**
   * Get connection pool (initialize if needed)
   * @returns {Promise<Object>} - SQL connection pool
   */
  async getPool() {
    if (!this.pool || this.connectionStatus !== 'connected') {
      return await this.init();
    }
    return this.pool;
  }

  /**
   * Execute a query with automatic reconnection if needed
   * @param {string} query - SQL query
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Query result
   */
  async executeQuery(query, params = {}) {
    try {
      const pool = await this.getPool();
      const request = pool.request();

      // Add parameters to request
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });

      const result = await request.query(query);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      
      // If it's a connection issue, try to reconnect
      if (this.isConnectionError(error)) {
        this.connectionStatus = 'error';
        this.attemptReconnect();
      }
      
      throw error;
    }
  }

  /**
   * Execute a stored procedure with automatic reconnection if needed
   * @param {string} procedureName - Stored procedure name
   * @param {Object} params - Stored procedure parameters
   * @returns {Promise<Object>} - Procedure result
   */
  async executeStoredProcedure(procedureName, params = {}) {
    try {
      const pool = await this.getPool();
      const request = pool.request();

      // Add parameters to request
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });

      const result = await request.execute(procedureName);
      return result;
    } catch (error) {
      console.error(`Error executing stored procedure ${procedureName}:`, error);
      
      // If it's a connection issue, try to reconnect
      if (this.isConnectionError(error)) {
        this.connectionStatus = 'error';
        this.attemptReconnect();
      }
      
      throw error;
    }
  }

  /**
   * Execute a transaction with multiple queries
   * @param {Function} callback - Callback function that takes a transaction object
   * @returns {Promise<any>} - Transaction result
   */
  async executeTransaction(callback) {
    const pool = await this.getPool();
    const transaction = new Transaction(pool);

    try {
      await transaction.begin();
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      console.error('Transaction error:', error);
      
      // If it's a connection issue, try to reconnect
      if (this.isConnectionError(error)) {
        this.connectionStatus = 'error';
        this.attemptReconnect();
      }
      
      throw error;
    }
  }

  /**
   * Check if an error is related to connection issues
   * @param {Error} error - Error to check
   * @returns {boolean} - True if it's a connection error
   */
  isConnectionError(error) {
    // List of error codes that indicate connection issues
    const connectionErrorCodes = [
      'ETIMEOUT', 'ECONNRESET', 'ECONNREFUSED', 'EPIPE',
      'PROTOCOL_CONNECTION_LOST', 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'
    ];
    
    return connectionErrorCodes.includes(error.code) || 
           (error.originalError && connectionErrorCodes.includes(error.originalError.code));
  }

  /**
   * Close connection pool and stop health check
   */
  async close() {
    try {
      // Stop health check
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
        this.healthCheckInterval = null;
      }
      
      // Close pool if exists
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        this.connectionStatus = 'disconnected';
        this.emit('disconnected');
        console.log('Database connection closed');
      }
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
  
  /**
   * Get database info and test server connectivity
   * @returns {Promise<Object>} - Database information
   */
  async getDatabaseInfo() {
    try {
      const result = await this.executeQuery(`
        SELECT 
          DB_NAME() as DatabaseName,
          SERVERPROPERTY('ProductVersion') as ServerVersion,
          SERVERPROPERTY('Edition') as ServerEdition,
          @@VERSION as FullVersion
      `);
      
      return result.recordset[0];
    } catch (error) {
      console.error('Error getting database info:', error);
      throw error;
    }
  }
  
  /**
   * Test connection without establishing a pool
   * @param {Object} testConfig - Optional test configuration 
   * @returns {Promise<Object>} - Test result
   */
  async testConnection(testConfig = null) {
    const configToTest = testConfig || this.connectionConfig;
    let testPool = null;
    
    try {
      console.log('Testing database connection...');
      const startTime = Date.now();
      
      testPool = await connect(configToTest);
      
      // Run simple query to verify full connectivity
      const result = await testPool.request().query('SELECT DB_NAME() as DatabaseName');
      
      const connectionTime = Date.now() - startTime;
      
      return {
        success: true,
        message: 'Connection successful',
        databaseName: result.recordset[0].DatabaseName,
        connectionTimeMs: connectionTime
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection failed',
        error: error.message,
        errorCode: error.code || (error.originalError ? error.originalError.code : null)
      };
    } finally {
      if (testPool) {
        await testPool.close();
      }
    }
  }

  /**
   * Check and create required tables
   */
  async checkAndCreateTables() {
    try {
      console.log('Checking database tables...');
      
      // Get SQL directory path from config
      const sqlDir = config.paths.sqlDir;
      
      // Check if directory exists
      if (!fs.existsSync(sqlDir)) {
        console.log('Creating SQL directory');
        fs.mkdirSync(sqlDir, { recursive: true });
      }

      // Get users table SQL file path from config
      const usersTableSqlPath = config.paths.usersTableSql;
      
      // Create users table SQL file if it doesn't exist
      if (!fs.existsSync(usersTableSqlPath)) {
        console.log('Creating users table SQL file');
        const usersTableSql = `
-- SQL Script để tạo bảng users với cấu trúc phù hợp
-- Kiểm tra xem bảng users đã tồn tại chưa
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    -- Tạo bảng users nếu chưa tồn tại
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        password NVARCHAR(255) NOT NULL,
        full_name NVARCHAR(255),
        role NVARCHAR(50) NOT NULL DEFAULT '${config.defaultRole}',
        is_active BIT NOT NULL DEFAULT 1,
        last_login DATETIME,
        created_at DATETIME NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME NOT NULL DEFAULT GETDATE()
    );

    -- Thêm các ràng buộc duy nhất
    ALTER TABLE users ADD CONSTRAINT UQ_users_username UNIQUE (username);
    ALTER TABLE users ADD CONSTRAINT UQ_users_email UNIQUE (email);
    
    -- Thêm ràng buộc cho cột role
    ALTER TABLE users ADD CONSTRAINT CK_users_role CHECK (role IN ('${config.roles.CUSTOMER}', '${config.roles.ADMIN}', '${config.roles.EDITOR}'));

    PRINT 'Đã tạo bảng users thành công';
END
ELSE
BEGIN
    -- Kiểm tra xem cột is_active đã tồn tại chưa
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'is_active' AND object_id = OBJECT_ID('users'))
    BEGIN
        -- Thêm cột is_active nếu chưa tồn tại
        ALTER TABLE users ADD is_active BIT NOT NULL DEFAULT 1;
        PRINT 'Đã thêm cột is_active vào bảng users';
    END

    -- Kiểm tra và thêm các cột khác nếu cần
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'role' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD role NVARCHAR(50) NOT NULL DEFAULT '${config.defaultRole}';
        PRINT 'Đã thêm cột role vào bảng users';
    END

    -- Check for role constraint and add if it doesn't exist
    IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'CK_users_role' AND parent_object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD CONSTRAINT CK_users_role CHECK (role IN ('${config.roles.CUSTOMER}', '${config.roles.ADMIN}', '${config.roles.EDITOR}'));
        PRINT 'Đã thêm ràng buộc cho cột role vào bảng users';
    END

    PRINT 'Đã cập nhật bảng users thành công';
END
`;
        fs.writeFileSync(usersTableSqlPath, usersTableSql);
      }

      // Execute users table SQL file
      console.log('Executing users table SQL file');
      const usersTableSql = fs.readFileSync(usersTableSqlPath, 'utf8');
      await this.executeQuery(usersTableSql);
      
      // Path to password reset tokens table SQL file
      const passwordResetTableSqlPath = path.resolve(sqlDir, 'create-password-reset-table.sql');
      
      if (!fs.existsSync(passwordResetTableSqlPath)) {
        console.log('Creating password reset tokens table SQL file');
        const passwordResetTableSql = `
-- SQL Script to create password_reset_tokens table
-- Check if the table exists
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'password_reset_tokens')
BEGIN
    -- Create the table if it doesn't exist
    CREATE TABLE password_reset_tokens (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        token NVARCHAR(100) NOT NULL,
        token_hash NVARCHAR(255) NOT NULL, -- Store hashed token for security
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT GETDATE(),
        used BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_password_reset_tokens_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Add index for faster token lookup
    CREATE INDEX IDX_password_reset_tokens_token_hash ON password_reset_tokens (token_hash);
    
    PRINT 'Created password_reset_tokens table successfully';
END
ELSE
BEGIN
    PRINT 'password_reset_tokens table already exists';
    
    -- Check if the used column exists, add it if not
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'used' AND object_id = OBJECT_ID('password_reset_tokens'))
    BEGIN
        ALTER TABLE password_reset_tokens ADD used BIT NOT NULL DEFAULT 0;
        PRINT 'Added used column to password_reset_tokens table';
    END
END`;
        fs.writeFileSync(passwordResetTableSqlPath, passwordResetTableSql);
      }

      // Execute password reset tokens table SQL file
      console.log('Executing password reset tokens table SQL file');
      const passwordResetTableSql = fs.readFileSync(passwordResetTableSqlPath, 'utf8');
      await this.executeQuery(passwordResetTableSql);
      
      console.log('All database tables checked and created if needed');
      
      // Check if admin user exists
      const adminResult = await this.executeQuery(`
        SELECT COUNT(*) as count FROM users WHERE role = '${config.roles.ADMIN}'
      `);
      
      if (adminResult.recordset[0].count === 0) {
        console.log('No admin user found, creating default admin user');
        
        // Import bcrypt for password hashing
        const bcrypt = await import('bcrypt');
        
        // Hash the admin password with bcrypt (use 10 rounds for faster tests)
        const hashedPassword = await bcrypt.hash(config.defaultAdmin.password, 10);
        
        // Create admin user with credentials from config
        await this.executeQuery(`
          INSERT INTO users (username, email, password, full_name, role, is_active, created_at, updated_at)
          VALUES (@username, @email, @password, @fullName, @role, 1, GETDATE(), GETDATE())
        `, { 
          username: config.defaultAdmin.username, 
          email: config.defaultAdmin.email || 'admin@vrc.com.vn',
          password: hashedPassword,
          fullName: config.defaultAdmin.fullName || 'System Administrator',
          role: config.roles.ADMIN
        });
        
        console.log('Default admin user created');
      } else {
        console.log('Admin user already exists, skipping creation');
      }
    } catch (error) {
      console.error('Error checking and creating tables:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const dbService = new DbService();

// Export as default and named export
export { dbService };
export default dbService;