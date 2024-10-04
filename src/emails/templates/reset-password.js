import { ROUTES } from '@/constants/routes'
import * as React from 'react'

export const emailTemplateResetPassword = ({ email, token }) => (
  <div>
    <h1>
      Reset password for <b>{email}</b>
    </h1>
    <p>To reset your password, click on this link and follow the instructions:</p>
    <a href={`${process.env.BASE_URL}${ROUTES.AUTH.RESET_PASSWORD}?token=${token}`}>
      Click here to reset password
    </a>
  </div>
)
