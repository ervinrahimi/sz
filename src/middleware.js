import { ROUTES } from './constants/routes'
import { MW_ROUTES } from './routes'
import authConfig from '@/security/auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(MW_ROUTES.API_AUTH_PREFIX)
  const isPrivateRoute = MW_ROUTES.PRIVATE.includes(nextUrl.pathname)
  const isAuthRoute = MW_ROUTES.AUTH.includes(nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute && isLoggedIn) return Response.redirect(new URL(MW_ROUTES.LOGIN_REDIRECT, nextUrl))

  if (!isLoggedIn && isPrivateRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`${ROUTES.AUTH.LOGIN}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
