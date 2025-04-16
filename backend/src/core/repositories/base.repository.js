/**
 * Base Repository
 * Generic repository pattern implementation for database operations
 */

import dbService from '../services/db.service.js';

/**
 * BaseRepository provides a generic implementation for common database operations
 */
class BaseRepository {
  /**
   * Create a new BaseRepository instance
   * @param {string} tableName - The name of the database table
   * @param {string} primaryKey - The primary key column name (default: 'id')
   */
  constructor(tableName, primaryKey = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.db = dbService;
  }

  /**
   * Get all records from the table
   * @param {Object} options - Query options
   * @param {number} options.limit - Maximum number of records to return
   * @param {number} options.offset - Number of records to skip
   * @param {string} options.orderBy - Column to order by
   * @param {string} options.orderDir - Order direction ('ASC' or 'DESC')
   * @param {Object} options.where - Where conditions
   * @returns {Promise<Array>} - Array of records
   */
  async findAll(options = {}) {
    const limit = options.limit || 100;
    const offset = options.offset || 0;
    const orderBy = options.orderBy || this.primaryKey;
    const orderDir = options.orderDir || 'ASC';
    
    let query = `SELECT * FROM ${this.tableName}`;
    const params = {};
    
    // Add where conditions if provided
    if (options.where && Object.keys(options.where).length > 0) {
      const whereClauses = [];
      Object.entries(options.where).forEach(([key, value], index) => {
        const paramName = `where${index}`;
        whereClauses.push(`${key} = @${paramName}`);
        params[paramName] = value;
      });
      
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    
    // Add order by
    query += ` ORDER BY ${orderBy} ${orderDir}`;
    
    // Add pagination
    query += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    
    const result = await this.db.executeQuery(query, params);
    return result.recordset;
  }

  /**
   * Find a record by its primary key
   * @param {number|string} id - The primary key value
   * @returns {Promise<Object|null>} - The found record or null
   */
  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = @id`;
    const result = await this.db.executeQuery(query, { id });
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Find records by specific field value
   * @param {string} field - Field name
   * @param {any} value - Field value
   * @returns {Promise<Array>} - Found records
   */
  async findByField(field, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = @value`;
    const result = await this.db.executeQuery(query, { value });
    return result.recordset;
  }

  /**
   * Find one record by field value
   * @param {string} field - Field name
   * @param {any} value - Field value
   * @returns {Promise<Object|null>} - The found record or null
   */
  async findOneByField(field, value) {
    const query = `SELECT TOP 1 * FROM ${this.tableName} WHERE ${field} = @value`;
    const result = await this.db.executeQuery(query, { value });
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Create a new record
   * @param {Object} data - The data to insert
   * @returns {Promise<Object>} - The created record
   */
  async create(data) {
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided for creation');
    }

    const columns = Object.keys(data).join(', ');
    const paramNames = Object.keys(data).map(key => `@${key}`).join(', ');
    
    // Use a two-step approach to avoid trigger issues with OUTPUT
    const query = `
      INSERT INTO ${this.tableName} (${columns})
      VALUES (${paramNames});
      
      SELECT * FROM ${this.tableName} 
      WHERE ${this.primaryKey} = SCOPE_IDENTITY();
    `;

    const result = await this.db.executeQuery(query, data);
    return result.recordset[0];
  }

  /**
   * Update a record by its primary key
   * @param {number|string} id - The primary key value
   * @param {Object} data - The data to update
   * @returns {Promise<Object|null>} - The updated record or null
   */
  async update(id, data) {
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const setClause = Object.keys(data)
      .map(key => `${key} = @${key}`)
      .join(', ');

    // Use a two-step approach to avoid trigger issues with OUTPUT
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE ${this.primaryKey} = @id;
      
      SELECT * FROM ${this.tableName}
      WHERE ${this.primaryKey} = @id;
    `;

    const params = { ...data, id };
    const result = await this.db.executeQuery(query, params);
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Delete a record by its primary key
   * @param {number|string} id - The primary key value
   * @returns {Promise<boolean>} - True if deleted, false otherwise
   */
  async delete(id) {
    // First check if the record exists
    const checkQuery = `SELECT ${this.primaryKey} FROM ${this.tableName} WHERE ${this.primaryKey} = @id`;
    const checkResult = await this.db.executeQuery(checkQuery, { id });
    
    if (checkResult.recordset.length === 0) {
      return false;
    }
    
    // Then delete the record
    const query = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = @id`;
    const result = await this.db.executeQuery(query, { id });
    
    return true;
  }

  /**
   * Count records in the table
   * @param {Object} where - Where conditions
   * @returns {Promise<number>} - Number of records
   */
  async count(where = {}) {
    let query = `SELECT COUNT(*) AS total FROM ${this.tableName}`;
    const params = {};
    
    // Add where conditions if provided
    if (Object.keys(where).length > 0) {
      const whereClauses = [];
      Object.entries(where).forEach(([key, value], index) => {
        const paramName = `where${index}`;
        whereClauses.push(`${key} = @${paramName}`);
        params[paramName] = value;
      });
      
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    
    const result = await this.db.executeQuery(query, params);
    return result.recordset[0].total;
  }

  /**
   * Execute custom SQL query
   * @param {string} query - SQL query
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Query result
   */
  async executeRaw(query, params = {}) {
    return await this.db.executeQuery(query, params);
  }

  /**
   * Execute query in a transaction
   * @param {Function} callback - Callback function that takes a transaction object
   * @returns {Promise<any>} - Transaction result
   */
  async executeTransaction(callback) {
    return await this.db.executeTransaction(callback);
  }
}

export default BaseRepository;