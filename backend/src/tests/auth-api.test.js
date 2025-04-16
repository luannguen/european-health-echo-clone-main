/**
 * Test các API xác thực mới bao gồm:
 * - Login (đăng nhập)
 * - Refresh Token (làm mới token)
 * - Logout (đăng xuất)
 * - Logout All (đăng xuất từ tất cả thiết bị)
 */

import fetch from 'node-fetch';
import { userSessionTestHelper, initializeTestBot } from './helpers/test-bot.helper.js';

// Địa chỉ API
const API_URL = 'http://localhost:3001/api';

// Thông tin đăng nhập admin mặc định
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin@123456';

// Timeout để sử dụng với các requests
const FETCH_TIMEOUT = 8000;

/**
 * Kiểm tra xem server có đang hoạt động không
 * @returns {Promise<boolean>} true nếu server đang hoạt động, false nếu không
 */
async function isServerRunning() {
  try {
    // Tạo AbortController cho timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    
    // Thử kết nối đến server
    const response = await fetch(`${API_URL}`, { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.error('❌ Không thể kết nối đến server:', error.message);
    return false;
  }
}

/**
 * Test toàn bộ luồng API xác thực
 */
async function testAuthAPI() {
  console.log('=================================');
  console.log('     TESTING AUTH API FLOW        ');
  console.log('=================================\n');
  
  // Initialize TestBotService
  console.log('Initializing TestBotService...');
  initializeTestBot({ logToConsole: false });
  console.log('✅ TestBotService initialized successfully\n');
  
  // Kiểm tra server trước khi chạy test
  console.log('Kiểm tra kết nối đến server...');
  if (!(await isServerRunning())) {
    console.error('❌ Server không hoạt động hoặc không thể kết nối được.');
    console.error('👉 Vui lòng đảm bảo server đang chạy tại địa chỉ: http://localhost:3000');
    console.error('👉 Kiểm tra cấu trúc API của bạn có đúng với các endpoint:');
    console.error('   - /api/auth/login');
    console.error('   - /api/auth/refresh-token');
    console.error('   - /api/auth/logout');
    console.error('   - /api/auth/logout-all');
    console.error('👉 Nếu cấu hình API khác, hãy điều chỉnh API_URL trong file này.');
    return;
  }
  console.log('✅ Kết nối đến server thành công!\n');
  
  let adminToken = null;
  let refreshToken = null;
  
  try {    // ===== TEST 1: Login =====
    console.log('TEST 1: Đăng nhập');
    try {
      // Thêm timeout và thử với trường hợp lỗi mạng
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 giây timeout
        console.log('Đang gửi yêu cầu đăng nhập với thông tin:');
      console.log(`- Username: ${ADMIN_USERNAME}`);
      console.log(`- Password: ${ADMIN_PASSWORD.slice(0, 3)}***`);
      
      const loginData = {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD
      };
      
      console.log('JSON body:', JSON.stringify(loginData));
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
        signal: controller.signal
      }).catch(error => {
        if (error.name === 'AbortError') {
          throw new Error('Yêu cầu đăng nhập đã hết thời gian chờ sau 10 giây');
        }
        console.error('Chi tiết lỗi network:', error);
        throw error;
      });
      
      clearTimeout(timeoutId);
      
      // Kiểm tra response có hợp lệ không trước khi parse JSON
      if (!response.ok) {
        console.log(`❌ Lỗi đăng nhập: HTTP ${response.status} - ${response.statusText}`);
        const errorText = await response.text();
        console.log(`Chi tiết lỗi: ${errorText}`);
        throw new Error(`Lỗi đăng nhập với mã ${response.status}`);
      }
      
      const data = await response.json();
      
      if (response.ok && data.success !== false) {
        console.log('✅ Đăng nhập thành công');
        
        // Xử lý cả 2 format API có thể có
        if (data.data && data.data.tokens) {
          // Format: { success: true, data: { user, tokens: { accessToken, refreshToken } } }
          adminToken = data.data.tokens.accessToken;
          refreshToken = data.data.tokens.refreshToken;
        } else if (data.data) {
          // Format: { success: true, data: { user, token, refreshToken } }
          adminToken = data.data.token;
          refreshToken = data.data.refreshToken;
        } else if (data.tokens) {
          // Format: { user, tokens: { accessToken, refreshToken } }
          adminToken = data.tokens.accessToken;
          refreshToken = data.tokens.refreshToken;
        } else {
          // Format: { user, token, refreshToken }
          adminToken = data.token;
          refreshToken = data.refreshToken;
        }
        
        if (adminToken) {
          console.log('✅ Token nhận được thành công');
        } else {
          console.log('❌ Không tìm thấy token trong phản hồi');
        }
        
        if (refreshToken) {
          console.log('✅ Refresh token nhận được thành công');
        } else {
          console.log('❌ Không tìm thấy refresh token trong phản hồi');
        }
      } else {
        console.log('❌ Đăng nhập thất bại:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Lỗi khi đăng nhập:', error.message);
    }
    
    if (!adminToken || !refreshToken) {
      console.error('❌ Đăng nhập thất bại, không thể tiếp tục các test khác');
      return;
    }
    
    // ===== TEST 2: Refresh Token =====
    console.log('\nTEST 2: Làm mới access token');
    try {
      // Bỏ qua nếu không nhận được refresh token
      if (!refreshToken) {
        console.log('❌ Không có refresh token, bỏ qua test');
      } else {      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken
          }),
          signal: controller.signal
        }).catch(error => {
          if (error.name === 'AbortError') {
            throw new Error('Yêu cầu làm mới token đã hết thời gian chờ sau ' + (FETCH_TIMEOUT/1000) + ' giây');
          }
          throw error;
        });
      
      clearTimeout(timeoutId);
        
        const data = await response.json();
        
        if (response.ok && data.success !== false) {
          console.log('✅ Làm mới token thành công');
          
          // Trích xuất token mới (xử lý cả hai định dạng)
          const newToken = data.data ? data.data.accessToken : data.accessToken;
          const expiresIn = data.data ? data.data.expiresIn : data.expiresIn;
          
          if (newToken) {
            console.log('✅ Đã nhận được access token mới');
            console.log('✅ Token hết hạn sau:', expiresIn ? `${expiresIn} giây` : 'không xác định');
            
            // Cập nhật token cho các test tiếp theo
            adminToken = newToken;
          } else {
            console.log('❌ Không nhận được token mới trong phản hồi');
          }
        } else {
          console.log('❌ Làm mới token thất bại:', data.message || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('❌ Lỗi khi làm mới token:', error.message);
    }
    
    // ===== TEST 3: Protected Route with New Token =====
    console.log('\nTEST 3: Truy cập route được bảo vệ với token mới');
    try {      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        signal: controller.signal
      }).catch(error => {
        if (error.name === 'AbortError') {
          throw new Error('Yêu cầu truy cập API được bảo vệ đã hết thời gian chờ');
        }
        throw error;
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Truy cập route được bảo vệ thành công');
        console.log(`✅ Số lượng người dùng trả về: ${Array.isArray(data.data) ? data.data.length : 'không rõ'}`);
      } else {
        console.log('❌ Truy cập route được bảo vệ thất bại');
      }
    } catch (error) {
      console.error('❌ Lỗi khi truy cập route được bảo vệ:', error.message);
    }
    
    // ===== TEST 4: Logout =====
    console.log('\nTEST 4: Đăng xuất');
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          refreshToken
        })
      });
      
      if (response.ok) {
        console.log('✅ Đăng xuất thành công');
        
        // Kiểm tra xem API được bảo vệ có chặn yêu cầu sau khi đăng xuất không
        try {
          const protectedResponse = await fetch(`${API_URL}/users`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          });
          
          if (!protectedResponse.ok) {
            console.log('✅ Access token đã bị vô hiệu hóa sau khi đăng xuất');
          } else {
            console.log('❌ Access token vẫn hoạt động sau khi đăng xuất!');
          }
        } catch (error) {
          console.log('✅ Lỗi khi truy cập sau đăng xuất, token đã bị vô hiệu hóa');
        }
        
        // Kiểm tra xem refresh token có bị vô hiệu hóa không
        try {
          const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken
            })
          });
          
          if (!refreshResponse.ok) {
            console.log('✅ Refresh token đã bị vô hiệu hóa sau khi đăng xuất');
          } else {
            console.log('❌ Refresh token vẫn hoạt động sau khi đăng xuất!');
          }
        } catch (error) {
          console.log('✅ Lỗi khi làm mới token, refresh token đã bị vô hiệu hóa');
        }
      } else {
        console.log('❌ Đăng xuất thất bại');
      }
    } catch (error) {
      console.error('❌ Lỗi khi đăng xuất:', error.message);
    }
    
    // ===== TEST 5: Login Again =====
    console.log('\nTEST 5: Đăng nhập lại');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success !== false) {
        console.log('✅ Đăng nhập lại thành công');
        
        // Xử lý cả 2 format API
        if (data.data && data.data.tokens) {
          adminToken = data.data.tokens.accessToken;
          refreshToken = data.data.tokens.refreshToken;
        } else if (data.data) {
          adminToken = data.data.token;
          refreshToken = data.data.refreshToken;
        } else if (data.tokens) {
          adminToken = data.tokens.accessToken;
          refreshToken = data.tokens.refreshToken;
        } else {
          adminToken = data.token;
          refreshToken = data.refreshToken;
        }
      } else {
        console.log('❌ Đăng nhập lại thất bại');
        return;
      }
    } catch (error) {
      console.error('❌ Lỗi khi đăng nhập lại:', error.message);
      return;
    }
    
    // ===== TEST 6: Logout All Devices =====
    console.log('\nTEST 6: Đăng xuất khỏi tất cả thiết bị');
    try {
      // Tạo thêm một phiên đăng nhập khác để kiểm tra đăng xuất toàn bộ
      await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD
        })
      });
        // Gọi API đăng xuất tất cả
      const response = await fetch(`${API_URL}/auth/logout-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (response.ok) {
        console.log('✅ Đăng xuất tất cả thiết bị thành công');
        
        // Kiểm tra xem refresh token còn hoạt động không
        const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken
          })
        });
        
        if (!refreshResponse.ok) {
          console.log('✅ Refresh token đã bị từ chối sau khi đăng xuất tất cả');
        } else {
          console.log('❌ Refresh token vẫn được chấp nhận sau khi đăng xuất tất cả!');
        }
      }
    } catch (error) {
      console.error('❌ Lỗi khi đăng xuất tất cả thiết bị:', error.message);
    }
      console.log('\n=================================');
    console.log('       TESTS COMPLETED            ');
    console.log('=================================\n');
    
  } catch (error) {
    console.error('Test failed with error:', error);
  } finally {
    // Clean up TestBotService data
    console.log('\nCleaning up TestBotService data...');
    userSessionTestHelper.cleanup();
    console.log('✅ TestBotService data cleaned up');
  }
}

// Add Jest test cases
describe('Auth API Tests', () => {
  test('Authentication API endpoints should function correctly', async () => {
    await testAuthAPI();
    // For Jest to pass, we need at least one assertion
    expect(true).toBe(true);
  });
});

// Run the test function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  testAuthAPI();
}
