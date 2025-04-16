import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import apiUrlService from '../services/api-url.service';

// Generic type for API responses
type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Options for API requests
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  skipAuth?: boolean;
};

/**
 * Hook để gọi API với xác thực và xử lý lỗi
 * Sử dụng ApiUrlService để đảm bảo URL API nhất quán
 */
const useApi = () => {
  const { token, logout, refreshAccessToken } = useAuth();

  /**
   * Gọi API với endpoint key thay vì URL trực tiếp
   * @param endpointKey Key của endpoint đăng ký trong ApiUrlService
   * @param params Tham số path (ví dụ: :id)
   * @param queryParams Tham số truy vấn
   * @param options Tùy chọn request
   * @returns Kết quả từ API
   */
  const callApi = useCallback(
    async <T>(
      endpointKey: string,
      params: Record<string, string | number> = {},
      queryParams: Record<string, string | number | boolean> = {},
      options: RequestOptions = {}
    ): Promise<T> => {
      try {
        // Lấy URL đầy đủ từ ApiUrlService
        const fullUrl = apiUrlService.getUrl(endpointKey, params, queryParams);
        
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (token && !options.skipAuth) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(fullUrl, {
          method: options.method || 'GET',
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        // If unauthorized, try to refresh token first
        if (response.status === 401) {
          const refreshSuccess = await refreshAccessToken();
          if (refreshSuccess) {
            // Retry the request with new token
            return callApi(endpointKey, params, queryParams, options);
          } else {
            // If refresh failed, logout
            logout();
            throw new Error('Session expired. Please log in again.');
          }
        }

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json') 
          ? await response.json() 
          : await response.text();

        if (!response.ok) {
          throw new Error(typeof data === 'object' && data.message ? data.message : 'Something went wrong');
        }

        return data;
      } catch (error: any) {
        console.error(`API request to ${endpointKey} failed:`, error);
        throw error;
      }
    },
    [token, logout, refreshAccessToken]
  );

  /**
   * Gọi API với state loading và error
   * @param endpointKey Key của endpoint
   * @param params Tham số path
   * @param queryParams Tham số truy vấn
   * @param options Tùy chọn request
   * @returns State và data của request
   */
  const useApiCall = <T>(
    endpointKey: string,
    params: Record<string, string | number> = {},
    queryParams: Record<string, string | number | boolean> = {},
    options: RequestOptions = {}
  ): [ApiResponse<T>, (overrideOptions?: RequestOptions) => Promise<void>] => {
    const [state, setState] = useState<ApiResponse<T>>({
      data: null,
      loading: false,
      error: null
    });

    const fetchData = async (overrideOptions: RequestOptions = {}) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const mergedOptions = { ...options, ...overrideOptions };
        const data = await callApi<T>(endpointKey, params, queryParams, mergedOptions);
        setState({ data, loading: false, error: null });
      } catch (error: any) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to fetch data'
        }));
      }
    };

    return [state, fetchData];
  };

  /**
   * Thực hiện gọi API trực tiếp với URL đầy đủ (fallback cho các trường hợp đặc biệt)
   * @param url URL đầy đủ
   * @param options Tùy chọn request
   * @returns Kết quả từ API
   */
  const fetchWithAuth = useCallback(
    async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (token && !options.skipAuth) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method: options.method || 'GET',
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        // If unauthorized, try to refresh token first
        if (response.status === 401) {
          const refreshSuccess = await refreshAccessToken();
          if (refreshSuccess) {
            // Retry the request with new token
            return fetchWithAuth(url, options);
          } else {
            // If refresh failed, logout
            logout();
            throw new Error('Session expired. Please log in again.');
          }
        }

        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          throw new Error(typeof data === 'object' && data.message ? data.message : 'Something went wrong');
        }

        return data;
      } catch (error: any) {
        console.error('API request failed:', error);
        throw error;
      }
    },
    [token, logout, refreshAccessToken]
  );

  return {
    callApi,
    useApiCall,
    fetchWithAuth
  };
};

export default useApi;
