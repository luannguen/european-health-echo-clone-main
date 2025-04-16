/**
 * API Testing Script
 * This script will start the server and test API endpoints
 */

import { startServer, stopServer } from '../server.js';
import fetch from 'node-fetch';
import config from '../config.js';

// Configuration from central config
const PORT = 3001;
const API_URL = `http://localhost:${PORT}${config.paths.apiBasePath}`;
let authToken = null;
let testUserId = null;
let server = null;

/**
 * Test the role management APIs
 */
async function testRoleManagementAPI() {
  console.log('=============================');
  console.log('   ROLE MANAGEMENT API TEST  ');
  console.log('=============================\n');
  
  try {
    // Start the server
    console.log('Starting API server on port', PORT, '...');
    server = await startServer(PORT);
    console.log('✅ Server started successfully!\n');
    
    // Wait a bit to make sure server is ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 1: Login as admin to get token
    console.log('1. Authenticating as admin...');
    try {
      // Use the exact admin credentials from the config file
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: config.defaultAdmin.username,
          password: config.defaultAdmin.password  // Using the plain text password from config
        })
      });
      
      if (!loginRes.ok) {
        const errorText = await loginRes.text();
        console.log('Login response:', errorText);
        throw new Error(`Login failed with status ${loginRes.status}`);
      }
      
      const loginData = await loginRes.json();
      authToken = loginData.data.token;
      console.log('✅ Authentication successful, received token\n');
      
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      // Try with alternative admin credentials
      try {
        console.log('Trying alternative admin credentials...');
        const altLoginRes = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: config.defaultAdmin.username,
            password: 'Admin@123456'  // Try the standard password
          })
        });
        
        if (!altLoginRes.ok) {
          throw new Error(`Alt login failed with status ${altLoginRes.status}`);
        }
        
        const altLoginData = await altLoginRes.json();
        authToken = altLoginData.data.token;
        console.log('✅ Authentication successful with alternative credentials\n');
      } catch (altError) {
        console.error('❌ Alternative authentication failed:', altError.message);
        throw new Error('Could not authenticate with admin credentials');
      }
    }
    
    // Test Roles API Endpoints
    console.log('2. Testing Role API endpoints:');
    
    try {
      // 2.1 Get all roles
      console.log('  2.1. Getting all roles...');
      const rolesRes = await fetch(`${API_URL}/roles`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!rolesRes.ok) {
        throw new Error(`Failed to get roles: ${rolesRes.status}`);
      }
      
      const rolesData = await rolesRes.json();
      console.log('  ✅ Available roles:', rolesData.data);
      
      // 2.2 Get default roles
      console.log('  2.2. Getting default roles...');
      const defaultRolesRes = await fetch(`${API_URL}/roles/defaults`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!defaultRolesRes.ok) {
        throw new Error(`Failed to get default roles: ${defaultRolesRes.status}`);
      }
      
      const defaultRolesData = await defaultRolesRes.json();
      console.log('  ✅ Default roles:', defaultRolesData.data);
      
      // 2.3 Validate role
      console.log('  2.3. Validating roles...');
      // Valid role
      const validRoleRes = await fetch(`${API_URL}/roles/validate/${config.roles.EDITOR}`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!validRoleRes.ok) {
        throw new Error(`Failed to validate role: ${validRoleRes.status}`);
      }
      
      const validRoleData = await validRoleRes.json();
      console.log('  ✅ Valid role check result:', validRoleData.data);
      
      // Invalid role
      const invalidRoleRes = await fetch(`${API_URL}/roles/validate/invalid_role`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!invalidRoleRes.ok) {
        throw new Error(`Failed to validate invalid role: ${invalidRoleRes.status}`);
      }
      
      const invalidRoleData = await invalidRoleRes.json();
      console.log('  ✅ Invalid role check result:', invalidRoleData.data);
      
    } catch (error) {
      console.error('❌ Role API tests failed:', error.message);
    }
    
    // Test User API Endpoints
    console.log('\n3. Testing User API endpoints:');
    
    try {
      // 3.1 Get all users
      console.log('  3.1. Getting users...');
      const usersRes = await fetch(`${API_URL}/users`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!usersRes.ok) {
        throw new Error(`Failed to get users: ${usersRes.status}`);
      }
      
      const usersData = await usersRes.json();
      console.log(`  ✅ Retrieved ${usersData.data.length} users`);
      
      // 3.2 Get valid roles via user API
      console.log('  3.2. Getting valid roles via user API...');
      const userRolesRes = await fetch(`${API_URL}/users/roles`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!userRolesRes.ok) {
        throw new Error(`Failed to get user roles: ${userRolesRes.status}`);
      }
      
      const userRolesData = await userRolesRes.json();
      console.log('  ✅ User valid roles:', userRolesData.data);
      
      // 3.3 Create a test user without specifying role
      console.log('  3.3. Creating a test user without specifying role...');
      const createUserRes = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: `testuser_${Date.now()}`,
          email: `testuser_${Date.now()}@example.com`,
          password: 'password123',
          full_name: 'Test User'
          // Not specifying role, should use default
        })
      });
      
      if (!createUserRes.ok) {
        const errorText = await createUserRes.text();
        console.log('Create user response:', errorText);
        throw new Error(`Failed to create user: ${createUserRes.status}`);
      }
      
      const userData = await createUserRes.json();
      testUserId = userData.data.id;
      console.log('  ✅ Test user created:', {
        id: userData.data.id,
        username: userData.data.username,
        role: userData.data.role
      });
      console.log(`     Default role assigned: ${userData.data.role}`);
      
      // 3.4 Update user role
      console.log('  3.4. Updating test user role to editor...');
      const updateUserRes = await fetch(`${API_URL}/users/${testUserId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: config.roles.EDITOR
        })
      });
      
      if (!updateUserRes.ok) {
        throw new Error(`Failed to update user: ${updateUserRes.status}`);
      }
      
      const updatedUserData = await updateUserRes.json();
      console.log('  ✅ User updated:', {
        id: updatedUserData.data.id,
        username: updatedUserData.data.username,
        role: updatedUserData.data.role
      });
      console.log(`     New role: ${updatedUserData.data.role}`);
      
      // 3.5 Check if user has role
      console.log(`  3.5. Checking if test user has ${config.roles.EDITOR} role...`);
      const checkRoleRes = await fetch(`${API_URL}/users/${testUserId}/has-role/${config.roles.EDITOR}`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!checkRoleRes.ok) {
        throw new Error(`Failed to check user role: ${checkRoleRes.status}`);
      }
      
      const checkRoleData = await checkRoleRes.json();
      console.log('  ✅ User role check result:', checkRoleData.data);
      
      // 3.6 Try to update user with invalid role
      console.log('  3.6. Trying to update user with invalid role...');
      const invalidUpdateRes = await fetch(`${API_URL}/users/${testUserId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: 'invalid_role'
        })
      });
      
      const invalidUpdateData = await invalidUpdateRes.json();
      console.log('  ✅ Invalid role update response:', {
        status: invalidUpdateRes.status,
        success: invalidUpdateData.success,
        message: invalidUpdateData.message
      });
      
      // 3.7 Delete test user
      console.log('  3.7. Deleting test user...');
      const deleteUserRes = await fetch(`${API_URL}/users/${testUserId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!deleteUserRes.ok) {
        throw new Error(`Failed to delete user: ${deleteUserRes.status}`);
      }
      
      const deleteData = await deleteUserRes.json();
      console.log('  ✅ User deletion result:', deleteData.data);
      
    } catch (error) {
      console.error('❌ User API tests failed:', error.message);
    }
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
  } finally {
    // Stop the server
    if (server) {
      console.log('\nStopping the server...');
      await stopServer();
      console.log('Server stopped.');
    }
  }
}

// Run the test
testRoleManagementAPI().catch(console.error);