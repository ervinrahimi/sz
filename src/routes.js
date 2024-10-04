import { ROUTES } from "./constants/routes"

/**
 * A set of routes that are not accessible to the public
 * These routes require authentication
 * @type {string[]}
 */
export const MW_PRIVATE_ROUTES = [
  ROUTES.ADMIN.MAIN
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to profile
 * @type {string[]}
 */
export const MW_AUTH_ROUTES = [
  ROUTES.AUTH.MAIN
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const MW_API_AUTH_PREFIX = ROUTES.API.AUTH.MAIN

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const MW_LOGIN_REDIRECT = ROUTES.ROOT.MAIN

export const MW_ROUTES = {
  PRIVATE: MW_PRIVATE_ROUTES,
  AUTH: MW_AUTH_ROUTES,
  LOGIN: MW_LOGIN_REDIRECT,
  API_AUTH_PREFIX: MW_API_AUTH_PREFIX,
  LOGIN_REDIRECT: MW_LOGIN_REDIRECT
}
