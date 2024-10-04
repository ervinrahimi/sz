'use server'

import { forgotPasswordSchema } from '@/security/zod/auth-schema'
import { generateResetPasswordToken } from '@/security/token'
import { sendEmailResetPassword } from '@/emails/send-email'

export const forgotPassword = async (values) => {
  const validatedFields = forgotPasswordSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid Email!' }

  const { email } = validatedFields.data

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (!existingUser) return { error: 'Email not found!' }

  const passwordResetToken = await generateResetPasswordToken(email)
  
  await sendEmailResetPassword(passwordResetToken.identifier, passwordResetToken.token)

  return { success: 'Reset password email sent!' }
}
