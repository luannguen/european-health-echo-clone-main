#!/usr/bin/env node

/**
 * Test Admin UI Script
 * 
 * Script để khởi động và kiểm tra giao diện Admin UI một cách dễ dàng
 * Chạy lệnh: node test-admin-ui.js
 */

import { spawn, exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname, resolve, join } from 'path';
import fs from 'fs';
import config from './backend/src/config.js';

// Biến môi trường
const NODE_ENV = process.env.NODE_ENV || 'development';
const BACKEND_PORT = process.env.PORT || 3001;
const VITE_PORT = process.env.VITE_PORT || 8081;

// Lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cấu hình màu cho log
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Đường dẫn tới Vite CLI
const vitePath = resolve(__dirname, 'node_modules', '.bin', 'vite');

/**
 * Hàm in log có màu
 */
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  let color = colors.white;
  let prefix = '';

  switch (type) {
    case 'success':
      color = colors.green;
      prefix = '[SUCCESS]';
      break;
    case 'error':
      color = colors.red;
      prefix = '[ERROR]';
      break;
    case 'warning':
      color = colors.yellow;
      prefix = '[WARNING]';
      break;
    case 'backend':
      color = colors.cyan;
      prefix = '[BACKEND]';
      break;
    case 'frontend':
      color = colors.magenta;
      prefix = '[FRONTEND]';
      break;
    default:
      color = colors.white;
      prefix = '[INFO]';
  }

  console.log(`${color}${prefix} [${timestamp}] ${message}${colors.reset}`);
}

/**
 * Hiển thị thông tin môi trường
 */
function showEnvironmentInfo() {
  log('='.repeat(60), 'info');
  log('🔧 THÔNG TIN MÔI TRƯỜNG', 'info');
  log('='.repeat(60), 'info');
  log(`Node version: ${process.version}`, 'info');
  log(`Environment: ${NODE_ENV}`, 'info');
  log(`Backend port: ${BACKEND_PORT}`, 'info');
  log(`Frontend port: ${VITE_PORT}`, 'info');
  log(`Backend URL: http://localhost:${BACKEND_PORT}/`, 'info');
  log(`Frontend URL: http://localhost:${VITE_PORT}/`, 'info');
  log(`Admin URL: http://localhost:${VITE_PORT}/login`, 'success');
  log('='.repeat(60), 'info');
  log('📝 THÔNG TIN ĐĂNG NHẬP', 'info');
  log('='.repeat(60), 'info');
  log(`Username: ${config.defaultAdmin.username}`, 'success');
  log(`Password: ${config.defaultAdmin.password}`, 'success');
  log('='.repeat(60), 'info');
}

/**
 * Kiểm tra và hiển thị thông báo lỗi nếu port đang bị sử dụng
 */
function checkPort(port) {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32'
      ? `netstat -ano | find "LISTENING" | find ":${port}"`
      : `lsof -i:${port} | grep LISTEN`;

    exec(command, (error, stdout) => {
      if (stdout && stdout.trim() !== '') {
        reject(new Error(`Port ${port} đã được sử dụng. Vui lòng đóng ứng dụng đang sử dụng port này trước.`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Khởi động Backend Server
 */
async function startBackendServer() {
  log('Đang khởi động Backend Server...', 'backend');

  try {
    await checkPort(BACKEND_PORT);
  } catch (error) {
    log(error.message, 'error');
    log(`Bạn có thể thay đổi port bằng cách đặt biến môi trường PORT=<port>`, 'info');
    process.exit(1);
  }

  const backendServer = spawn('node', ['./backend/src/server.js'], {
    env: { ...process.env, PORT: BACKEND_PORT, NODE_ENV },
    stdio: 'pipe',
    shell: true
  });

  backendServer.stdout.on('data', (data) => {
    data.toString().split('\n').filter(line => line.trim()).forEach(line => {
      log(line, 'backend');
    });
  });

  backendServer.stderr.on('data', (data) => {
    data.toString().split('\n').filter(line => line.trim()).forEach(line => {
      log(line, 'error');
    });
  });

  backendServer.on('close', (code) => {
    if (code !== 0) {
      log(`Backend Server đã dừng với mã lỗi ${code}`, 'error');
    }
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      log('Backend Server đã khởi động thành công!', 'success');
      resolve();
    }, 2000);
  });
}

/**
 * Khởi động Frontend Dev Server (Vite) bằng nhiều phương pháp khác nhau
 */
async function startFrontendServer() {
  log('Đang khởi động Frontend Dev Server (Vite)...', 'frontend');

  try {
    await checkPort(VITE_PORT);
  } catch (error) {
    log(`Chú ý: ${error.message}`, 'warning');
    log(`Vite sẽ tự động sử dụng port khác nếu port ${VITE_PORT} đang bận.`, 'info');
  }

  // PHƯƠNG PHÁP 1: Sử dụng cmd để chạy npm
  try {
    log(`Thử chạy Frontend bằng cmd /c npm run dev...`, 'frontend');

    const frontendServer = spawn('cmd', ['/c', 'npm', 'run', 'dev'], {
      env: { ...process.env, VITE_PORT },
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd()
    });

    frontendServer.stdout.on('data', (data) => {
      data.toString().split('\n').filter(line => line.trim()).forEach(line => {
        log(line, 'frontend');

        // Kiểm tra xem Vite đã khởi động thành công chưa
        if (line.includes('Local:') && line.includes('http://localhost')) {
          let match = line.match(/http:\/\/localhost:(\d+)/);
          if (match && match[1]) {
            log(`Vite đang chạy tại cổng: ${match[1]}`, 'success');
          }
        }
      });
    });

    frontendServer.stderr.on('data', (data) => {
      data.toString().split('\n').filter(line => line.trim()).forEach(line => {
        log(line, 'error');
      });
    });

    // Đăng ký sự kiện khi process kết thúc
    frontendServer.on('close', (code) => {
      if (code !== 0) {
        log(`Frontend Dev Server đã dừng với mã lỗi ${code}. Thử phương pháp khác...`, 'error');
        startFrontendWithNpx();
      }
    });

    // Kiểm tra sau 5 giây xem frontend đã khởi động thành công chưa
    return new Promise((resolve) => {
      setTimeout(() => {
        if (frontendServer.exitCode === null) {
          log('Frontend Dev Server đã khởi động!', 'success');
          resolve();
        } else {
          log('Không thể khởi động Frontend bằng npm. Thử phương pháp khác...', 'warning');
          startFrontendWithNpx().then(resolve);
        }
      }, 5000);
    });
  } catch (error) {
    log(`Lỗi khi khởi động Frontend: ${error.message}. Thử phương pháp khác...`, 'error');
    return startFrontendWithNpx();
  }
}

/**
 * Phương pháp thay thế để khởi động Frontend bằng npx
 */
async function startFrontendWithNpx() {
  try {
    log(`Thử khởi động Frontend bằng npx...`, 'frontend');

    const frontendServer = spawn('npx', ['vite'], {
      env: { ...process.env, VITE_PORT },
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd()
    });

    frontendServer.stdout.on('data', (data) => {
      data.toString().split('\n').filter(line => line.trim()).forEach(line => {
        log(line, 'frontend');
      });
    });

    frontendServer.stderr.on('data', (data) => {
      data.toString().split('\n').filter(line => line.trim()).forEach(line => {
        log(line, 'error');
      });
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        log('Vui lòng mở browser và truy cập: http://localhost:8081/login', 'success');
        resolve();
      }, 5000);
    });
  } catch (error) {
    // Phương pháp cuối cùng: Hiển thị hướng dẫn cho người dùng để chạy thủ công
    log(`Không thể tự động khởi động Frontend server: ${error.message}`, 'error');
    log('Vui lòng mở một terminal mới và chạy lệnh sau:', 'info');
    log('npm run dev', 'success');
    log('Sau đó truy cập http://localhost:8081/login', 'success');
    return Promise.resolve();
  }
}

/**
 * Hàm chính khởi động môi trường test UI
 */
async function startTestEnvironment() {
  log('🚀 KHỞI ĐỘNG MÔI TRƯỜNG TEST ADMIN UI', 'info');

  try {
    // Hiển thị thông tin môi trường
    showEnvironmentInfo();

    // Khởi động Backend Server
    await startBackendServer();

    // Khởi động Frontend Dev Server
    await startFrontendServer();

    log('='.repeat(60), 'info');
    log('🎉 MÔI TRƯỜNG TEST ADMIN UI ĐÃ SẴN SÀNG!', 'success');
    log('='.repeat(60), 'info');
    log(`Truy cập vào Admin UI: http://localhost:${VITE_PORT}/login`, 'success');
    log(`Username: ${config.defaultAdmin.username}`, 'success');
    log(`Password: ${config.defaultAdmin.password}`, 'success');
    log('='.repeat(60), 'info');


    // Xử lý khi người dùng dừng chương trình
    process.on('SIGINT', () => {
      log('Đang dừng các server...', 'info');
      process.exit(0);
    });
  } catch (error) {
    log(`Lỗi khi khởi động môi trường test: ${error.message}`, 'error');
    process.exit(1);
  }
}


//Chạy test UI
/**
 * Test UI cho người dùng
 * File này không thể trực tiếp chạy UI tests từ Node.js
 * Thay vào đó, hiển thị thông tin đăng nhập và hướng dẫn test thủ công
 */

// Thông tin đăng nhập mẫu để test
const TEST_CREDENTIALS = {
  username: 'admin',
  password: 'Admin@123'
};

// Hàm hiển thị thông tin test đăng nhập
function displayLoginTestInfo() {
  log('=== THÔNG TIN TEST ĐĂNG NHẬP UI ===', 'info');
  log('\nThông tin đăng nhập admin:', 'info');
  log(`- Username: ${TEST_CREDENTIALS.username}`, 'success');
  log(`- Password: ${TEST_CREDENTIALS.password}`, 'success');
  
  log('\nHướng dẫn test thủ công:', 'info');
  log('1. Truy cập URL: http://localhost:8080/login', 'info');
  log('2. Nhập thông tin đăng nhập trên', 'info');  
  log('3. Nhấn nút Đăng nhập', 'info');
  log('4. Kiểm tra nếu đăng nhập thành công và chuyển hướng đến trang Dashboard', 'info');
  
  log('\nHoặc chạy test tự động từ môi trường React với lệnh:', 'info');
  log('npm test -- src/admin/__tests__/LoginUI.test.js', 'success');
  
  log('\nLưu ý: Đây là thông tin test. Trong môi trường thực tế,', 'info');
  log('thông tin đăng nhập sẽ được lấy từ cơ sở dữ liệu.', 'info');
  
  return true;
}

// Hiển thị thông tin test
log('Bắt đầu hiển thị thông tin test cho người dùng...', 'info');
displayLoginTestInfo();

// Khởi chạy môi trường test
startTestEnvironment();