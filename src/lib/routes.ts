/**
 * Centralized route configuration for the application
 * This file contains all route definitions to ensure consistency across the app
 * 
 * ====== HƯỚNG DẪN TẠO TRANG MỚI VÀ ĐĂNG KÝ ROUTES ======
 * 
 * 1. TẠO FILE COMPONENT CHO TRANG MỚI:
 *    - Tạo file React component mới trong thư mục src/pages/ hoặc thư mục con phù hợp
 *    - Ví dụ: src/pages/NewPage.tsx hoặc src/pages/category/NewPage.tsx
 * 
 * 2. ĐĂNG KÝ ROUTE MỚI:
 *    - Mở file này (src/lib/routes.ts) và thêm định nghĩa route mới vào object ROUTES
 *    - Tuân thủ format: KEY: { path: '/đường-dẫn', label: 'Tên hiển thị' }
 *    - Ví dụ: NEW_PAGE: { path: '/new-page', label: 'Trang Mới' }
 *    - Đặt trong nhóm routes phù hợp hoặc tạo nhóm mới nếu cần
 * 
 * 3. CẬP NHẬT NAVIGATION:
 *    - Nếu trang cần xuất hiện trong menu, cập nhật component navigation tương ứng
 *    - Thông thường là trong src/components/header/MainNavigation.tsx
 *    - Import và sử dụng route key từ file này: import { ROUTES } from '@/lib/routes'
 * 
 * 4. CẬP NHẬT APP ROUTING:
 *    - Thêm route mới vào hệ thống routing của ứng dụng trong App.tsx hoặc Router.tsx
 *    - Đảm bảo import component trang mới và sử dụng path từ ROUTES
 * 
 * Lưu ý: Luôn sử dụng các hàm helper như getRoutePath() để lấy đường dẫn thay vì 
 * hardcode trực tiếp để đảm bảo tính nhất quán trong toàn bộ ứng dụng.
 */

// Define type for route configuration
export type RouteConfig = {
  path: string;
  label: string;
  // Optional properties for additional metadata
  isExternal?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

// Define all application routes
export const ROUTES = {
  // Main pages
  HOME: { path: '/', label: 'Trang chủ' },
  ABOUT: { path: '/about', label: 'Giới thiệu' },
  CONTACT: { path: '/contact', label: 'Liên hệ' },
  
  // Service pages
  SERVICES: { path: '/services', label: 'Dịch vụ' },
  INSTALLATION: { path: '/installation', label: 'Lắp đặt' },
  MAINTENANCE: { path: '/maintenance', label: 'Bảo trì' },
  REPAIR: { path: '/repair', label: 'Sửa chữa' },
  SERVICE_SUPPORT: { path: '/service-support', label: 'Hỗ trợ dịch vụ' },
    // Products and projects
  PRODUCTS: { path: '/products', label: 'Sản phẩm' },
  PRODUCTS_RESIDENTIAL: { path: '/products/residential', label: 'Sản phẩm dân dụng' },
  PRODUCTS_COMMERCIAL: { path: '/products/commercial', label: 'Sản phẩm thương mại' },
  PRODUCTS_INDUSTRIAL: { path: '/products/industrial', label: 'Sản phẩm công nghiệp' },
  PRODUCTS_COLD_STORAGE: { path: '/products/cold-storage', label: 'Kho lạnh' },
  PRODUCTS_AUXILIARY: { path: '/products/auxiliary', label: 'Thiết bị phụ trợ' },
  PROJECTS: { path: '/projects', label: 'Dự án' },
  PROJECTS_COMMERCIAL: { path: '/projects/commercial', label: 'Dự án thương mại' },
  PROJECTS_INDUSTRIAL: { path: '/projects/industrial', label: 'Dự án công nghiệp' },
  PROJECTS_SPECIALIZED: { path: '/projects/specialized', label: 'Dự án đặc biệt' },
    // Other key pages
  NEWS: { path: '/news', label: 'Tin tức' },
  EVENTS: { path: '/events', label: 'Sự kiện' },
  TECHNOLOGIES: { path: '/technologies', label: 'Công nghệ' },
  CONSULTING: { path: '/consulting', label: 'Tư vấn' },
  
  // Legal pages
  PRIVACY: { path: '/legal/privacy', label: 'Chính sách bảo mật' },
  TERMS: { path: '/legal/terms', label: 'Điều khoản sử dụng' },
  COOKIES: { path: '/legal/cookies', label: 'Chính sách cookie' },
  SITEMAP: { path: '/legal/sitemap', label: 'Sơ đồ trang' },
  
  // Add more routes as needed
} as const;

// Create a type for route keys for type safety when accessing routes
export type RouteKey = keyof typeof ROUTES;

/**
 * Helper function to get a route path by its key
 */
export function getRoutePath(routeKey: RouteKey): string {
  return ROUTES[routeKey].path;
}

/**
 * Helper function to get a route label by its key
 */
export function getRouteLabel(routeKey: RouteKey): string {
  return ROUTES[routeKey].label;
}
