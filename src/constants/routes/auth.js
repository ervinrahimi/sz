/**
 * Auth routes constant
 * Contains authentication related routes
 * @type {string{}}
 */

// Main routes
const MAIN = '/auth'

export const AUTH_ROUTES = {
  MAIN: MAIN,
  ERROR: '/auth/error',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify-email',
  RESET_PASSWORD: '/auth/reset-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
}
