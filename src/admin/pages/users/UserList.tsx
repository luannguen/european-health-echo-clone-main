import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Loader2, MoreHorizontal, Plus, Search, RefreshCw, UserPlus } from 'lucide-react';
import { useUserController, User, PaginationInfo } from '../../controllers/UserController';

const UserList = () => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState<string | undefined>(undefined);
  const [roles, setRoles] = useState<string[]>([]);
  
  // Sử dụng UserController để quản lý API calls
  const { 
    getUsers, 
    getUserRoles, 
    deleteUser,
    toggleUserStatus,
    isLoading,
    error 
  } = useUserController();
  
  // Load valid roles when component mounts
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await getUserRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };
    
    loadRoles();
  }, [getUserRoles]);
  
  // Load users when component mounts or filters change
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const queryParams = {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...(searchTerm && { search: searchTerm }),
          ...(role && { role })
        };
        
        const result = await getUsers(queryParams);
        if (result) {
          setUsers(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    
    loadUsers();
  }, [pagination.currentPage, pagination.pageSize, searchTerm, role, getUsers]);
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle role filter change
  const handleRoleChange = (value: string) => {
    setRole(value === "all" ? undefined : value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle page change
  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  // Handle page size change
  const changePageSize = (size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
  };
  
  // Handle user deletion - Sử dụng controller
  const handleDeleteUser = async (userId: number) => {
    try {
      const success = await deleteUser(userId);
      if (success) {
        // Refresh user list nếu xóa thành công
        const queryParams = {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...(searchTerm && { search: searchTerm }),
          ...(role && { role })
        };
        const result = await getUsers(queryParams);
        if (result) {
          setUsers(result.data);
          setPagination(result.pagination);
        }
      }
    } catch (error: any) {
      // Lỗi đã được xử lý trong controller
      console.error("Delete error:", error);
    }
  };
  
  // Handle toggling user active status - Sử dụng controller
  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const success = await toggleUserStatus(userId, currentStatus);
      if (success) {
        // Update the local state nếu thành công
        setUsers(users.map(user => 
          user.user_id === userId 
            ? { ...user, is_active: !currentStatus } 
            : user
        ));
      }
    } catch (error: any) {
      // Lỗi đã được xử lý trong controller
      console.error("Toggle status error:", error);
    }
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    const maxItems = 5;
    let startPage = Math.max(pagination.currentPage - 2, 1);
    let endPage = Math.min(startPage + maxItems - 1, pagination.totalPages);
    
    if (endPage - startPage + 1 < maxItems) {
      startPage = Math.max(endPage - maxItems + 1, 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => changePage(i)} 
            isActive={pagination.currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">View and manage user accounts</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/admin/users/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {pagination.totalItems} total users
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={role || 'all'} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>            <Button variant="outline" onClick={() => {
              const queryParams = {
                page: pagination.currentPage,
                pageSize: pagination.pageSize,
                ...(searchTerm && { search: searchTerm }),
                ...(role && { role })
              };
              getUsers(queryParams).then(result => {
                if (result) {
                  setUsers(result.data);
                  setPagination(result.pagination);
                }
              });
            }} className="sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="hidden md:table-cell">Full Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <span className="mt-2 block text-sm text-gray-500">Loading users...</span>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <span className="text-sm text-gray-500">No users found</span>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell className="font-medium">{user.user_id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.full_name || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? "destructive" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>                      <TableCell>
                        <Badge variant={user.is_active ? "secondary" : "outline"}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/users/${user.user_id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/users/${user.user_id}/edit`}>
                                Edit User
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.user_id, user.is_active)}>
                              {user.is_active ? 'Deactivate' : 'Activate'} User
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteUser(user.user_id)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="text-sm text-gray-500">
              Showing {users.length > 0 ? (pagination.currentPage - 1) * pagination.pageSize + 1 : 0} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of {pagination.totalItems} users
            </div>
            <div className="flex items-center gap-2">
              <Select 
                value={pagination.pageSize.toString()} 
                onValueChange={(value) => changePageSize(parseInt(value))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => changePage(Math.max(1, pagination.currentPage - 1))}
                      className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {getPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => changePage(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                      className={pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;