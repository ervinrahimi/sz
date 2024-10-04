import { ADMIN_ROUTES } from './admin'
import { API_ROUTES } from './api'
import { AUTH_ROUTES } from './auth'
import { ROOT_ROUTES } from './root'

/**
 * ROUTES
 * Contains all routes for the application
 */
export const ROUTES = {
  // ROOT_ROUTES contains root and main routes
  ROOT: ROOT_ROUTES,

  // API_ROUTES contains all API endpoints
  API: API_ROUTES,

  // AUTH_ROUTES contains authentication routes
  AUTH: AUTH_ROUTES,

  // ADMIN_ROUTES contains admin panel routes
  ADMIN: ADMIN_ROUTES,
}