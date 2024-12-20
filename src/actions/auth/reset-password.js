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

  if (!existingToken) return { error: 'توکن اشتباه است!' }

  const hasExpired = await hasExpiredToken(existingToken)

  if (hasExpired) return { error: 'توکن منقضی شده!' }

  const existingUser = await prisma.user.findUnique({ where: { email: existingToken.identifier } })

  if (!existingUser) return { error: 'ایمیل پیدا نشد!' }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: await bcrypt.hash(password, 10) },
  })

  await deleteToken(existingToken)

  return { success: 'رمز عبور شما با موفقیت آبدیت شد!' }
}
