/**
 * Script test thủ công các API đặt lại mật khẩu
 */

import fetch from 'node-fetch';
import config from './src/config.js';

// Configuration
const API_URL = `http://localhost:3001${config.paths.apiBasePath}`;
let authToken = null;
let testUserId = null;
let testUserEmail = null;
let testUsername = null;
let resetToken = null;

/**
 * Thực hiện test thủ công
 */
async function manualPasswordResetTest() {
  console.log('=============================');
  console.log('  MANUAL PASSWORD RESET TEST  ');
  console.log('=============================\n');
  
  try {
    console.log(`Sử dụng API URL: ${API_URL}`);

    // Step 1: Login as admin to get token
    console.log('\n1. Đăng nhập với tài khoản admin...');
    try {
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'Admin@123456'
        })
      });
      
      if (!loginRes.ok) {
        const errorText = await loginRes.text();
        console.log('Kết quả đăng nhập:', errorText);
        throw new Error(`Đăng nhập thất bại với mã ${loginRes.status}`);
      }
      
      const loginData = await loginRes.json();
      authToken = loginData.data.token;
      console.log('✅ Xác thực thành công, đã nhận token:', authToken);
      
    } catch (error) {
      console.error('❌ Xác thực thất bại:', error.message);
      return;
    }
    
    // Step 2: Create a test user for password reset
    console.log('\n2. Tạo người dùng test cho việc đặt lại mật khẩu...');
    const timestamp = Date.now();
    testUsername = `testuser_${timestamp}`;
    testUserEmail = `testuser_${timestamp}@example.com`;
    
    try {
      const createUserRes = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: testUsername,
          email: testUserEmail,
          password: 'Test@123',
          full_name: 'Test User'
        })
      });
      
      if (!createUserRes.ok) {
        const errorText = await createUserRes.text();
        console.log('Kết quả tạo user:', errorText);
        throw new Error(`Không thể tạo người dùng: ${createUserRes.status}`);
      }
      
      const userData = await createUserRes.json();
      testUserId = userData.data.id;
      console.log('✅ Đã tạo người dùng test:', {
        id: userData.data.id,
        username: userData.data.username,
        email: testUserEmail
      });
      
      // Step 3: Request password reset token
      console.log('\n3. Yêu cầu token đặt lại mật khẩu...');
      const resetRequestRes = await fetch(`${API_URL}/auth/reset-password/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUserEmail
        })
      });
      
      if (!resetRequestRes.ok) {
        const errorText = await resetRequestRes.text();
        console.log('Kết quả yêu cầu đặt lại mật khẩu:', errorText);
        throw new Error(`Yêu cầu đặt lại mật khẩu thất bại: ${resetRequestRes.status}`);
      }
      
      const resetRequestData = await resetRequestRes.json();
      console.log('✅ Đã yêu cầu đặt lại mật khẩu:', resetRequestData);
      
      // Step 4: Get the reset token using the debug API endpoint
      console.log('\n4. Lấy token đặt lại mật khẩu qua API debug...');
      
      const getTokenRes = await fetch(`${API_URL}/auth/reset-password/debug/get-token`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: testUserEmail
        })
      });
      
      if (!getTokenRes.ok) {
        const errorText = await getTokenRes.text();
        console.log('Kết quả lấy token:', errorText);
        throw new Error(`Lấy token đặt lại mật khẩu thất bại: ${getTokenRes.status}`);
      }
      
      const getTokenData = await getTokenRes.json();
      if (!getTokenData.success || !getTokenData.data || !getTokenData.data.token) {
        console.error('Không thể lấy token hợp lệ từ API debug');
        throw new Error('Không thể tiếp tục mà không có token đặt lại mật khẩu');
      }
      
      resetToken = getTokenData.data.token;
      console.log('✅ Đã lấy được token đặt lại mật khẩu:', resetToken);
      
      // Step 5: Validate reset token
      console.log('\n5. Xác thực token đặt lại mật khẩu...');
      const validateTokenRes = await fetch(`${API_URL}/auth/reset-password/validate/${resetToken}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Mã trạng thái của yêu cầu xác thực token:', validateTokenRes.status);
      const validateTokenText = await validateTokenRes.text();
      console.log('Nội dung phản hồi xác thực token:', validateTokenText);
      
      let validateTokenData;
      try {
        validateTokenData = JSON.parse(validateTokenText);
        console.log('✅ Kết quả xác thực token:', validateTokenData);
      } catch (err) {
        console.error('❌ Không thể phân tích phản hồi JSON:', err.message);
      }
      
      // Step 6: Reset password using token
      console.log('\n6. Đặt lại mật khẩu sử dụng token...');
      const newPassword = 'NewPassword@456';
      const resetPasswordRes = await fetch(`${API_URL}/auth/reset-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          password: newPassword
        })
      });
      
      console.log('Mã trạng thái của yêu cầu đặt lại mật khẩu:', resetPasswordRes.status);
      const resetPasswordText = await resetPasswordRes.text();
      console.log('Nội dung phản hồi đặt lại mật khẩu:', resetPasswordText);
      
      try {
        const resetPasswordData = JSON.parse(resetPasswordText);
        console.log('✅ Kết quả đặt lại mật khẩu:', resetPasswordData);
      } catch (err) {
        console.error('❌ Không thể phân tích phản hồi JSON:', err.message);
      }
      
      // Step 7: Verify login with new password
      console.log('\n7. Xác minh đăng nhập bằng mật khẩu mới...');
      const loginVerifyRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: testUsername,
          password: newPassword
        })
      });
      
      console.log('Mã trạng thái của yêu cầu đăng nhập:', loginVerifyRes.status);
      const loginVerifyText = await loginVerifyRes.text();
      console.log('Nội dung phản hồi đăng nhập:', loginVerifyText);
      
      try {
        const loginVerifyData = JSON.parse(loginVerifyText);
        if (loginVerifyRes.ok) {
          console.log('✅ Đăng nhập thành công với mật khẩu mới:', {
            user_id: loginVerifyData.data?.user?.id,
            username: loginVerifyData.data?.user?.username
          });
        }
      } catch (err) {
        console.error('❌ Không thể phân tích phản hồi JSON:', err.message);
      }
      
      console.log('\n✅ HOÀN THÀNH TEST ✅');
      
    } catch (error) {
      console.error('❌ Test thất bại:', error.message);
    } finally {
      // Clean up - Delete all reset tokens for the user, then delete the user
      if (testUserId) {
        console.log('\nDọn dẹp - Xóa token đặt lại mật khẩu của người dùng...');
        try {
          const deleteTokensRes = await fetch(`${API_URL}/auth/reset-password/user/${testUserId}`, {
            method: 'DELETE',
            headers: { 
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (deleteTokensRes.ok) {
            const tokenDeleteData = await deleteTokensRes.json();
            console.log('✅ Đã xóa token người dùng:', tokenDeleteData.message || tokenDeleteData);
          } else {
            console.log('Ghi chú: Không có token nào để xóa hoặc endpoint xóa token không khả dụng');
          }
          
          // Now delete the test user after tokens are removed
          console.log('Xóa người dùng test...');
          const deleteUserRes = await fetch(`${API_URL}/users/${testUserId}`, {
            method: 'DELETE',
            headers: { 
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (deleteUserRes.ok) {
            const deleteData = await deleteUserRes.json();
            console.log('✅ Kết quả xóa người dùng:', deleteData.data || deleteData);
          } else {
            console.error('❌ Không thể xóa người dùng test');
          }
        } catch (cleanupError) {
          console.error('❌ Lỗi trong quá trình dọn dẹp:', cleanupError.message);
        }
      }
    }
    
  } catch (error) {
    console.error('\n❌ TEST THẤT BẠI:', error.message);
  }
}

// Chạy test
manualPasswordResetTest().catch(console.error);
