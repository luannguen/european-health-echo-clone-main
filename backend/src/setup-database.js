/**
 * Database Setup Script
 * Thực thi script SQL để thiết lập cấu trúc bảng cần thiết
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbService from './core/services/db.service.js';

// Lấy đường dẫn tuyệt đối của thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Thực thi file SQL
 * @param {string} filePath - Đường dẫn đến file SQL
 */
async function executeSqlFile(filePath) {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    console.log(`Đọc file SQL: ${fullPath}`);
    
    // Đọc nội dung file SQL
    const sqlContent = fs.readFileSync(fullPath, 'utf8');
    
    // Kết nối đến cơ sở dữ liệu
    await dbService.init();
    
    console.log('Đang thực thi script SQL...');
    const result = await dbService.executeQuery(sqlContent);
    console.log('Thực thi script SQL thành công!');
    console.log('Kết quả:', result);
    
    // Đóng kết nối
    await dbService.close();
    console.log('Kết nối đã đóng.');
  } catch (error) {
    console.error('Lỗi khi thực thi script SQL:', error);
    
    // Đảm bảo đóng kết nối ngay cả khi có lỗi
    try {
      await dbService.close();
    } catch (closeError) {
      console.error('Lỗi khi đóng kết nối:', closeError);
    }
  }
}

// Danh sách các file SQL cần thực thi theo thứ tự
const sqlFiles = [
  './sql/create-users-table.sql',
  './sql/create-refresh-tokens-table.sql',
  './sql/create-revoked-tokens-table.sql',
  './sql/create-auth-logs-table.sql',
  './sql/create-password-reset-table.sql'
];

// Thực thi tuần tự các file SQL
async function setupDatabase() {
  console.log('Bắt đầu thiết lập cơ sở dữ liệu...');
  
  try {
    await dbService.init();
    
    for (const file of sqlFiles) {
      try {
        console.log(`Đang thực thi file: ${file}`);
        await executeSqlFile(file);
        console.log(`Hoàn thành file: ${file}`);
      } catch (error) {
        console.error(`Lỗi khi thực thi file ${file}:`, error.message);
        // Tiếp tục với file tiếp theo ngay cả khi file hiện tại bị lỗi
      }
    }
    
    console.log('Hoàn thành quá trình thiết lập cơ sở dữ liệu.');
  } catch (error) {
    console.error('Lỗi khi thiết lập cơ sở dữ liệu:', error);
  } finally {
    try {
      await dbService.close();
      console.log('Kết nối đã đóng.');
    } catch (closeError) {
      console.error('Lỗi khi đóng kết nối:', closeError);
    }
  }
}

setupDatabase();