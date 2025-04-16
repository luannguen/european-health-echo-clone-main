/**
 * Mock API Server
 * Giả lập API backend cho việc phát triển frontend
 */

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Khởi tạo Express app
const app = express();
const PORT = 3001;
const JWT_SECRET = 'vrc-secret-key-2025';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock user data
const mockUsers = [
  {
    user_id: 1,
    username: 'admin',
    email: 'admin@vrc.com.vn',
    full_name: 'System Administrator',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// API Routes

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'VRC API Server (Mock)',
    version: '1.0.0',
    documentation: '/api'
  });
});

// Auth - Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Đăng nhập với:', { username, password });
  
  // Mock authentication (accept any username=admin and password=Admin@123456)
  if (username === 'admin' && password === 'Admin@123456') {
    const user = mockUsers[0];
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      data: { user, token } // Thêm level data để phù hợp với API thực tế
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// Current user endpoint
app.get('/api/auth/me', (req, res) => {
  // Extract token from header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const user = mockUsers.find(u => u.user_id === decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: mockUsers,
    pagination: {
      total: mockUsers.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    }
  });
});

app.get('/api/users/roles', (req, res) => {
  res.json({
    success: true,
    data: ['admin', 'editor', 'customer']
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = mockUsers.find(u => u.user_id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API Server đang chạy trên http://localhost:${PORT}`);
  console.log('Thông tin đăng nhập:');
  console.log('  Username: admin');
  console.log('  Password: Admin@123456');
});