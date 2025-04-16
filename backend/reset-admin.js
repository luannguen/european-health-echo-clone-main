/**
 * Admin Password Reset Script
 * 
 * This script resets the admin user's password to match the one in config
 * or creates an admin user if one doesn't exist yet.
 */

import dbService from './src/lib/db-manager.js';
import config from './src/config.js';
import bcrypt from 'bcrypt';

async function resetAdminUser() {
  try {
    console.log('Connecting to database...');
    await dbService.init(null, false);
    console.log('Database connected!');
    
    // Hash the admin password
    const hashedPassword = await bcrypt.hash(config.defaultAdmin.password, 10);
    console.log('Admin password hashed successfully');
    
    // Check if admin user exists
    const adminResult = await dbService.executeQuery(`
      SELECT COUNT(*) as count FROM users WHERE username = @username
    `, { username: config.defaultAdmin.username });
    
    if (adminResult.recordset[0].count > 0) {
      // Admin exists, update password
      console.log('Admin user found. Updating password...');
      
      await dbService.executeQuery(`
        UPDATE users
        SET password = @password, updated_at = GETDATE()
        WHERE username = @username
      `, { 
        username: config.defaultAdmin.username,
        password: hashedPassword
      });
      
      console.log('Admin password reset successfully');
    } else {
      // Admin doesn't exist, create user
      console.log('Admin user not found. Creating admin user...');
      
      await dbService.executeQuery(`
        INSERT INTO users (username, email, password, full_name, role, is_active, created_at, updated_at)
        VALUES (@username, @email, @password, @fullName, @role, 1, GETDATE(), GETDATE())
      `, { 
        username: config.defaultAdmin.username, 
        email: config.defaultAdmin.email || 'admin@vrc.com.vn',
        password: hashedPassword,
        fullName: config.defaultAdmin.fullName || 'System Administrator',
        role: config.roles.ADMIN
      });
      
      console.log('Admin user created successfully');
    }
    
    console.log('Admin credentials:');
    console.log('  Username:', config.defaultAdmin.username);
    console.log('  Password:', config.defaultAdmin.password);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dbService.close();
    console.log('Database connection closed');
  }
}

resetAdminUser();
