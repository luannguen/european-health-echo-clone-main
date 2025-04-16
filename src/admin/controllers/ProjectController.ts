import { useApiBroker } from '../hooks/useApiBroker';
import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface Project {
  project_id: number;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  user_id: number;
  username: string;
  full_name: string;
  role: string;
}

/**
 * Controller cho chức năng quản lý dự án
 * Đóng vai trò trung gian giữa UI và API Broker
 */
export const useProjectController = () => {
  const apiBroker = useApiBroker();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Lấy danh sách projects với phân trang và tìm kiếm
  const getProjects = async (params: Record<string, any> = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.getProjects(params);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      toast({
        title: "Error",
        description: err.message || "Failed to fetch projects",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy thông tin chi tiết project
  const getProjectById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.getProjectById(id);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch project details');
      toast({
        title: "Error",
        description: err.message || "Failed to fetch project details",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Tạo project mới
  const createProject = async (projectData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.createProject(projectData);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      toast({
        title: "Error",
        description: err.message || "Failed to create project",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cập nhật thông tin project
  const updateProject = async (id: number, projectData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.updateProject(id, projectData);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      toast({
        title: "Error",
        description: err.message || "Failed to update project",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xóa project
  const deleteProject = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!window.confirm('Are you sure you want to delete this project?')) {
        return false;
      }
      
      await apiBroker.deleteProject(id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
      toast({
        title: "Error",
        description: err.message || "Failed to delete project",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Thêm thành viên vào project
  const addProjectMember = async (projectId: number, memberId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.addProjectMember(projectId, memberId);
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to add team member');
      toast({
        title: "Error",
        description: err.message || "Failed to add team member",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Ví dụ về xử lý transaction với nhiều API calls
  const createProjectWithTeam = async (projectData: any, teamMembers: number[]) => {
    setIsLoading(true);
    setError(null);
    try {
      // Tạo project
      const project = await apiBroker.createProject(projectData);
      
      // Thêm thành viên vào project
      for (const memberId of teamMembers) {
        await apiBroker.addProjectMember(project.data.project_id, memberId);
      }
      
      toast({
        title: "Success",
        description: "Project created with team members successfully",
      });
      
      return project;
    } catch (err: any) {
      setError(err.message || 'Failed to create project with team');
      toast({
        title: "Error",
        description: err.message || "Failed to create project with team",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addProjectMember,
    createProjectWithTeam,
    isLoading,
    error
  };
};

export default useProjectController;
