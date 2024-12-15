import { loginSchema } from './zod/auth-schema.js'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import prisma from '@/db/client.js'

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password, token } = credentials || {};
    
        // اگر token وجود داشت، احراز هویت بر اساس توکن
        if (email && token) {
          const verificationToken = await prisma.verificationToken.findUnique({ where: { token } });
          if (verificationToken && verificationToken.identifier === email && verificationToken.expires > new Date()) {
            // کاربر را پیدا کنید
            const user = await prisma.user.findUnique({ where: { email } });
            if (user) {
              // Token را از DB حذف کنید تا مجدداً نتوان از آن استفاده کرد
              await prisma.verificationToken.delete({ where: { token } });
              return user;
            }
          }
          return null;
        }
    
        // منطق قبلی برای password
        if (email && password) {
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user || !user.password) return null
    
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
    
        return null
      },
    }),
  ],
}

export default authConfig