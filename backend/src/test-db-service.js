/**
 * Test file for DbConnectionService
 * Demonstrates how to use the database connection microservice
 */

// Import using ES modules syntax
import dbService from './lib/db-manager.js';

// Event listeners for monitoring connection status
dbService.on('connecting', () => console.log('🔄 Đang kết nối đến cơ sở dữ liệu...'));
dbService.on('connected', () => console.log('✅ Kết nối thành công!'));
dbService.on('error', (error) => console.log('❌ Lỗi kết nối:', error.message));
dbService.on('reconnecting', (attempt) => console.log(`🔄 Đang thử kết nối lại (lần ${attempt})...`));
dbService.on('disconnected', () => console.log('🔌 Đã ngắt kết nối'));
dbService.on('health-check-failed', () => console.log('⚠️ Kiểm tra kết nối thất bại'));

/**
 * Example 1: Basic connection test
 */
async function testBasicConnection() {
  console.log('\n=== TEST 1: Kết nối cơ bản ===');
  try {
    // Kiểm tra kết nối mà không thiết lập pool
    const testResult = await dbService.testConnection();
    console.log('Kết quả kiểm tra kết nối:', testResult);
    
    if (testResult.success) {
      // Lấy thông tin cơ sở dữ liệu
      await dbService.init();
      const dbInfo = await dbService.getDatabaseInfo();
      console.log('Thông tin cơ sở dữ liệu:', dbInfo);
    }
  } catch (error) {
    console.error('Lỗi trong quá trình kiểm tra kết nối:', error.message);
  }
}

/**
 * Example 2: Execute some sample queries
 */
async function testQueries() {
  console.log('\n=== TEST 2: Thực thi các truy vấn ===');
  try {
    // Đảm bảo đã kết nối
    await dbService.getPool();
    
    // Lấy danh sách 5 bảng đầu tiên
    const tablesResult = await dbService.executeQuery(`
      SELECT TOP 5 
        TABLE_NAME, 
        TABLE_SCHEMA 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `);
    
    console.log('Danh sách bảng:');
    console.table(tablesResult.recordset);
    
    // Đếm số bảng
    const countResult = await dbService.executeQuery(`
      SELECT COUNT(*) AS TableCount 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
    `);
    
    console.log(`Tổng số bảng: ${countResult.recordset[0].TableCount}`);
    
    // Ví dụ truy vấn với tham số
    const paramQueryResult = await dbService.executeQuery(`
      SELECT TOP 3 * 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = @tableName
    `, { 
      tableName: tablesResult.recordset[0].TABLE_NAME 
    });
    
    console.log(`Các cột trong bảng ${tablesResult.recordset[0].TABLE_NAME}:`);
    console.table(paramQueryResult.recordset);
    
  } catch (error) {
    console.error('Lỗi trong quá trình truy vấn:', error.message);
  }
}

/**
 * Example 3: Transaction example
 */
async function testTransaction() {
  console.log('\n=== TEST 3: Giao dịch (Transaction) ===');
  try {
    // Ví dụ transaction (giả lập, không thực thi các lệnh INSERT/UPDATE thật)
    const result = await dbService.executeTransaction(async (transaction) => {
      // Tạo request từ transaction
      const request = transaction.request();
      
      // Thực hiện một truy vấn SELECT trong transaction
      const result = await request.query(`
        SELECT TOP 5 * 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);
      
      console.log('Truy vấn trong transaction thành công');
      return result;
    });
    
    console.log('Transaction hoàn tất thành công');
    
  } catch (error) {
    console.error('Lỗi trong quá trình thực thi transaction:', error.message);
  }
}

/**
 * Run all tests
 */
async function runTests() {
  try {
    await testBasicConnection();
    await testQueries();
    await testTransaction();
    
    // Đóng kết nối khi hoàn tất
    console.log('\n=== Đóng kết nối ===');
    await dbService.close();
    
  } catch (error) {
    console.error('Lỗi khi chạy các bài kiểm tra:', error);
    // Đảm bảo đóng kết nối ngay cả khi có lỗi
    await dbService.close();
  }
}

// Chạy tất cả các bài kiểm tra
runTests();

/**
 * Hướng dẫn sử dụng DbConnectionService
 * 
 * 1. Import service (sử dụng ES modules):
 *    import dbService from './lib/db-manager.js';
 * 
 * 2. Kết nối đến cơ sở dữ liệu:
 *    await dbService.init(); // hoặc dbService.getPool();
 * 
 * 3. Thực thi truy vấn:
 *    const result = await dbService.executeQuery('SELECT * FROM my_table WHERE id = @id', { id: 1 });
 * 
 * 4. Thực thi stored procedure:
 *    const result = await dbService.executeStoredProcedure('sp_get_data', { param1: 'value1' });
 * 
 * 5. Thực thi transaction:
 *    await dbService.executeTransaction(async (transaction) => {
 *      const request = transaction.request();
 *      await request.query('INSERT INTO my_table (name) VALUES (@name)', { name: 'test' });
 *      // Thêm các truy vấn khác trong cùng transaction
 *    });
 * 
 * 6. Theo dõi trạng thái kết nối:
 *    dbService.on('connected', () => console.log('Kết nối thành công'));
 *    dbService.on('error', (error) => console.log('Lỗi kết nối:', error.message));
 * 
 * 7. Đóng kết nối khi hoàn tất:
 *    await dbService.close();
 */