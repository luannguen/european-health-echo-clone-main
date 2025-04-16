/**
 * AuthorizationService
 * Service kiểm tra quyền truy cập và phân quyền
 */

import userService from './user.service.js';
import authEventEmitter from '../events/auth-events.js';

class AuthorizationService {
  constructor() {
    // Danh sách vai trò hệ thống
    this.systemRoles = ['admin', 'editor', 'customer'];
    
    // Cấu hình phân cấp vai trò (admin có quyền cao nhất)
    this.roleHierarchy = {
      'admin': 100,
      'editor': 50,
      'customer': 10
    };
  }

  /**
   * Kiểm tra người dùng có vai trò cần thiết
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {string|Array<string>} roles - Vai trò cần kiểm tra
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async hasRole(user, roles) {
    try {
      // Chuẩn hóa tham số
      const rolesToCheck = Array.isArray(roles) ? roles : [roles];
      
      // Nếu danh sách vai trò trống, trả về false
      if (rolesToCheck.length === 0) {
        return false;
      }
      
      // Nếu user là ID, lấy thông tin người dùng từ database
      let userInfo = user;
      
      if (typeof user === 'number' || typeof user === 'string') {
        userInfo = await userService.getUserById(user);
        
        if (!userInfo) {
          return false; // Không tìm thấy người dùng
        }
      }
      
      // Nếu không có thông tin vai trò, trả về false
      if (!userInfo || !userInfo.role) {
        return false;
      }
      
      // Kiểm tra vai trò
      const hasRole = rolesToCheck.includes(userInfo.role);
      
      // Ghi log hoạt động phân quyền
      this.logAuthorizationActivity(userInfo.id || userInfo.user_id, {
        action: 'check_role',
        required: rolesToCheck.join(','),
        actual: userInfo.role,
        granted: hasRole
      });
      
      return hasRole;
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  }

  /**
   * Kiểm tra người dùng có quyền cao hơn hoặc bằng vai trò cần thiết
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {string} minRole - Vai trò tối thiểu
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async hasMinimumRole(user, minRole) {
    try {
      // Nếu user là ID, lấy thông tin người dùng từ database
      let userInfo = user;
      
      if (typeof user === 'number' || typeof user === 'string') {
        userInfo = await userService.getUserById(user);
        
        if (!userInfo) {
          return false; // Không tìm thấy người dùng
        }
      }
      
      // Nếu không có thông tin vai trò, trả về false
      if (!userInfo || !userInfo.role || !this.roleHierarchy[userInfo.role]) {
        return false;
      }
      
      // Lấy cấp độ vai trò tối thiểu
      const minRoleLevel = this.roleHierarchy[minRole] || 0;
      
      // Lấy cấp độ vai trò của người dùng
      const userRoleLevel = this.roleHierarchy[userInfo.role] || 0;
      
      // Kiểm tra cấp độ vai trò
      const hasMinRole = userRoleLevel >= minRoleLevel;
      
      // Ghi log hoạt động phân quyền
      this.logAuthorizationActivity(userInfo.id || userInfo.user_id, {
        action: 'check_min_role',
        required: minRole,
        actual: userInfo.role,
        granted: hasMinRole
      });
      
      return hasMinRole;
    } catch (error) {
      console.error('Error checking user minimum role:', error);
      return false;
    }
  }

  /**
   * Kiểm tra người dùng có phải là admin
   * @param {Object|number|string} user - User object hoặc user ID
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async isAdmin(user) {
    return this.hasRole(user, 'admin');
  }

  /**
   * Kiểm tra quyền sở hữu tài nguyên
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {Object} resource - Tài nguyên cần kiểm tra
   * @param {string} [ownerField] - Tên trường chứa user ID, mặc định là 'user_id'
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async isOwner(user, resource, ownerField = 'user_id') {
    try {
      // Nếu không có resource hoặc ownerField, trả về false
      if (!resource || !resource[ownerField]) {
        return false;
      }
      
      // Lấy ID người dùng
      let userId;
      
      if (typeof user === 'object') {
        userId = user.id || user.user_id;
      } else {
        userId = user;
      }
      
      // Kiểm tra quyền sở hữu
      const isOwner = String(resource[ownerField]) === String(userId);
      
      // Ghi log hoạt động phân quyền
      this.logAuthorizationActivity(userId, {
        action: 'check_ownership',
        resourceType: typeof resource,
        resourceField: ownerField, 
        resourceOwnerId: resource[ownerField],
        granted: isOwner
      });
      
      return isOwner;
    } catch (error) {
      console.error('Error checking resource ownership:', error);
      return false;
    }
  }

  /**
   * Kiểm tra người dùng có quyền truy cập dựa trên vai trò hoặc quyền sở hữu
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {string|Array<string>} roles - Vai trò cần kiểm tra
   * @param {Object} [resource] - Tài nguyên cần kiểm tra
   * @param {string} [ownerField] - Tên trường chứa user ID
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async hasAccess(user, roles, resource = null, ownerField = 'user_id') {
    try {
      // Kiểm tra quyền dựa trên vai trò
      const hasRoleAccess = await this.hasRole(user, roles);
      
      // Nếu người dùng có vai trò phù hợp, cho phép truy cập
      if (hasRoleAccess) {
        return true;
      }
      
      // Nếu có resource, kiểm tra quyền sở hữu
      if (resource) {
        return this.isOwner(user, resource, ownerField);
      }
      
      // Nếu không có resource và không có vai trò phù hợp, từ chối truy cập
      return false;
    } catch (error) {
      console.error('Error checking access:', error);
      return false;
    }
  }

  /**
   * Ghi log hoạt động phân quyền
   * @param {number|string} userId - ID người dùng
   * @param {Object} details - Chi tiết hoạt động
   */
  logAuthorizationActivity(userId, details) {
    authEventEmitter.emit('auth:authorization_check', {
      userId,
      action: details.action || 'authorization_check',
      details: JSON.stringify(details),
      timestamp: new Date()
    });
  }
}

// Export singleton instance
export default new AuthorizationService();
