import authConfig from '@/security/auth.config'
import NextAuth from 'next-auth'
import prisma from '@/db/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { ROUTES } from '@/constants/routes'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: ROUTES.AUTH.LOGIN,
    error: ROUTES.AUTH.ERROR,
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date()
        },
      })
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await prisma.user.findUnique({ where: { id: user.id } })

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({ where: { userId: existingUser.id } })

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.username = token.username
        session.user.isOAuth = token.isOAuth
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await prisma.user.findUnique({ where: { id: token.sub } })

      if (!existingUser) return token

      const existingAccount = await prisma.account.findFirst({ where: { userId: existingUser.id } })

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.username = existingUser.username
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
