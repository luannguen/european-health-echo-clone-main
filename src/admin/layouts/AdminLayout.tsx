import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  NewspaperIcon, 
  TagIcon,
  LayoutDashboardIcon,
  PackageIcon,
  BookOpenIcon,
  FileTextIcon,
  MessageSquareIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  DatabaseIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';

// Navigation items for the sidebar
const navItems = [
  { 
    name: 'Dashboard', 
    icon: LayoutDashboardIcon, 
    path: '/admin' 
  },
  { 
    name: 'Users', 
    icon: UserIcon, 
    path: '/admin/users' 
  },
  { 
    name: 'News', 
    icon: NewspaperIcon, 
    path: '/admin/news' 
  },
  { 
    name: 'Categories', 
    icon: TagIcon, 
    path: '/admin/categories' 
  },
  { 
    name: 'Products', 
    icon: PackageIcon, 
    path: '/admin/products' 
  },
  { 
    name: 'Projects', 
    icon: BookOpenIcon, 
    path: '/admin/projects' 
  },
  { 
    name: 'Services', 
    icon: FileTextIcon, 
    path: '/admin/services' 
  },
  { 
    name: 'Messages', 
    icon: MessageSquareIcon, 
    path: '/admin/messages' 
  },
  { 
    name: 'Database', 
    icon: DatabaseIcon, 
    path: '/admin/database' 
  },
  { 
    name: 'Settings', 
    icon: SettingsIcon, 
    path: '/admin/settings' 
  }
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };
  
  // Check if a nav item is currently active
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="font-bold text-xl">VRC Admin</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <XIcon size={18} />
            </Button>
          </div>
          
          {/* Sidebar navigation */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  {user?.full_name ? (
                    <AvatarImage src={user.avatar} alt={user.full_name} />
                  ) : null}
                  <AvatarFallback>
                    {user?.full_name ? getInitials(user.full_name) : user?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.full_name || user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SettingsIcon size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`/admin/users/${user?.user_id}`)}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircleIcon className="mr-2 h-4 w-4" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <MenuIcon size={18} />
            </Button>
            
            <div className="ml-auto flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Link to="/" target="_blank" className="flex items-center">
                  View Site
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Breadcrumbs could go here */}
          <div className="px-6 py-2 flex items-center bg-gray-50">
            <span className="text-sm text-gray-500">
              {location.pathname.split('/').filter(Boolean).map((part, i, arr) => (
                // Thay đổi từ React.Fragment sang div để tránh lỗi data-lov-id
                <div key={i} className="inline-block">
                  {i > 0 && <span className="mx-1">/</span>}
                  <span className={cn(
                    i === arr.length - 1 ? "font-medium text-gray-900" : ""
                  )}>
                    {part.charAt(0).toUpperCase() + part.slice(1)}
                  </span>
                </div>
              ))}
            </span>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;