/**
 * Express Server
 * Main entry point for API server
 */

import express from 'express';
import cors from 'cors';
import apiRoutes from './admin/api/index.js';
import dbService from './core/services/db.service.js';

// Thêm debug để in ra lỗi khởi động
console.log('Bắt đầu khởi động server...');

// Initialize Express app
const app = express();

// Middleware
// Cấu hình CORS để cho phép request từ frontend với credentials
app.use(cors({
  origin: 'http://localhost:8081', // Origin của frontend
  credentials: true,  // Cho phép gửi credentials (cookies, auth headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization']  // Các header được phép
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const status = dbService.getStatus();
    res.json({
      status: 'OK',
      timestamp: new Date(),
      dbStatus: status
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'VRC API Server',
    version: '1.0.0',
    documentation: '/api'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Initialize database connection
const initServer = async (setupTables = true) => {
  try {
    console.log('Đang kết nối đến cơ sở dữ liệu...');
    // Initialize database with better control over table creation
    // We pass setupTables parameter to control whether tables should be created
    // This is useful for testing environments where we might want to handle table setup separately
    await dbService.init(null, setupTables);
    console.log('Database connected successfully');
    
    // Add more detailed logging for test environments
    if (process.env.NODE_ENV === 'test') {
      console.log('Server initialized in TEST mode');
      console.log('Table setup during initialization:', setupTables ? 'ENABLED' : 'DISABLED');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    // Return false instead of throwing, allowing callers to handle the error
    return false;
  }
};

// Server instance
let serverInstance = null;

// Start server function
export const startServer = async (port = process.env.PORT || 3001) => {
  // Initialize DB connection with full table setup by default
  console.log('Khởi tạo kết nối cơ sở dữ liệu...');
  const dbInitialized = await initServer();
  
  if (!dbInitialized) {
    console.error('Failed to initialize server due to database connection issues');
    throw new Error('Database initialization failed');
  }
  
  // Start HTTP server
  return new Promise((resolve) => {
    try {
      console.log('Khởi động HTTP server trên port', port);
      serverInstance = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(serverInstance);
      });
    } catch (error) {
      console.error('Lỗi khi khởi động HTTP server:', error);
      throw error;
    }
  });
};

// Stop server function
export const stopServer = async () => {
  if (serverInstance) {
    return new Promise((resolve) => {
      serverInstance.close(() => {
        console.log('Server closed');
        resolve();
      });
    });
  }
};

// Start server if not in test mode and script is run directly (not imported)
if (process.env.NODE_ENV !== 'test' && import.meta.url === `file://${process.argv[1]}`) {
  console.log('Khởi động server ở chế độ standalone...');
  startServer().catch(error => {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
  });
} else {
  // In test mode, just initialize DB without creating tables (test will handle that)
  if (process.env.NODE_ENV === 'test') {
    console.log('Khởi động server ở chế độ TEST...');
    initServer(false);
  }
}

export default app;