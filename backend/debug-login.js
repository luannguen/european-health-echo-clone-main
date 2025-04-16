/**
 * Debug Login Script
 * 
 * This script directly attempts to authenticate using the admin credentials
 * to help debug the authentication issue.
 */

import dbService from './src/lib/db-manager.js';
import config from './src/config.js';
import bcrypt from 'bcrypt';

async function debugLogin() {
  try {
    console.log('Connecting to database...');
    await dbService.init(null, false);
    console.log('Database connected!');
    
    const username = config.defaultAdmin.username;
    console.log(`Attempting to fetch user with username "${username}"...`);
    
    // Directly query the database to find the user
    const userQuery = `
      SELECT * FROM users WHERE username = @username
    `;
    
    const userResult = await dbService.executeQuery(userQuery, { username });
    
    if (userResult.recordset.length === 0) {
      console.error(`No user found with username "${username}"`);
      return;
    }
    
    const user = userResult.recordset[0];
    console.log('User found in database:');
    console.log('- ID:', user.id);
    console.log('- Username:', user.username);
    console.log('- Email:', user.email);
    console.log('- Role:', user.role);
    console.log('- Has Password:', !!user.password);
    
    // Check password
    const passwordMatches = await bcrypt.compare(config.defaultAdmin.password, user.password);
    console.log(`Password matches: ${passwordMatches}`);
    
    // Examine table structure
    console.log('\nExamining users table structure...');
    const tableSchema = await dbService.executeQuery(`
      SELECT 
        COLUMN_NAME, 
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'users'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log('Users table structure:');
    tableSchema.recordset.forEach(column => {
      console.log(`- ${column.COLUMN_NAME} (${column.DATA_TYPE}${column.CHARACTER_MAXIMUM_LENGTH ? `(${column.CHARACTER_MAXIMUM_LENGTH})` : ''})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dbService.close();
    console.log('Database connection closed');
  }
}

debugLogin();