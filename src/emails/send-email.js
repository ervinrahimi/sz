import { emailTemplateResetPassword } from '@/emails/templates/reset-password'
import { emailTemplateVerifyEmail } from '@/emails/templates/verify-email'
import { emailTemplateTwoFactor } from './templates/two-factor'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (payload, options) => {
  return await resend.emails.send(payload, options)
}

export const sendEmailVerifyEmail = async (email, token) => {
  await sendEmail({
    from: 'Cockatiel <onboarding@resend.dev>',
    to: [email],
    subject: 'Verify email',
    react: emailTemplateVerifyEmail({ email, token }),
  })
}

export const sendEmailResetPassword = async (email, token) => {
  await sendEmail({
    from: 'Cockatiel <onboarding@resend.dev>',
    to: [email],
    subject: 'Reset your password',
    react: emailTemplateResetPassword({ email, token }),
  })
}

export const sendEmailTwoFactor = async (email, token) => {
  await sendEmail({
    from: 'Cockatiel <onboarding@resend.dev>',
    to: [email],
    subject: 'Two Factor',
    react: emailTemplateTwoFactor({ email, token }),
  })
}

