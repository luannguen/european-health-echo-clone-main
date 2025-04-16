
/**
 * Test kết nối đến cơ sở dữ liệu SQL Server
 */

// Import database service
import dbService from './backend/src/lib/db-manager.js';

// Thiết lập các sự kiện lắng nghe trạng thái kết nối
dbService.on('connecting', () => console.log('🔄 Đang kết nối đến cơ sở dữ liệu...'));
dbService.on('connected', () => console.log('✅ Kết nối thành công!'));
dbService.on('error', (error) => console.error('❌ Lỗi kết nối:', error.message));
dbService.on('reconnecting', (attempt) => console.log(`🔄 Đang thử kết nối lại (lần ${attempt})...`));
dbService.on('disconnected', () => console.log('🔌 Đã ngắt kết nối'));

/**
 * Hàm kiểm tra kết nối
 */
async function testConnection() {
  console.log('\n=== KIỂM TRA KẾT NỐI CƠ SỞ DỮ LIỆU ===\n');
  console.log('Cấu hình kết nối:', dbService.connectionConfig);
  
  try {
    // Kiểm tra kết nối
    console.log('\n1. Kiểm tra kết nối cơ bản:');
    const testResult = await dbService.testConnection();
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      // Khởi tạo pool
      console.log('\n2. Khởi tạo connection pool:');
      await dbService.init();
      console.log('Pool đã khởi tạo thành công');
      
      // Lấy thông tin cơ sở dữ liệu
      console.log('\n3. Lấy thông tin cơ sở dữ liệu:');
      const dbInfo = await dbService.getDatabaseInfo();
      console.log(JSON.stringify(dbInfo, null, 2));
      
      // Đóng kết nối
      console.log('\n4. Đóng kết nối:');
      await dbService.close();
      console.log('Đã đóng kết nối thành công');
    }
    
    return testResult;
  } catch (error) {
    console.error('Lỗi khi kiểm tra kết nối:', error);
    // Đảm bảo đóng kết nối nếu có lỗi
    try {
      await dbService.close();
    } catch (closeError) {
      console.error('Lỗi khi đóng kết nối:', closeError);
    }
    return { success: false, message: error.message };
  }
}

// Chạy kiểm tra
testConnection()
  .then(result => {
    console.log('\n=== KẾT QUẢ KIỂM TRA ===');
    console.log(result.success ? '✅ Thành công!' : '❌ Thất bại!');
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Lỗi không xác định:', error);
    process.exit(1);
  });
