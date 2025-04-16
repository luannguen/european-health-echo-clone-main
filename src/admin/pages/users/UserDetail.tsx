import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { ArrowLeft, Loader2, Pencil, AlertCircle } from 'lucide-react';
import { useUserController, User } from '../../controllers/UserController';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // Sử dụng UserController để quản lý API calls
  const {
    getUserById,
    deleteUser,
    toggleUserStatus,
    isLoading,
    error
  } = useUserController();

  // Load user data when component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserById(Number(id));
        setUser(userData);
      } catch (error) {
        // Lỗi đã được xử lý trong controller
        console.error("Failed to load user:", error);
      }
    };
    
    if (id) {
      loadUser();
    }
  }, [id, getUserById]);  // Handle user deletion - Sử dụng UserController
  const handleDeleteUser = async () => {
    try {
      const success = await deleteUser(Number(id));
      if (success) {
        navigate('/admin/users');
      }
    } catch (error: any) {
      // Lỗi đã được xử lý trong controller
      console.error("Delete error:", error);
    }
  };

  // Handle user status toggle - Sử dụng UserController
  const handleToggleStatus = async () => {
    if (!user) return;
    
    try {
      const success = await toggleUserStatus(Number(id), user.is_active);
      if (success) {
        // Update local state
        setUser(prev => prev ? { ...prev, is_active: !prev.is_active } : null);
      }
    } catch (error: any) {
      // Lỗi đã được xử lý trong controller
      console.error("Status toggle error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center h-64">
            <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to Load User</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button asChild>
              <Link to="/admin/users">Go Back to Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center h-64">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-gray-500 mb-4">The requested user could not be found</p>
            <Button asChild>
              <Link to="/admin/users">Go Back to Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to={`/admin/users/${id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit User
            </Link>
          </Button>
          <Button 
            variant={user.is_active ? "destructive" : "default"}
            onClick={handleToggleStatus}
          >
            {user.is_active ? 'Deactivate' : 'Activate'} User
          </Button>
          <Button 
            variant="outline" 
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={handleDeleteUser}
          >
            Delete User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-500 mb-1">ID</h3>
                <p>{user.user_id}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Username</h3>
                <p>{user.username}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Full Name</h3>
                <p>{user.full_name || '-'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Role</h3>
                <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                  {user.role}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Status</h3>
                <Badge variant={user.is_active ? 'success' : 'outline'}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Created At</h3>
                <p>{new Date(user.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Last Updated</h3>
                <p>{user.updated_at ? new Date(user.updated_at).toLocaleString() : '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
              <p className="text-gray-500">No recent activity to display</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;