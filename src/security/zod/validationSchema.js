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

// Define BigInt range constants
const MAX_BIGINT = BigInt('9223372036854775807') // Max value for BigInt in MongoDB
const MIN_BIGINT = BigInt('-9223372036854775808')

// Validation for New Sales Conditions Form
export const newSalesConditionSchema = z.object({
  carId: z.string().min(1, 'انتخاب خودرو الزامی است.'),
  name: z.string().min(1, 'نام شرایط الزامی است.'),
  conditionType: z.enum(['GENERAL', 'SPECIAL', 'ORGANIZATIONAL']),
  salesMethod: z.enum(['CASH', 'INSTALLMENT']),
  contractPriceType: z.enum(['PREPAYMENT', 'FIXED']),
  paymentType: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT']),

  siteSalesCode: z
    .string()
    .regex(/^\d+$/, 'کد فروش فقط شامل اعداد است!')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار کد فروش معتبر نیست.')
    .optional(),

  totalInstallments: z
    .string()
    .regex(/^\d+$/, 'مبلغ تعداد اقساط ماهیانه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مبلغ اقساط ماهیانه معتبر نیست.')
    .optional(),

  price: z
    .string()
    .regex(/^\d+$/, 'قیمت باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار قیمت معتبر نیست.'),

  finalPrice: z
    .string()
    .regex(/^\d+$/, 'قیمت نهایی باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار قیمت نهایی معتبر نیست.'),

  registrationPayment: z
    .string()
    .regex(/^\d+$/, 'پرداخت زمان ثبت‌نام باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine(
      (val) => val <= MAX_BIGINT && val >= MIN_BIGINT,
      'مقدار پرداخت زمان ثبت‌نام معتبر نیست.'
    )
    .optional(),

  oneMonthPayment: z
    .string()
    .regex(/^\d+$/, 'پرداخت یک ماهه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار پرداخت یک ماهه معتبر نیست.')
    .optional(),

  monthlyInstallment: z
    .string()
    .regex(/^\d+$/, 'مبلغ اقساط ماهیانه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مبلغ اقساط ماهیانه معتبر نیست.')
    .optional(),

  remainingAtDelivery: z
    .string()
    .regex(/^\d+$/, 'مانده زمان تحویل باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مانده زمان تحویل معتبر نیست.')
    .optional(),

  participationProfit: z
    .string()
    .regex(/^\d+$/, 'سود مشارکت باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار سود مشارکت معتبر نیست.')
    .optional(),

  deliveryDate: z.string().optional(),
  isLocked: z.boolean(),

  users: z
    .array(
      z.object({
        nationalCode: z
          .string()
          .length(10, 'کد ملی باید ۱۰ رقم باشد.')
          .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
        name: z.string().min(1, 'نام الزامی است.'),
        family: z.string().min(1, 'نام خانوادگی الزامی است.'),
      })
    )
    .optional(),
})

export const salesConditionSchema = z.object({
  id: z.string().nonempty('شناسه شرایط الزامی است.'),
  carId: z.string().nonempty('شناسه خودرو الزامی است.'),
  name: z.string().min(1, 'نام شرایط الزامی است.'),
  conditionType: z.enum(['GENERAL', 'SPECIAL', 'ORGANIZATIONAL']),
  salesMethod: z.enum(['CASH', 'INSTALLMENT']),
  contractPriceType: z.enum(['PREPAYMENT', 'FIXED']),
  paymentType: z.enum(['CASH', 'INSTALLMENT', 'PREPAYMENT']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).default('PENDING'),

  siteSalesCode: z
    .string()
    .regex(/^\d+$/, 'کد فروش فقط شامل اعداد است!')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار کد فروش معتبر نیست.')
    .optional(),

  totalInstallments: z
    .string()
    .regex(/^\d+$/, 'مبلغ تعداد اقساط ماهیانه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مبلغ اقساط ماهیانه معتبر نیست.')
    .optional(),

  price: z
    .string()
    .regex(/^\d+$/, 'قیمت باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار قیمت معتبر نیست.'),

  finalPrice: z
    .string()
    .regex(/^\d+$/, 'قیمت نهایی باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار قیمت نهایی معتبر نیست.'),

  registrationPayment: z
    .string()
    .regex(/^\d+$/, 'پرداخت زمان ثبت‌نام باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine(
      (val) => val <= MAX_BIGINT && val >= MIN_BIGINT,
      'مقدار پرداخت زمان ثبت‌نام معتبر نیست.'
    )
    .optional(),

  oneMonthPayment: z
    .string()
    .regex(/^\d+$/, 'پرداخت یک ماهه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار پرداخت یک ماهه معتبر نیست.')
    .optional(),

  monthlyInstallment: z
    .string()
    .regex(/^\d+$/, 'مبلغ اقساط ماهیانه باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مبلغ اقساط ماهیانه معتبر نیست.')
    .optional(),

  remainingAtDelivery: z
    .string()
    .regex(/^\d+$/, 'مانده زمان تحویل باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار مانده زمان تحویل معتبر نیست.')
    .optional(),

  participationProfit: z
    .string()
    .regex(/^\d+$/, 'سود مشارکت باید فقط شامل اعداد باشد.')
    .transform((val) => BigInt(val))
    .refine((val) => val <= MAX_BIGINT && val >= MIN_BIGINT, 'مقدار سود مشارکت معتبر نیست.')
    .optional(),

  deliveryDate: z.string().optional(),
  authorizedUsers: z
    .array(
      z.object({
        nationalCode: z
          .string()
          .length(10, 'کد ملی باید ۱۰ رقم باشد.')
          .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
        name: z.string().min(1, 'نام الزامی است.'),
        family: z.string().min(1, 'نام خانوادگی الزامی است.'),
      })
    )
    .optional(),
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

export const cardBoxSchema = z.object({
  title: z.string().nonempty('عنوان کارت باکس الزامی است'),
  subtitle: z.string().optional(),
  description: z.string().nonempty('توضیحات الزامی است'),
  price: z.number().positive('قیمت باید عددی مثبت باشد').int('قیمت باید یک عدد صحیح باشد'),
  carId: z.string().nonempty('انتخاب خودرو الزامی است'),
  sectionId: z.string().nonempty('انتخاب بخش الزامی است'),
  viewLink: z.string().optional(),
})

export const cardBoxSectionSchema = z.object({
  name: z.string().nonempty('نام بخش الزامی است'),
  subtitle: z.string().optional(),
})
