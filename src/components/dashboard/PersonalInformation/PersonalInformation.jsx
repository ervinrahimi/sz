'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'
import { updatePersonalInfo } from '@/actions/dashboard/updatePersonalInfo'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function PersonalInformation({ user }) {
  // پیدا کردن آدرس‌ها بر اساس نوع
  const homeAddress = user.addresses?.find((address) => address.type === 'HOME') || {}
  const workAddress = user.addresses?.find((address) => address.type === 'WORK') || {}
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name || '',
      family: user.family || '',
      email: user.email || '',
      phone: user.phone || '',
      phone2: user.phone2 || '',
      landlinePhone: user.landlinePhone || '',
      username: user.username || '',
      nationalCode: user.nationalCode || '',
      fatherName: user.fatherName || '',
      idNumber: user.idNumber || '',
      gender: user.gender || 'MALE',
      occupation: user.occupation || 'EMPLOYED',
      educationLevel: user.educationLevel || 'ILLITERATE',
      addresses: {
        HOME: {
          province: homeAddress.province || '',
          city: homeAddress.city || '',
          district: homeAddress.district || '',
          addressLine: homeAddress.addressLine || '',
          buildingNo: homeAddress.buildingNo || '',
          floor: homeAddress.floor || '',
          unit: homeAddress.unit || '',
          postalCode: homeAddress.postalCode || '',
        },
        WORK: {
          province: workAddress.province || '',
          city: workAddress.city || '',
          district: workAddress.district || '',
          addressLine: workAddress.addressLine || '',
          buildingNo: workAddress.buildingNo || '',
          floor: workAddress.floor || '',
          unit: workAddress.unit || '',
          postalCode: workAddress.postalCode || '',
        },
      },
    },
  })

  const onSubmit = async (data) => {
    const userData = {
      ...data,
      image: data.image && data.image.length > 0 ? data.image[0] : null,
    }

    try {
      const res = await updatePersonalInfo(userData)
      if (res.success) {
        reset(data)
        toast.success('اطلاعات با موفقیت به‌روزرسانی شد.', { duration: 5000 })
        router.refresh()
      } else {
        toast.error(res.message || 'خطا در به‌روزرسانی اطلاعات.', { duration: 5000 })
      }
    } catch (error) {
      toast.error('خطایی در سرور رخ داده است.', { duration: 5000 })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <toast />
      <h2 className={styles.title}>اطلاعات شخصی</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {/* فیلدهای اطلاعات کاربری */}
        <label className={styles.formLabel}>
          نام:
          <input type="text" {...register('name')} className={styles.formInput} />
          {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
        </label>
        <label className={styles.formLabel}>
          نام خانوادگی:
          <input type="text" {...register('family')} className={styles.formInput} />
          {errors.family && <p className={styles.formError}>{errors.family.message}</p>}
        </label>
        <label className={styles.formLabel}>
          ایمیل:
          <input type="email" {...register('email')} className={styles.formInput} />
          {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
        </label>
        <label className={styles.formLabel}>
          شماره تلفن همراه اول:
          <input type="text" {...register('phone')} className={styles.formInput} />
          {errors.phone && <p className={styles.formError}>{errors.phone.message}</p>}
        </label>
        <label className={styles.formLabel}>
          شماره تلفن همراه دوم:
          <input type="text" {...register('phone2')} className={styles.formInput} />
          {errors.phone2 && <p className={styles.formError}>{errors.phone2.message}</p>}
        </label>
        <label className={styles.formLabel}>
          تلفن ثابت:
          <input type="text" {...register('landlinePhone')} className={styles.formInput} />
          {errors.landlinePhone && (
            <p className={styles.formError}>{errors.landlinePhone.message}</p>
          )}
        </label>
        <label className={styles.formLabel}>
          کد ملی:
          <input type="text" {...register('nationalCode')} className={styles.formInput} />
          {errors.nationalCode && <p className={styles.formError}>{errors.nationalCode.message}</p>}
        </label>
        <label className={styles.formLabel}>
          نام پدر:
          <input type="text" {...register('fatherName')} className={styles.formInput} />
          {errors.fatherName && <p className={styles.formError}>{errors.fatherName.message}</p>}
        </label>
        <label className={styles.formLabel}>
          شماره شناسنامه:
          <input type="text" {...register('idNumber')} className={styles.formInput} />
          {errors.idNumber && <p className={styles.formError}>{errors.idNumber.message}</p>}
        </label>
        <label className={styles.formLabel}>
          نام کاربری:
          <input type="text" {...register('username')} className={styles.formInput} />
          {errors.username && <p className={styles.formError}>{errors.username.message}</p>}
        </label>
        <label className={styles.formLabel}>
          جنسیت:
          <select {...register('gender')} className={styles.formInput}>
            <option value="MALE">مرد</option>
            <option value="FEMALE">زن</option>
          </select>
        </label>
        <label className={styles.formLabel}>
          شغل:
          <select {...register('occupation')} className={styles.formInput}>
            <option value="EMPLOYED">شاغل</option>
            <option value="RETIRED">بازنشسته</option>
            <option value="HOMEMAKER">خانه‌دار</option>
            <option value="UNEMPLOYED">بیکار</option>
            <option value="STUDENT">محصل</option>
            <option value="ABROAD">خارج از کشور</option>
          </select>
        </label>
        <label className={styles.formLabel}>
          سطح تحصیلات:
          <select {...register('educationLevel')} className={styles.formInput}>
            <option value="ILLITERATE">بی‌سواد</option>
            <option value="ELEMENTARY">ابتدایی</option>
            <option value="MIDDLE_SCHOOL">سیکل</option>
            <option value="HIGH_SCHOOL">دیپلم</option>
            <option value="ASSOCIATE">فوق دیپلم</option>
            <option value="BACHELOR">لیسانس</option>
            <option value="MASTER">فوق لیسانس</option>
            <option value="DOCTORATE">دکترا</option>
          </select>
        </label>

        <h3 className={styles.subTitle}>آدرس‌ها</h3>
        {['HOME', 'WORK'].map((addressType) => (
          <div key={addressType} className={styles.addressSection}>
            <h4>{addressType === 'HOME' ? 'آدرس منزل' : 'آدرس محل کار'}</h4>
            <label className={styles.formLabel}>
              استان:
              <input
                type="text"
                {...register(`addresses.${addressType}.province`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME' ? homeAddress.province || '' : workAddress.province || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              شهر:
              <input
                type="text"
                {...register(`addresses.${addressType}.city`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME' ? homeAddress.city || '' : workAddress.city || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              منطقه:
              <input
                type="text"
                {...register(`addresses.${addressType}.district`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME' ? homeAddress.district || '' : workAddress.district || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              آدرس پستی:
              <input
                type="text"
                {...register(`addresses.${addressType}.addressLine`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME'
                    ? homeAddress.addressLine || ''
                    : workAddress.addressLine || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              پلاک:
              <input
                type="text"
                {...register(`addresses.${addressType}.buildingNo`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME'
                    ? homeAddress.buildingNo || ''
                    : workAddress.buildingNo || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              طبقه:
              <input
                type="text"
                {...register(`addresses.${addressType}.floor`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME' ? homeAddress.floor || '' : workAddress.floor || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              واحد:
              <input
                type="text"
                {...register(`addresses.${addressType}.unit`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME' ? homeAddress.unit || '' : workAddress.unit || ''
                }
              />
            </label>
            <label className={styles.formLabel}>
              کد پستی:
              <input
                type="text"
                {...register(`addresses.${addressType}.postalCode`)}
                className={styles.formInput}
                defaultValue={
                  addressType === 'HOME'
                    ? homeAddress.postalCode || ''
                    : workAddress.postalCode || ''
                }
              />
              {errors.addresses?.[addressType]?.postalCode && (
                <p className={styles.formError}>
                  {errors.addresses[addressType].postalCode.message}
                </p>
              )}
            </label>
          </div>
        ))}

        <button type="submit" className={styles.formButton}>
          ذخیره تغییرات
        </button>
      </form>
    </div>
  )
}
