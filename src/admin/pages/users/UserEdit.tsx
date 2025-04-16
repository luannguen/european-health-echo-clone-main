import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { User, UserRole, useUserController } from '../../controllers/UserController';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

// Form validation schema for basic info
const basicInfoSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  full_name: z.string().optional(),
  role: z.string().min(1, 'Please select a role'),
  is_active: z.boolean().default(true),
});

// Form validation schema for password change
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Sử dụng UserController để quản lý API calls
  const {
    getUserById,
    updateUser,
    getUserRoles,
    changePassword,
    isLoading: controllerLoading,
    error
  } = useUserController();

  // Initialize basic info form
  const basicInfoForm = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      username: '',
      email: '',
      full_name: '',
      role: '',
      is_active: true,
    },
  });

  // Initialize password form
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
    // Load user data and roles when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load roles using UserController
        const rolesResponse = await getUserRoles();
        const rolesData = rolesResponse?.data || [];
        setRoles(rolesData as UserRole[]);
        
        // Load user data
        if (id) {
          const userResponse = await getUserById(parseInt(id, 10));
          const userData = userResponse?.data || userResponse;
          // Set the user data directly
          setUser(userData);

          // Set form values with optional chaining to prevent errors
          basicInfoForm.reset({
            username: userData?.username || '',
            email: userData?.email || '',
            full_name: userData?.full_name || '',
            role: userData?.role || '',
            is_active: userData?.is_active ?? true,
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load user data',
          variant: 'destructive',
        });
        // Navigate back if user not found
        navigate('/admin/users');
      }
    };
    
    loadData();
  }, [id, toast, navigate, basicInfoForm, getUserRoles, getUserById]);
    // Handle basic info form submission
  const onBasicInfoSubmit = async (data: BasicInfoValues) => {
    try {
      if (id) {
        const response = await updateUser(parseInt(id, 10), data);
        
        // Refresh user data
        const userResponse = await getUserById(parseInt(id, 10));
        const userData = userResponse?.data || userResponse;
        setUser(userData);
        
        toast({
          title: "Success",
          description: "User information updated successfully",
        });
      }
    } catch (error) {
      // Error handling is done in the controller
    }
  };
  
  // Handle password form submission
  const onPasswordSubmit = async (data: PasswordValues) => {
    try {
      if (id) {
        await changePassword(
          parseInt(id, 10), 
          data.currentPassword, 
          data.newPassword
        );
        
        // Reset password form
        passwordForm.reset();
        
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
      }
    } catch (error) {
      // Error handling is done in the controller
    }
  };

  const renderContent = () => {
    if (controllerLoading) {
      return (
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading user data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit User</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...basicInfoForm}>
                  <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={basicInfoForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username*</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={basicInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={basicInfoForm.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={basicInfoForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role.role_id} value={role.name}>
                                    {role.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={basicInfoForm.control}
                        name="is_active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Active Status
                              </FormLabel>
                              <div className="text-sm text-muted-foreground">
                                User will be able to log in if active
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/users')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={controllerLoading}>
                        {controllerLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password*</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter current password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password*</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Password must be at least 8 characters long
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password*</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab('basic')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={controllerLoading}>
                        {controllerLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Changing Password...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return renderContent();
};

export default UserEdit;