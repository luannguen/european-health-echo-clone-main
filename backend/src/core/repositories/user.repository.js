/**
 * User Repository
 * Repository implementation for user-related database operations
 */

import BaseRepository from './base.repository.js';

/**
 * UserRepository handles all database operations related to users
 * Extends the BaseRepository for common CRUD operations
 */
class UserRepository extends BaseRepository {
  constructor() {
    // Specify table name and primary key column
    super('users', 'id');
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async findByEmail(email) {
    return await this.findOneByField('email', email);
  }

  /**
   * Find a user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async findByUsername(username) {
    return await this.findOneByField('username', username);
  }

  /**
   * Find users by role
   * @param {string} role - User role
   * @returns {Promise<Array>} - Array of users with the specified role
   */
  async findByRole(role) {
    return await this.findByField('role', role);
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} - True if email exists
   */
  async emailExists(email) {
    const count = await this.count({ email });
    return count > 0;
  }

  /**
   * Check if username exists
   * @param {string} username - Username to check
   * @returns {Promise<boolean>} - True if username exists
   */
  async usernameExists(username) {
    const count = await this.count({ username });
    return count > 0;
  }

  /**
   * Get users with pagination and filtering
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (1-based)
   * @param {number} options.pageSize - Page size
   * @param {string} options.sortBy - Sort by field
   * @param {string} options.sortDir - Sort direction ('asc' or 'desc')
   * @param {string} options.search - Search term for name/email/username
   * @param {string} options.role - Filter by role
   * @returns {Promise<Object>} - Paginated users with metadata
   */
  async getUsers(options = {}) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const offset = (page - 1) * pageSize;
    const sortBy = options.sortBy || 'created_at';
    const sortDir = options.sortDir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    
    // Build the query
    let query = `
      SELECT 
        id,
        username,
        email,
        full_name,
        role,
        is_active,
        last_login,
        created_at,
        updated_at
      FROM users
    `;
    
    const params = {};
    const whereClauses = [];
    
    // Add search condition if provided
    if (options.search) {
      whereClauses.push(`(
        username LIKE @search
        OR email LIKE @search
        OR full_name LIKE @search
      )`);
      params.search = `%${options.search}%`;
    }
    
    // Add role filter if provided
    if (options.role) {
      whereClauses.push('role = @role');
      params.role = options.role;
    }
    
    // Add where clause if needed
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }
    
    // Count total matching records for pagination metadata
    const countQuery = `
      SELECT COUNT(*) AS total FROM users
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
    `;
    
    const countResult = await this.db.executeQuery(countQuery, params);
    const total = countResult.recordset[0].total;
    
    // Add sorting and pagination
    query += `
      ORDER BY ${sortBy} ${sortDir}
      OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY
    `;
    
    // Execute the query
    const result = await this.db.executeQuery(query, params);
    
    // Return paginated result with metadata
    return {
      data: result.recordset,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasMore: page < Math.ceil(total / pageSize)
      }
    };
  }

  /**
   * Update user's last login time
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async updateLastLogin(userId) {
    await this.update(userId, { last_login: new Date() });
  }
}

// Create and export a singleton instance
const userRepository = new UserRepository();
export default userRepository;