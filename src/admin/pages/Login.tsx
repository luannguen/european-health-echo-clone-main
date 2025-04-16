import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Form validation schema
const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setFormError(null);
    try {
      await login(data.username, data.password);
      // If login is successful, the auth context will redirect to admin dashboard
    } catch (error: any) {
      setFormError(error.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
            <CardDescription>Sign in to your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            {(error || formError) && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || formError}
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-gray-500 text-sm">
            <div>
              Forgot your password? Contact the system administrator
            </div>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;