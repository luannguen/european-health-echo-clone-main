import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { useRoleDomainService } from '../hooks/useRoleDomainService';
import { DomainOperationResult } from '../services/domain/base-domain-service';

export interface Role {
  role_id: number;
  name: string;
  description: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface Permission {
  permission_id: number;
  name: string;
  description: string;
  module: string;
}

/**
 * Controller cho chức năng quản lý vai trò (roles)
 * Đóng vai trò trung gian giữa UI và API Broker
 */
export const useRoleController = () => {
  const roleDomainService = useRoleDomainService();
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
    // Lấy danh sách roles với phân trang và tìm kiếm
  const getRoles = async (params: Record<string, any> = {}) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để lấy danh sách roles
      const operationResult = await roleDomainService.getRoles(params); 
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch roles');
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch roles',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy thông tin chi tiết role
  const getRoleById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để lấy thông tin role
      const operationResult = await roleDomainService.getRoleById(id);
      return handleDomainResult(operationResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch role details');
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch role details',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Tạo role mới
  const createRole = async (roleData: Partial<Role>) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để tạo role mới
      const operationResult = await roleDomainService.createRole(roleData);
      return handleDomainResult(operationResult, "Role created successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to create role');
      toast({
        title: "Error",
        description: err.message || 'Failed to create role',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
    // Cập nhật thông tin role
  const updateRole = async (id: number, roleData: Partial<Role>) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Gọi domain service để cập nhật thông tin role
      const operationResult = await roleDomainService.updateRole(id, roleData);
      return handleDomainResult(operationResult, "Role updated successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to update role');
      toast({
        title: "Error",
        description: err.message || 'Failed to update role',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xóa role
  const deleteRole = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      if (!window.confirm('Are you sure you want to delete this role?')) {
        return false;
      }
      
      // Gọi domain service để xóa role
      const operationResult = await roleDomainService.deleteRole(id);
      return handleDomainResult(operationResult, "Role deleted successfully");
    } catch (err: any) {
      setError(err.message || 'Failed to delete role');
      toast({
        title: "Error",
        description: err.message || 'Failed to delete role',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy danh sách permissions
  const getPermissions = async () => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Giả sử có endpoint riêng cho permissions
      const result = await apiBroker.get('/permissions', {});
      return result;
    } catch (err: any) {
      handleApiError(err, 'Failed to fetch permissions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Gán permissions cho role
  const assignPermissionsToRole = async (roleId: number, permissionIds: number[]) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Giả sử endpoint này tồn tại trong API
      const result = await apiBroker.post(`/roles/${roleId}/permissions`, { permission_ids: permissionIds });
      toast({
        title: "Success",
        description: "Permissions assigned successfully",
      });
      return result;
    } catch (err: any) {
      handleApiError(err, 'Failed to assign permissions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy danh sách users thuộc một role
  const getUsersByRoleId = async (roleId: number) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    try {
      // Giả sử endpoint này tồn tại trong API
      const result = await apiBroker.get(`/roles/${roleId}/users`, {});
      return result;
    } catch (err: any) {
      handleApiError(err, 'Failed to fetch users with this role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getPermissions,
    assignPermissionsToRole,
    getUsersByRoleId,
    isLoading,
    error,
    validationErrors
  };
};

export default useRoleController;
