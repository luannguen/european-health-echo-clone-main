/**
 * API Endpoints Constants
 * Định nghĩa tập trung tất cả các endpoint API trong ứng dụng
 */

// Cấu trúc theo đúng convention đã đề cập trong documentation
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout-all',
    ME: '/auth/me'
  },
  USERS: {
    LIST: '/users',
    DETAIL: '/users/:id',
    CREATE: '/users',
    ROLES: '/roles',
    USER_ROLES: '/users/:id/roles'
  },
  ROLES: {
    LIST: '/roles',
    DETAIL: '/roles/:id',
    CREATE: '/roles',
    UPDATE: '/roles/:id'
  },
  PASSWORD_RESET: {
    REQUEST: '/password-reset/request',
    VERIFY: '/password-reset/verify/:token',
    RESET: '/password-reset/reset'
  },
  // Thêm endpoints cho Projects theo documentation
  PROJECTS: {
    LIST: '/projects',
    DETAIL: '/projects/:id',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
    MEMBERS: '/projects/:id/members',
    ADD_MEMBER: '/projects/:id/members'
  },
  // Thêm endpoints cho Files
  FILES: {
    UPLOAD: '/files/upload',
    LIST: '/files',
    DELETE: '/files/:id'
  }
};
