import * as React from 'react'

export const emailTemplateTwoFactor = ({ email, token }) => (
  <div>
    <h1>
      TwoFactor for <b>{email}</b>
    </h1>
    <p>Your 2FA code: {token}</p>
  </div>
)
