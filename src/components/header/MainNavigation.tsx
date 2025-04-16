import { ChevronDown } from 'lucide-react';
import AppLink from '@/components/ui/app-link';

interface MainNavigationProps {
  isMobile?: boolean;
}

const MainNavigation = ({ isMobile = false }: MainNavigationProps) => {  // Navigation links that are used in both desktop and mobile views
  const navLinks = [
    { title: "Giới thiệu", routeKey: "ABOUT" },
    { title: "Sản phẩm", routeKey: "PRODUCTS" },
    { title: "Dự án", routeKey: "PROJECTS" },
    { title: "Công nghệ & thiết bị", routeKey: "TECHNOLOGIES" },
    { title: "Dịch vụ", routeKey: "SERVICES" },
    { title: "Liên hệ", routeKey: "CONTACT" },
  ];
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navLinks.map((item, index) => (
          <AppLink key={index} routeKey={item.routeKey} className="navbar-link text-lg">{item.title}</AppLink>
        ))}
        <AppLink routeKey="NEWS" className="navbar-link text-lg">Tin tức</AppLink>
        <AppLink routeKey="EVENTS" className="navbar-link text-lg">Sự kiện</AppLink>
      </nav>
    );
  }
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((item, index) => (
        <AppLink key={index} routeKey={item.routeKey} className="navbar-link text-base font-medium">{item.title}</AppLink>
      ))}
      <div className="relative group">
        <button className="navbar-link text-base font-medium flex items-center">
          <span>Thêm</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
        <div className="absolute hidden group-hover:block bg-white/10 backdrop-blur-sm shadow-lg p-4 rounded min-w-40 right-0">
          <div className="flex flex-col space-y-2">
            <AppLink routeKey="NEWS" className="text-primary hover:text-accent text-base">Tin tức</AppLink>
            <AppLink routeKey="EVENTS" className="text-primary hover:text-accent text-base">Sự kiện</AppLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;