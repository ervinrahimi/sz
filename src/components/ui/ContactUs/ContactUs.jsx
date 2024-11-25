'use client';

import styles from './ContactUs.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل دو حرف باشد.'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل دو حرف باشد.'),
  email: z.string().email('ایمیل معتبر وارد کنید.'),
  phone: z.string().regex(/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'شماره تلفن معتبر وارد کنید.'),
  teamSize: z.string().min(1, 'لطفاً اندازه تیم را انتخاب کنید.'),
  location: z.string().min(1, 'لطفاً موقعیت جغرافیایی را انتخاب کنید.'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ حرف باشد.'),
  products: z.array(z.string()).optional(),
});

export default function ContactSupportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data) => {
    // ارسال داده‌ها به سرور
    console.log(data);
  };

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
              <select className={styles.select} {...register('teamSize')}>
                <option value="">اندازه تیم</option>
                <option value="1-50">۱-۵۰ نفر</option>
                <option value="51-200">۵۱-۲۰۰ نفر</option>
                <option value="201+">۲۰۱ نفر و بیشتر</option>
              </select>
              {errors.teamSize && <p className={styles.error}>{errors.teamSize.message}</p>}
            </div>
            <div>
              <select className={styles.select} {...register('location')}>
                <option value="">موقعیت جغرافیایی</option>
                <option value="Australia">استرالیا</option>
                <option value="USA">آمریکا</option>
                <option value="Europe">اروپا</option>
              </select>
              {errors.location && <p className={styles.error}>{errors.location.message}</p>}
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
            <a href="#">
              شروع چت
            </a>
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
  );
}
