/**
 * Start Server Script
 * Khởi động backend server với đầy đủ kiểm tra và khởi tạo cơ sở dữ liệu
 */

import { startServer, stopServer } from './backend/src/server.js';

// Khởi động server
const PORT = process.env.PORT || 3001;

console.log('=============================');
console.log('    KHỞI ĐỘNG BACKEND SERVER    ');
console.log('=============================\n');

console.log(`Khởi động API server trên port ${PORT} ...`);

// Xử lý khi nhận tín hiệu tắt server
process.on('SIGINT', async () => {
  console.log('\nNhận tín hiệu tắt server...');
  await stopServer();
  console.log('Server đã dừng.');
  process.exit(0);
});

// Khởi động server
try {
  const server = await startServer(PORT);
  console.log('\n✅ Server khởi động thành công!');
  console.log(`\n📝 Thông tin đăng nhập admin:`);
  console.log(`Username: admin`);
  console.log(`Password: Admin@123456`);
  console.log('\nNhấn Ctrl+C để dừng server.');
} catch (error) {
  console.error('\n❌ Lỗi khởi động server:', error);
  process.exit(1);
}