import { API_ENDPOINTS } from './api-endpoints';

// Kiểu dữ liệu cho options khi gọi API
interface RequestOptions {
  method?: string;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  onProgress?: (progress: number) => void;
}

// Interface cho cache item
interface CacheItem {
  data: any;
  timestamp: number;
}

// Định nghĩa các loại lỗi API
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export class ValidationError extends ApiError {
  errors: Record<string, string[]>;
  
  constructor(message: string, errors: Record<string, string[]>) {
    super(message, 400);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthorizationError';
  }
}

export class PermissionError extends ApiError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'PermissionError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'ServerError';
  }
}

// Định nghĩa interface cho API Broker
export interface ApiBrokerInterface {
  // Generic methods
  get<T>(endpoint: string, pathParams?: Record<string, any>, queryParams?: Record<string, any>): Promise<T>;
  post<T>(endpoint: string, body: any, pathParams?: Record<string, any>): Promise<T>;
  put<T>(endpoint: string, pathParams: Record<string, any>, body: any): Promise<T>;
  delete<T>(endpoint: string, pathParams: Record<string, any>): Promise<T>;
  
  // User Management APIs
  getUsers(params?: Record<string, any>): Promise<any>;
  getUserById(id: number): Promise<any>;
  createUser(userData: any): Promise<any>;
  updateUser(id: number, userData: any): Promise<any>;
  deleteUser(id: number): Promise<any>;
  getUserRoles(): Promise<any>;
  toggleUserStatus(id: number, isActive: boolean): Promise<any>;
  
  // Project Management APIs
  getProjects(params?: Record<string, any>): Promise<any>;
  getProjectById(id: number): Promise<any>;
  createProject(projectData: any): Promise<any>;
  updateProject(id: number, projectData: any): Promise<any>;
  deleteProject(id: number): Promise<any>;
  addProjectMember(projectId: number, memberId: number): Promise<any>;
  
  // File Management APIs
  uploadFile(file: File, onProgress?: (progress: number) => void): Promise<any>;
  
  // Auth APIs
  login(credentials: { username: string; password: string }): Promise<any>;
  refreshToken(): Promise<any>;
  logout(): Promise<any>;
  getCurrentUser(): Promise<any>;
  
  // Cache management
  clearCache(): void;
}

class ApiBroker implements ApiBrokerInterface {
  private callApi: Function;
  private cache = new Map<string, CacheItem>();
  private cacheTTL = 60000; // 1 phút mặc định
  
  constructor(callApiFunction: Function) {
    this.callApi = callApiFunction;
  }
  
  // Utility method để log API calls
  private logApiCall(endpoint: string, method: string, startTime: number): void {
    const duration = Date.now() - startTime;
    console.log(`[API] ${method} ${endpoint} - ${duration}ms`);
    
    // Log các API call chậm
    if (duration > 1000) {
      console.warn(`[API] Slow API call: ${method} ${endpoint} - ${duration}ms`);
    }
  }
  
  // Utility method cho lỗi API
  private logApiError(endpoint: string, method: string, error: any): void {
    console.error(`[API ERROR] ${method} ${endpoint} - ${error.message}`);
  }
  
  // ----- GENERIC METHODS -----
  
  /**
   * Phương thức GET generic
   */
  async get<T>(endpoint: string, pathParams = {}, queryParams = {}): Promise<T> {
    const cacheKey = `GET:${endpoint}:${JSON.stringify(pathParams)}:${JSON.stringify(queryParams)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    
    const startTime = Date.now();
    try {
      const result = await this.callApi(endpoint, pathParams, queryParams);
      this.logApiCall(endpoint, 'GET', startTime);
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      this.logApiError(endpoint, 'GET', error);
      throw error;
    }
  }
  
  /**
   * Phương thức POST generic
   */
  async post<T>(endpoint: string, body: any, pathParams = {}): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await this.callApi(endpoint, pathParams, {}, {
        method: 'POST',
        body
      });
      this.logApiCall(endpoint, 'POST', startTime);
      return result;
    } catch (error) {
      this.logApiError(endpoint, 'POST', error);
      throw error;
    }
  }
  
  /**
   * Phương thức PUT generic
   */
  async put<T>(endpoint: string, pathParams: Record<string, any>, body: any): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await this.callApi(endpoint, pathParams, {}, {
        method: 'PUT',
        body
      });
      this.logApiCall(endpoint, 'PUT', startTime);
      return result;
    } catch (error) {
      this.logApiError(endpoint, 'PUT', error);
      throw error;
    }
  }
  
  /**
   * Phương thức DELETE generic
   */
  async delete<T>(endpoint: string, pathParams: Record<string, any>): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await this.callApi(endpoint, pathParams, {}, {
        method: 'DELETE'
      });
      this.logApiCall(endpoint, 'DELETE', startTime);
      return result;
    } catch (error) {
      this.logApiError(endpoint, 'DELETE', error);
      throw error;
    }
  }
  
  /**
   * Xử lý authentication cho API calls
   */
  async callWithAuth<T>(endpoint: string, ...args: any[]): Promise<T> {
    try {
      return await this.callApi(endpoint, ...args);
    } catch (error) {
      // Nếu token hết hạn, thử refresh token và gọi lại API
      if (error.status === 401) {
        try {
          await this.refreshToken();
          // Thử lại request sau khi refresh token
          return await this.callApi(endpoint, ...args);
        } catch (refreshError) {
          // Nếu refresh token cũng lỗi, throw lỗi và người dùng cần đăng nhập lại
          throw new AuthorizationError('Session expired. Please login again.');
        }
      }
      throw error;
    }
  }
  
  // ----- USER MANAGEMENT APIs -----
  
  async getUsers(params?: Record<string, any>) {
    return this.get(API_ENDPOINTS.USERS.LIST, {}, params);
  }
  
  async getUserById(id: number) {
    return this.get(API_ENDPOINTS.USERS.DETAIL, { id });
  }
  
  async createUser(userData: any) {
    return this.post(API_ENDPOINTS.USERS.CREATE, userData);
  }
  
  async updateUser(id: number, userData: any) {
    return this.put(API_ENDPOINTS.USERS.DETAIL, { id }, userData);
  }
  
  async deleteUser(id: number) {
    return this.delete(API_ENDPOINTS.USERS.DETAIL, { id });
  }
  
  async getUserRoles() {
    return this.get(API_ENDPOINTS.USERS.ROLES, {});
  }
  
  async toggleUserStatus(id: number, isActive: boolean) {
    return this.put(API_ENDPOINTS.USERS.DETAIL, { id }, { is_active: isActive });
  }
  
  // ----- PROJECT MANAGEMENT APIs -----
  
  async getProjects(params?: Record<string, any>) {
    return this.get(API_ENDPOINTS.PROJECTS.LIST, {}, params);
  }
  
  async getProjectById(id: number) {
    return this.get(API_ENDPOINTS.PROJECTS.DETAIL, { id });
  }
  
  async createProject(projectData: any) {
    return this.post(API_ENDPOINTS.PROJECTS.CREATE, projectData);
  }
  
  async updateProject(id: number, projectData: any) {
    return this.put(API_ENDPOINTS.PROJECTS.UPDATE, { id }, projectData);
  }
  
  async deleteProject(id: number) {
    return this.delete(API_ENDPOINTS.PROJECTS.DELETE, { id });
  }
  
  async addProjectMember(projectId: number, memberId: number) {
    return this.post(API_ENDPOINTS.PROJECTS.ADD_MEMBER, { project_id: projectId, user_id: memberId }, { id: projectId });
  }
  
  // ----- FILE MANAGEMENT APIs -----
  
  async uploadFile(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.callApi(API_ENDPOINTS.FILES.UPLOAD, {}, {}, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onProgress
    });
  }
  
  // ----- AUTH APIs -----
  
  async login(credentials: { username: string; password: string }) {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }
  
  async refreshToken() {
    return this.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {});
  }
  
  async logout() {
    return this.post(API_ENDPOINTS.AUTH.LOGOUT, {});
  }
  
  async getCurrentUser() {
    return this.get(API_ENDPOINTS.AUTH.ME, {});
  }
  
  // ----- CACHE MANAGEMENT -----
  
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Set cache TTL (Time To Live) in milliseconds
   */
  setCacheTTL(ttl: number): void {
    this.cacheTTL = ttl;
  }
  
  /**
   * Get cached item by key
   */
  getCachedItem(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    return null;
  }
}

export default ApiBroker;
