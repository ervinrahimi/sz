/**
 * Api routes constant
 * Contains api routes
 * @type {string{}}
 */

// Main route
const MAIN = '/api'
const AUTH_MAIN = MAIN + '/auth'

export const API_ROUTES = {
  MAIN: MAIN,
  AUTH: {
    MAIN: AUTH_MAIN,
    VERIFY_TOKEN: AUTH_MAIN + '/verify-token',
  },
}
