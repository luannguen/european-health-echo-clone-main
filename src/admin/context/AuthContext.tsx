import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUrlService, { API_ENDPOINTS } from '../services/api-url.service';

interface User {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  logoutAllDevices: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('auth_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    tokenExpiry: localStorage.getItem('token_expiry') ? parseInt(localStorage.getItem('token_expiry') || '0', 10) : null,
    isAuthenticated: !!localStorage.getItem('auth_token'),
    isLoading: false,
    error: null,
  });
  const navigate = useNavigate();

  // Check if token exists on mount and validate it
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    
    const validateToken = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          setState(prev => ({ ...prev, isLoading: true }));
          console.log('Validating token with API...');          // Sử dụng ApiUrlService để gọi endpoint
          console.log(`Calling API with token: ${token.substring(0, 15)}...`);
          const response = await fetch(apiUrlService.getUrl('me'), {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            console.log('Token validation successful');
            const responseData = await response.json();
            // Kiểm tra cấu trúc phản hồi và trích xuất dữ liệu user
            const userData = responseData.data || responseData;
            setState({
              user: userData,
              token,
              refreshToken: localStorage.getItem('refresh_token'),
              tokenExpiry: localStorage.getItem('token_expiry') ? parseInt(localStorage.getItem('token_expiry') || '0', 10) : null,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            // Token is invalid
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('token_expiry');
            setState({
              user: null,
              token: null,
              refreshToken: null,
              tokenExpiry: null,
              isAuthenticated: false,
              isLoading: false,
              error: 'Session expired. Please log in again.'
            });
            navigate('/login');
          }
        } catch (error) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token_expiry');
          setState({
            user: null,
            token: null,
            refreshToken: null,
            tokenExpiry: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Authentication error'
          });
          navigate('/login');
        }
      }
    };
    
    validateToken();
  }, [navigate]);
  const login = async (username: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(apiUrlService.getUrl(API_ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        // Kiểm tra và xử lý cấu trúc dữ liệu từ API
        let user, token, refreshToken, expiresIn;
        
        if (responseData.data) {
          // Cấu trúc API backend thật: { success: true, data: { user, token, refreshToken, expiresIn } }
          user = responseData.data.user;
          token = responseData.data.token;
          refreshToken = responseData.data.refreshToken;
          expiresIn = responseData.data.expiresIn;
        } else if (responseData.user && responseData.token) {
          // Cấu trúc API mới: { user, token, refreshToken, expiresIn }
          user = responseData.user;
          token = responseData.token;
          refreshToken = responseData.refreshToken;
          expiresIn = responseData.expiresIn;
        } else {
          throw new Error('Unexpected API response format');
        }
        
        if (user && token) {
          // Tính thời gian hết hạn của token
          const expiryTime = expiresIn ? Date.now() + (expiresIn * 1000) : null;
          
          // Lưu thông tin đăng nhập
          localStorage.setItem('auth_token', token);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
          if (expiryTime) localStorage.setItem('token_expiry', expiryTime.toString());
          
          setState({
            user,
            token,
            refreshToken,
            tokenExpiry: expiryTime,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          navigate('/admin');
        } else {
          throw new Error('Invalid response from server: missing user or token');
        }
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: responseData.message || 'Login failed'
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Login failed'
      }));
    }
  };
  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Gọi API để logout
      if (state.token) {
        await fetch(apiUrlService.getUrl(API_ENDPOINTS.AUTH.LOGOUT), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify({
            refreshToken: state.refreshToken
          })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expiry');
      
      // Reset state
      setState({
        user: null,
        token: null,
        refreshToken: null,
        tokenExpiry: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      navigate('/login');
    }
  };
  const logoutAllDevices = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Gọi API để logout từ tất cả các thiết bị
      if (state.token) {
        await fetch(apiUrlService.getUrl(API_ENDPOINTS.AUTH.LOGOUT_ALL), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout all devices error:', error);
    } finally {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expiry');
      
      // Reset state
      setState({
        user: null,
        token: null,
        refreshToken: null,
        tokenExpiry: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      navigate('/login');
    }
  };

  // Hàm làm mới access token sử dụng refresh token
  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      // Kiểm tra xem có refresh token không
      const refreshToken = state.refreshToken || localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        return false;
      }
        // Gọi API để làm mới token
      const response = await fetch(apiUrlService.getUrl(API_ENDPOINTS.AUTH.REFRESH_TOKEN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
      
      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        const { accessToken, expiresIn } = responseData.data;
        
        // Tính thời gian hết hạn mới
        const expiryTime = expiresIn ? Date.now() + (expiresIn * 1000) : null;
        
        // Cập nhật localStorage
        localStorage.setItem('auth_token', accessToken);
        if (expiryTime) localStorage.setItem('token_expiry', expiryTime.toString());
        
        // Cập nhật state
        setState(prev => ({
          ...prev,
          token: accessToken,
          tokenExpiry: expiryTime,
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        logoutAllDevices,
        refreshAccessToken,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};