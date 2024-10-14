'use server'

import { resgisterSchema } from '@/security/zod/auth-schema'
import { generateVerifyEmailToken } from '@/security/token'
import { sendEmailVerifyEmail } from '@/emails/send-email'
import prisma from '@/db/client'
import bcrypt from 'bcryptjs'

export const register = async (values) => {
  const validatedFields = resgisterSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { email, password } = validatedFields.data

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) return { error: 'User already exists!' }

  await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
  })

  const verificationToken = await generateVerifyEmailToken(email)

  await sendEmailVerifyEmail(verificationToken.identifier, verificationToken.token)

  return { success: 'Confirmation email sent!' }
}
