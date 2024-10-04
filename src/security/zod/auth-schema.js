import { z } from 'zod'

export const resgisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const loginSchema = z.object({
  email: z.optional(z.string().email()),
  password: z.optional(z.string()),
  code: z.optional(z.string()),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})
