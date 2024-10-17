import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
  email: z.string().email('ایمیل معتبر نیست.'),
  phone: z.string().regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست.')
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, 'رمز عبور فعلی باید حداقل ۸ کاراکتر باشد.'),
  newPassword: z.string().min(8, 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.'),
  confirmNewPassword: z.string().min(8, 'تکرار رمز عبور باید حداقل ۸ کاراکتر باشد.')
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  path: ['confirmNewPassword'],
  message: 'رمز عبور جدید و تکرار آن مطابقت ندارند.',
})

export const sendNotificationSchema = z.object({
  userId: z.string().min(1, 'لطفاً یک کاربر را انتخاب کنید.'),
  title: z.string().min(1, 'عنوان پیام الزامی است.'),
  message: z.string().min(1, 'متن پیام الزامی است.')
})