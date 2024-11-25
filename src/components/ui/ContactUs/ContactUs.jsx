'use client'

import styles from './ContactUs.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل دو حرف باشد.'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل دو حرف باشد.'),
  email: z.string().email('ایمیل معتبر وارد کنید.'),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'شماره تلفن معتبر وارد کنید.'
    ),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ حرف باشد.'),
})

export default function ContactSupportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('درخواست شما با موفقیت ارسال شد', { duration: 5000 })
        router.push('/')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'مشکلی پیش آمده است')
      }
    } catch (error) {
      toast.error('مشکلی پیش آمده است')
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>تماس و پشتیبانی</h1>
      <p className={styles.subtitle}>
        سوالی درباره قیمت‌ها، برنامه‌ها یا استفاده از Untitled UI دارید؟ فرم را پر کنید و تیم ما ظرف
        ۲۴ ساعت با شما تماس می‌گیرد.
      </p>

      <div className={styles.content}>
        {/* فرم تماس */}
        <div className={styles.contactForm}>
          <h2>تماس با تیم فروش ما</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.row}>
              <div>
                <input
                  type="text"
                  placeholder="نام"
                  className={styles.input}
                  {...register('firstName')}
                />
                {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  className={styles.input}
                  {...register('lastName')}
                />
                {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="ایمیل شما"
                className={styles.input}
                {...register('email')}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="شماره تماس"
                className={styles.input}
                {...register('phone')}
              />
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>
            <div>
              <textarea
                placeholder="پیام خود را وارد کنید..."
                className={styles.textarea}
                {...register('message')}
                ></textarea>
                {errors.message && <p className={styles.error}>{errors.message.message}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>
              ارسال پیام
            </button>
          </form>
        </div>

        {/* اطلاعات پشتیبانی */}
        <div className={styles.supportInfo}>
          <div>
            <h2>گفت‌وگو با تیم فروش</h2>
            <p>با تیم دوستانه ما صحبت کنید</p>
            <p>
              <a href="mailto:sales@untitledui.com">sales@untitledui.com</a>
            </p>
          </div>
          <div>
            <h2>پشتیبانی ایمیل</h2>
            <p>ایمیل بفرستید و ما ظرف ۲۴ ساعت پاسخ می‌دهیم.</p>
            <p>
              <a href="mailto:support@untitledui.com">support@untitledui.com</a>
            </p>
          </div>
          <div>
            <h2>چت</h2>
            <p>۲۴/۷ با تیم ما چت کنید و فوراً پشتیبانی بگیرید.</p>
            <p>
              <a href="#">شروع چت</a>
            </p>
          </div>
          <div>
            <h2>تماس با ما</h2>
            <p>دوشنبه تا جمعه، ۹ صبح - ۵ عصر</p>
            <p>
              <a href="tel:+61340209204">02191694314</a>
            </p>
          </div>
          <div>
            <h2>آدرس شعبه ملبورن</h2>
            <p>
              خیابان ۹۰ آفیس
              <br />
              فیتزروی، ویک ۳۰۶۵ استرالیا
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
