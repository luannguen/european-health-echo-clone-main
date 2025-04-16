/**
 * API URL Service
 * Dịch vụ trung tâm để quản lý tất cả URL API trong ứng dụng
 */

// Các cấu hình URL API
interface ApiConfig {
  baseUrl: string;
  endpoints: {
    [key: string]: string;
  }
}

/**
 * ApiUrlService
 * Service quản lý URL API, đảm bảo tính nhất quán giữa các request
 */
class ApiUrlService {
  private config: ApiConfig;

  constructor() {
    // Khởi tạo cấu hình mặc định
    this.config = {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
      endpoints: {
        // Auth endpoints
        login: '/auth/login',
        refreshToken: '/auth/refresh-token',
        logout: '/auth/logout',
        logoutAll: '/auth/logout-all',
        me: '/auth/me',
        
        // User endpoints
        users: '/users',
        userById: '/users/:id',
        
        // Role endpoints
        roles: '/roles',
        roleById: '/roles/:id',
        userRoles: '/users/:id/roles',
        
        // Password reset endpoints
        requestReset: '/password-reset/request',
        verifyResetToken: '/password-reset/verify/:token',
        resetPassword: '/password-reset/reset',
      }
    };
  }

  /**
   * Thiết lập URL cơ sở mới
   * @param baseUrl - URL cơ sở mới cho API
   */
  setBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl;
  }

  /**
   * Đăng ký endpoint mới hoặc ghi đè endpoint hiện có
   * @param key - Khóa định danh cho endpoint
   * @param path - Đường dẫn endpoint (không bao gồm baseUrl)
   */
  registerEndpoint(key: string, path: string): void {
    this.config.endpoints[key] = path;
  }

  /**
   * Xây dựng URL API đầy đủ từ endpoint key
   * @param endpointKey - Khóa của endpoint
   * @param params - Các tham số để thay thế trong đường dẫn (ví dụ: :id)
   * @param queryParams - Các tham số truy vấn để thêm vào URL
   * @returns URL API đầy đủ
   */
  getUrl(
    endpointKey: string, 
    params: Record<string, string | number> = {}, 
    queryParams: Record<string, string | number | boolean> = {}
  ): string {
    // Kiểm tra endpoint có tồn tại không
    if (!this.config.endpoints[endpointKey]) {
      console.error(`Endpoint key "${endpointKey}" is not registered in ApiUrlService`);
      throw new Error(`Unknown endpoint: ${endpointKey}`);
    }

    // Lấy đường dẫn endpoint
    let path = this.config.endpoints[endpointKey];

    // Thay thế các tham số trong đường dẫn
    Object.keys(params).forEach(key => {
      path = path.replace(`:${key}`, String(params[key]));
    });

    // Xây dựng URL đầy đủ
    const url = new URL(path, this.config.baseUrl);

    // Thêm các tham số truy vấn
    Object.keys(queryParams).forEach(key => {
      url.searchParams.append(key, String(queryParams[key]));
    });

    return url.toString();
  }

  /**
   * Lấy danh sách tất cả các endpoint đã đăng ký
   * @returns Danh sách các endpoint
   */
  getRegisteredEndpoints(): Record<string, string> {
    return { ...this.config.endpoints };
  }

  /**
   * Lấy URL cơ sở hiện tại
   * @returns URL cơ sở
   */
  getBaseUrl(): string {
    return this.config.baseUrl;
  }
}

// Xuất một instance duy nhất
const apiUrlService = new ApiUrlService();

// Xuất các hằng số endpoint để sử dụng trong toàn bộ ứng dụng
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'login',
    REFRESH_TOKEN: 'refreshToken',
    LOGOUT: 'logout',
    LOGOUT_ALL: 'logoutAll',
    ME: 'me'
  },
  USERS: {
    LIST: 'users',
    DETAIL: 'userById',
    ROLES: 'userRoles'
  },
  ROLES: {
    LIST: 'roles',
    DETAIL: 'roleById'
  },
  PASSWORD_RESET: {
    REQUEST: 'requestReset',
    VERIFY: 'verifyResetToken',
    RESET: 'resetPassword'
  }
};

export default apiUrlService;
