'use server'

import { deleteToken, hasExpiredToken, validateToken } from '@/security/token'
import { resetPasswordSchema } from '@/security/zod/auth-schema'
import prisma from '@/db/client'
import bcrypt from 'bcryptjs'

export const resetPassword = async (values, token) => {
  if (!token) return { error: 'Missing token!' }

  const validatedFields = resetPasswordSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { password } = validatedFields.data

  const existingToken = await validateToken(token, 'pass_')

  if (!existingToken) return { error: 'Invalid token!' }

  const hasExpired = await hasExpiredToken(existingToken)

  if (hasExpired) return { error: 'Token has expired!' }

  const existingUser = await prisma.user.findUnique({ where: { email: existingToken.identifier } })

  if (!existingUser) return { error: 'Email does not exist!' }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: await bcrypt.hash(password, 10) },
  })

  await deleteToken(existingToken)

  return { success: 'Password updated!' }
}
