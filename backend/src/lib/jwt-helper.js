/**
 * JWT Helper
 * Utility functions for JWT token generation and verification
 */

import jwt from 'jsonwebtoken';
import config from '../config.js';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object
 * @param {Object} options - Token options
 * @returns {string} - JWT token
 */
export const generateToken = (user, options = {}) => {
  // Đảm bảo user_id hoặc id được cung cấp
  const userId = user.user_id || user.id;
  
  if (!user || !userId) {
    throw new Error('Invalid user object provided for token generation');
  }
  
  // Default options
  const defaultOptions = {
    expiresIn: config.jwtExpires || '24h'
  };
  
  // Merge options
  const tokenOptions = { ...defaultOptions, ...options };
  
  // Create payload with essential user information
  const payload = {
    id: userId, // Sử dụng ID từ user_id hoặc id
    username: user.username,
    email: user.email,
    role: user.role
  };

  // Add any additional claims if provided
  if (options.additionalClaims) {
    Object.assign(payload, options.additionalClaims);
  }

  try {
    return jwt.sign(payload, config.jwtSecret, tokenOptions);
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  if (!token) {
    return null;
  }
  
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} - JWT token or null if invalid format
 */
export const extractToken = (authHeader) => {
  if (!authHeader || typeof authHeader !== 'string') {
    return null;
  }
  
  // Check if it's Bearer token
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  
  return null;
};

/**
 * Decode token without verification
 * Useful for debugging or getting token metadata
 * @param {string} token - JWT token
 * @returns {Object|null} - Decoded token payload or null if invalid format
 */
export const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('JWT decode error:', error.message);
    return null;
  }
};

/**
 * Check if a token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired or invalid, false otherwise
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  // Check expiration (exp is in seconds)
  const expirationTime = decoded.exp * 1000;
  return Date.now() >= expirationTime;
};