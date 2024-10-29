import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
  email: z.string().email('ایمیل معتبر نیست.'),
  phone: z
    .string()
    .length(11, 'شماره تلفن باید ۱۱ رقم باشد.')
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست.'),
  phone2: z
    .string()
    .length(11, 'شماره تلفن دوم باید ۱۱ رقم باشد.')
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن دوم معتبر نیست.')
    .optional(),
  landlinePhone: z
    .string()
    .min(8, 'شماره تلفن ثابت باید حداقل ۸ رقم باشد.')
    .max(11, 'شماره تلفن ثابت باید حداکثر ۱۱ رقم باشد.')
    .regex(/^\d{8,11}$/, 'شماره تلفن ثابت معتبر نیست.')
    .optional(),
  username: z.string().min(4, 'نام کاربری باید حداقل ۴ کاراکتر باشد.'),
  nationalCode: z
    .string()
    .length(10, 'کد ملی باید ۱۰ رقم باشد.')
    .regex(/^\d{10}$/, 'کد ملی معتبر نیست.'),
  fatherName: z.string().min(1, 'نام پدر الزامی است.'),
  idNumber: z.string().min(1, 'شماره شناسنامه الزامی است.'),
  gender: z.enum(['MALE', 'FEMALE'], 'جنسیت نامعتبر است.'),
  occupation: z.enum(
    ['EMPLOYED', 'RETIRED', 'HOMEMAKER', 'UNEMPLOYED', 'STUDENT', 'ABROAD'],
    'شغل نامعتبر است.'
  ),
  educationLevel: z.enum(
    [
      'ILLITERATE',
      'ELEMENTARY',
      'MIDDLE_SCHOOL',
      'HIGH_SCHOOL',
      'ASSOCIATE',
      'BACHELOR',
      'MASTER',
      'DOCTORATE',
    ],
    'سطح تحصیلات نامعتبر است.'
  ),
  addresses: z
    .object({
      HOME: z
        .object({
          province: z.string().optional(),
          city: z.string().optional(),
          district: z.string().optional(),
          addressLine: z.string().optional(),
          buildingNo: z.string().optional(),
          floor: z.string().optional(),
          unit: z.string().optional(),
          postalCode: z
            .string()
            .regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد.')
            .optional()
            .or(z.literal('')),
        })
        .optional(),
      WORK: z
        .object({
          province: z.string().optional(),
          city: z.string().optional(),
          district: z.string().optional(),
          addressLine: z.string().optional(),
          buildingNo: z.string().optional(),
          floor: z.string().optional(),
          unit: z.string().optional(),
          postalCode: z
            .string()
            .regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد.')
            .optional()
            .or(z.literal('')),
        })
        .optional(),
    })
    .optional(),
})

// For Change Password Form
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'رمز عبور فعلی باید حداقل ۸ کاراکتر باشد.'),
    newPassword: z.string().min(8, 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.'),
    confirmNewPassword: z.string().min(8, 'تکرار رمز عبور باید حداقل ۸ کاراکتر باشد.'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'رمز عبور جدید و تکرار آن مطابقت ندارند.',
  })

// For Send Notifications Form
export const sendNotificationSchema = z.object({
  userId: z.string().min(1, 'لطفاً یک کاربر را انتخاب کنید.'),
  title: z.string().min(1, 'عنوان پیام الزامی است.'),
  message: z.string().min(1, 'متن پیام الزامی است.'),
})

export const salesConditionUserSchema = z.object({
  nationalCode: z
    .string()
    .length(10, 'کد ملی باید ۱۰ رقم باشد.')
    .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
})

// For New Sales Conditions Form
export const newSalesConditionSchema = z.object({
  // فیلدهای اصلی فرم
  carId: z.string().min(1, 'انتخاب خودرو الزامی است.'),
  name: z.string().min(1, 'نام شرایط الزامی است.'),
  conditionType: z.enum(['GENERAL', 'SPECIAL', 'ORGANIZATIONAL']),
  salesMethod: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT']),
  paymentType: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT']),
  price: z.string().nonempty('قیمت الزامی است.'),
  finalPrice: z.string().nonempty('قیمت نهایی الزامی است.'),
  registrationPayment: z.string().nonempty('پرداخت زمان ثبت‌نام الزامی است.'),
  oneMonthPayment: z.string().min(1, 'پرداخت یک ماهه الزامی است'),
  totalInstallments: z.string().min(1, 'تعداد اقساط الزامی است'),
  monthlyInstallment: z.string().min(1, 'مبلغ اقساط ماهیانه الزامی است'),
  remainingAtDelivery: z.string().min(1, 'مانده زمان تحویل الزامی است'),
  deliveryDate: z.string().nonempty('تاریخ تحویل الزامی است.'),
  participationProfit: z.string().min(1, 'سود مشارکت الزامی است'),
  isLocked: z.boolean(),

  // تعریف فیلدهای کاربران مجاز به صورت آرایه
  users: z
    .array(
      z.object({
        nationalCode: z
          .string()
          .min(10, 'کد ملی باید ۱۰ رقم باشد.')
          .max(10, 'کد ملی باید ۱۰ رقم باشد.')
          .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
        name: z.string().min(1, 'نام الزامی است.'),
        family: z.string().min(1, 'نام خانوادگی الزامی است.'),
      })
    )
    .optional(),
})

// For Sales Conditions Form
export const salesConditionSchema = z.object({
  name: z.string().min(1, 'نام شرایط الزامی است.'),
  conditionType: z.enum(['GENERAL', 'SPECIAL', 'ORGANIZATIONAL'], 'نوع شرایط الزامی است.'),
  salesMethod: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT'], 'روش فروش الزامی است.'),
  paymentType: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT'], 'نوع پرداخت الزامی است.'),
  price: z.string().min(1, 'قیمت الزامی است.'),
  registrationPayment: z.string().optional(),
  oneMonthPayment: z.string().optional(),
  totalInstallments: z.string().optional(),
  monthlyInstallment: z.string().optional(),
  remainingAtDelivery: z.string().optional(),
  finalPrice: z.string().min(1, 'قیمت نهایی الزامی است.'),
  deliveryDate: z.string().optional(),
  participationProfit: z.string().optional(),
})

// For Create User Form
export const userCreateSchema = z
  .object({
    name: z.string().min(1, 'نام الزامی است.'),
    family: z.string().min(1, 'نام خانوادگی الزامی است.'),
    nationalCode: z.string().length(10, 'کد ملی باید دقیقاً ۱۰ رقم باشد.'),
    email: z.string().email('ایمیل معتبر نیست.'),
    phone: z
      .string()
      .regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست.')
      .optional(),
    password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد.'),
    confirmPassword: z.string().min(8, 'تایید رمز عبور باید حداقل ۸ کاراکتر باشد.'),
    role: z.enum(['0', '1'], 'نقش معتبر نیست.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'رمز عبور و تایید آن باید یکسان باشند.',
  })

// For Update User Form
export const userSchema = z.object({
  id: z.string(), // فرض بر این است که شناسه کاربر الزامی و string است
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
  email: z.string().email('ایمیل معتبر نیست.'),
  phone: z.string().regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست.'),
  role: z.number().int().min(0, 'نقش معتبر نیست.').max(1, 'نقش معتبر نیست.'),
})

// For Create Vehicle And Update Vehicle Form
export const vehicleSchema = z.object({
  model: z.string().min(1, 'مدل الزامی است.'),
  name: z.string().min(1, 'نام الزامی است.'),
  imageFile: z
    .any()
    .refine(
      (files) => !files || files.length === 0 || (files && files[0]?.type?.startsWith('image/')),
      {
        message: 'لطفاً یک فایل تصویر معتبر انتخاب کنید.',
      }
    )
    .optional(),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE']),
  appearanceSpecifications: z.array(
    z.object({
      title: z.string().min(1, 'عنوان الزامی است.'),
      options: z.array(z.string().min(1, 'مقدار نمی‌تواند خالی باشد.')),
      isSelectable: z.boolean(),
    })
  ),
  technicalSpecifications: z.array(
    z.object({
      key: z.string().min(1, 'ویژگی الزامی است.'),
      value: z.string().min(1, 'مقدار الزامی است.'),
      note: z.string().optional(),
    })
  ),
})

export const menuItemSchema = z.object({
  title: z.string().min(1, 'عنوان منو الزامی است.'),
  link: z.string(),
  parentMenuID: z.string().nullable(),
})

export const slideSchema = z.object({
  title: z.string().min(1, 'عنوان اسلاید الزامی است').max(100, 'حداکثر 100 کاراکتر مجاز است'),
  typeAnimationTexts: z
    .string()
    .min(1, 'حداقل یک متن برای انیمیشن الزامی است')
    .max(500, 'حداکثر 500 کاراکتر مجاز است'),
  imageFile: z
    .any()
    .refine((files) => files?.length === 0 || (files && files[0]?.type?.startsWith('image/')), {
      message: 'لطفاً یک فایل تصویر معتبر انتخاب کنید.',
    })
    .optional(),
})
