import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { RouteKey, ROUTES } from '@/lib/routes';

// Props for the AppLink component
interface AppLinkProps extends Omit<LinkProps, 'to'> {
  // The route key from our centralized routes
  routeKey: RouteKey | (string & {});
  // Optional URL parameters for dynamic routes
  params?: Record<string, string>;
  // Optional query parameters
  query?: Record<string, string>;
  // Children elements (link text/content)
  children: React.ReactNode;
  // Any additional className to apply
  className?: string;
}

/**
 * AppLink component for consistent linking throughout the application
 * Uses the centralized route configuration
 */
export const AppLink: React.FC<AppLinkProps> = ({
  routeKey,
  params = {},
  query = {},
  children,
  className = '',
  ...rest
}) => {  // Get the base path from our routes configuration
  const routeConfig = ROUTES[routeKey];
  if (!routeConfig) {
    console.error(`Route key "${routeKey}" not found in routes configuration`);
    return null; // Return null if the route key doesn't exist
  }
  
  let path = routeConfig.path;
  
  // Replace path parameters if any (like :id with actual id)
  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      // Make sure we have a value before replacing
      if (value !== undefined && value !== null) {
        const paramPattern = new RegExp(`:${key}(?=\/|$)`, 'g');
        path = (path.replace(paramPattern, encodeURIComponent(value)) as string);
      }
    });
  }
  
  // Append query parameters if any
  if (query && Object.keys(query).length > 0) {
    // Filter out undefined and null values
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined && value !== null)
    );
    
    if (Object.keys(filteredQuery).length > 0) {
      const queryString = new URLSearchParams(filteredQuery).toString();
      path = `${path}${path.includes('?') ? '&' : '?'}${queryString}` as string;
    }
  }
  
  return (
    <Link to={path} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default AppLink;
