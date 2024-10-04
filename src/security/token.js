import prisma from '@/db/client'
import crypto from 'crypto'

export const createToken = async (type) => {
  return (await type) + crypto.randomBytes(32).toString('base64url')
}

export const deleteToken = async (verificationToken) => {
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    },
  })
}

export const hasExpiredToken = async (verificationToken) => {
  const tokenExpired = new Date() > verificationToken.expires

  if (tokenExpired) return true

  return false
}

export const validateToken = async (token, type) => {
  if (type) {
    if (!token.startsWith(type)) return false
  }

  const verificationToken = await prisma.verificationToken.findUnique({ where: { token } })

  if (!verificationToken) return false

  return verificationToken
}

export const generateToken = async (email, token, expires, type) => {
  const existingToken =  await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: {
        startsWith: type,
      },
    },
  })

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  return verificationToken
}

export const generateResetPasswordToken = async (email) => {
  const type = 'pass_'
  const today = new Date()
  const token = type + crypto.randomBytes(32).toString('base64url')
  const expires = new Date(today.setDate(today.getDate() + 1))

  return generateToken(email, token, expires, type)
}

export const generateVerifyEmailToken = async (email) => {
  const type = 'email_'
  const today = new Date()
  const token = type + crypto.randomBytes(32).toString('base64url')
  const expires = new Date(today.setDate(today.getDate() + 7))

  return generateToken(email, token, expires, type)
}

export const generateTwoFactorToken = async (email) => {
  const type = '2fa_'
  const today = new Date()
  const token = type + crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(today.setMinutes(today.getMinutes() + 10))

  return generateToken(email, token, expires, type)
}
