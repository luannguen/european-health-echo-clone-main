// Database connection microservice
import pkg from 'mssql';
const { connect, Transaction } = pkg;
import config from '../config.js';
import EventEmitter from 'events';

/**
 * Database Connection Microservice
 * Enhanced version of DatabaseManager with microservice capabilities for handling 
 * SQL Server database connections throughout the application
 */
class DbConnectionService extends EventEmitter {
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
   */
  async init(customConfig = null) {
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
}

// Create and export a singleton instance
const dbService = new DbConnectionService();

// Export as default and named export
export { dbService };
export default dbService;