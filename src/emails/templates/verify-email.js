import { ROUTES } from '@/constants/routes'
import * as React from 'react'

export const emailTemplateVerifyEmail = ({ email, token }) => (
  <div>
    <h1>
      Verify email for <b>{email}</b>
    </h1>
    <p>To verify your email, click on this link:</p>
    <a href={`${process.env.BASE_URL}${ROUTES.AUTH.VERIFY_EMAIL}?token=${token}`}>
      Click here to verify your email
    </a>
  </div>
)
