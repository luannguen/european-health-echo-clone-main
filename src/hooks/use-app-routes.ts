import { useNavigate } from 'react-router-dom';
import { ROUTES, RouteKey, RouteConfig } from '@/lib/routes';

/**
 * Custom hook to work with application routes
 * Provides methods for navigation and accessing route information
 */
export function useAppRoutes() {
  const navigate = useNavigate();

  /**
   * Navigate to a route by its key
   */
  const navigateToRoute = (routeKey: RouteKey, options?: { replace?: boolean }) => {
    navigate(ROUTES[routeKey].path, { replace: options?.replace });
  };

  /**
   * Get the path for a route by its key
   */
  const getPath = (routeKey: RouteKey): string => {
    return ROUTES[routeKey].path;
  };

  /**
   * Get the full route config for a route by its key
   */
  const getRouteConfig = (routeKey: RouteKey): RouteConfig => {
    return ROUTES[routeKey];
  };

  /**
   * Get all routes
   */
  const getAllRoutes = () => {
    return ROUTES;
  };

  return {
    routes: ROUTES,
    navigateToRoute,
    getPath,
    getRouteConfig,
    getAllRoutes,
  };
}
