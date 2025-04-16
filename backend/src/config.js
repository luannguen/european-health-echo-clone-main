// Database and JWT configuration
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  sql: {
    server: process.env.DB_SERVER || (process.env.NODE_ENV === 'test' ? 'localhost' : 'vrcorp.vn'),
    database: process.env.DB_NAME || (process.env.NODE_ENV === 'test' ? 'vrc_test' : 'vie43864_vrc'),
    user: process.env.DB_USER || (process.env.NODE_ENV === 'test' ? 'sa' : 'vie43864_user'),
    password: process.env.DB_PASSWORD || (process.env.NODE_ENV === 'test' ? 'Password123' : 'YiBo%4BiFo@0SaSi'),
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
      encrypt: false,
      connectTimeout: 5000 // Thêm timeout để tránh chờ quá lâu khi kết nối thất bại
    }
  },
  jwtSecret: process.env.JWT_SECRET || 'vrc-secret-key-2025',
  jwtExpires: process.env.JWT_EXPIRES || '2400h',
  
  // Path configurations
  paths: {
    // Base paths
    rootDir: path.resolve(__dirname, '..'),
    srcDir: __dirname,
    
    // SQL scripts paths
    sqlDir: path.resolve(__dirname, 'sql'),
    usersTableSql: path.resolve(__dirname, 'sql', 'create-users-table.sql'),
    
    // Test paths
    testsDir: path.resolve(__dirname, 'tests'),
    apiTestPath: path.resolve(__dirname, 'tests', 'api-test.js'),
    
    // API routes
    apiBasePath: '/api'
  },
  
  // Default admin credentials for testing
  defaultAdmin: {
    username: 'admin',
    password: 'Admin@123456', // Plain text password for testing
    email: 'admin@vrc.com.vn',
    fullName: 'System Administrator'
  },
  
  // Default roles
  roles: {
    ADMIN: 'admin',
    EDITOR: 'editor',
    CUSTOMER: 'customer'
  },
  defaultRole: 'customer'
};

export default config;