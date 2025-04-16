import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { useUserDomainService } from '../hooks/useUserDomainService';
import { DomainOperationResult } from '../services/domain/base-domain-service';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
  avatar_url?: string;
}

export interface UserRole {
  role_id: number;
  name: string;
  description: string;
}

/**
 * Controller cho chức năng quản lý người dùng
 * Đóng vai trò trung gian giữa UI và API Broker
 */
export const useUserController = () => {
  const userDomainService = useUserDomainService();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
  
  /**
   * Xử lý kết quả trả về từ domain service
   */
  const handleDomainResult = <T,>(result: DomainOperationResult<T>, successMessage?: string): T | null => {
    if (!result.success) {
      // Xử lý lỗi từ domain service
      setValidationErrors(result.validationErrors || null);
      setError(result.error?.message || 'An error occurred');
      
      toast({
        title: "Error",
        description: result.error?.message || "An error occurred",
        variant: "destructive",
      });
      
      return null;
    }
    
    // Hiển thị thông báo thành công nếu có
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
      });
    }
    
    return result.data as T;
  };
    // Lấy danh sách users với phân trang và tìm kiếm
  const getUsers = async (params: Record<string, any> = {}) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để lấy danh sách users
      const operationResult = await userDomainService.getUsers(params);
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch users',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy thông tin chi tiết user
  const getUserById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để lấy thông tin user
      const operationResult = await userDomainService.getUserById(id);
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user details');
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch user details',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Tạo user mới
  const createUser = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để tạo user mới
      const operationResult = await userDomainService.createUser(userData);
      return handleDomainResult(operationResult, "User created successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
      toast({
        title: "Error",
        description: err.message || 'Failed to create user',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
    // Cập nhật thông tin user
  const updateUser = async (id: number, userData: any) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để cập nhật thông tin user
      const operationResult = await userDomainService.updateUser(id, userData);
      return handleDomainResult(operationResult, "User updated successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
      toast({
        title: "Error",
        description: err.message || 'Failed to update user',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xóa user
  const deleteUser = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      if (!window.confirm('Are you sure you want to delete this user?')) {
        return false;
      }
      
      // Gọi domain service để xóa user
      const operationResult = await userDomainService.deleteUser(id);
      return handleDomainResult(operationResult, "User deleted successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
      toast({
        title: "Error",
        description: err.message || 'Failed to delete user',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
    // Bật/tắt trạng thái active của user
  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để thay đổi trạng thái user
      const operationResult = await userDomainService.toggleUserStatus(userId, !currentStatus);
      return handleDomainResult(
        operationResult, 
        `User ${currentStatus ? 'deactivated' : 'activated'} successfully`
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update user status');
      toast({
        title: "Error",
        description: err.message || 'Failed to update user status',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy danh sách role
  const getUserRoles = async () => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để lấy danh sách role
      const operationResult = await userDomainService.getUserRoles();
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user roles');
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch user roles',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
    // Thay đổi mật khẩu
  const changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để thay đổi mật khẩu
      const operationResult = await userDomainService.changePassword(userId, currentPassword, newPassword);
      return handleDomainResult(operationResult, "Password changed successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      toast({
        title: "Error",
        description: err.message || 'Failed to change password',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Yêu cầu đặt lại mật khẩu
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để yêu cầu đặt lại mật khẩu
      const operationResult = await userDomainService.requestPasswordReset(email);
      return handleDomainResult(operationResult, "Password reset email sent successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset');
      toast({
        title: "Error",
        description: err.message || 'Failed to request password reset',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xác thực token đặt lại mật khẩu
  const verifyResetToken = async (token: string) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để xác thực token
      const operationResult = await userDomainService.verifyResetToken(token);
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired reset token');
      toast({
        title: "Error",
        description: err.message || 'Invalid or expired reset token',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Đặt lại mật khẩu với token
  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để đặt lại mật khẩu
      const operationResult = await userDomainService.resetPassword(token, newPassword);
      return handleDomainResult(operationResult, "Password reset successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      toast({
        title: "Error",
        description: err.message || 'Failed to reset password',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUserRoles,
    changePassword,
    requestPasswordReset,
    verifyResetToken,
    resetPassword,
    isLoading,
    error,
    validationErrors
  };
};

export default useUserController;
