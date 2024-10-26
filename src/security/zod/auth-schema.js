import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  terms: z.boolean().refine((val) => val === true, {
    message: "پذیرفتن قوانین و شرایط الزامی است",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست").optional(),
  password: z.string().optional(),
  code: z.string().optional(),
}).refine((data) => (data.email && data.password) || data.code, {
  message: "لطفاً یا ایمیل و رمز عبور را وارد کنید یا کد دو مرحله‌ای را وارد کنید",
  path: ["email", "password", "code"],  // مسیر خطاها
});

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
