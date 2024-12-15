'use server'

import { deleteToken, hasExpiredToken, validateToken } from '@/security/token'
import prisma from '@/db/client'

export const emailVerify = async (token) => {
  if (!token) return { error: 'Missing token!' }

  const existingToken = await validateToken(token, 'email_')

  if (!existingToken) return { error: 'Invalid token!' }

  const hasExpired = await hasExpiredToken(existingToken)

  if (hasExpired) return { error: 'Token has expired!' }

  const existingUser = await prisma.user.findUnique({ where: { email: existingToken.identifier } })

  if (!existingUser) return { error: 'Email does not exist!' }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await deleteToken(existingToken)

  const loginToken = crypto.randomUUID()
  await prisma.verificationToken.create({
    data: {
      identifier: existingUser.email,
      token: loginToken,
      expires: new Date(Date.now() + 10 * 60 * 1000), // انقضای 10 دقیقه‌ای
    },
  })

  // بازگرداندن token
  return { success: 'Email verified!', email: existingUser.email, loginToken }
}
