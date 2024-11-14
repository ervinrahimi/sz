'use client'

import { newSalesConditionSchema } from '@/security/zod/validationSchema'
import { createSalesCondition } from '@/actions/admin/sales-conditions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian from 'react-date-object/calendars/persian'
import DatePicker from 'react-multi-date-picker'
import styles from '@/styles/form.module.css'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function NewSalesConditionForm({ cars }) {
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [isPending, startTransition] = useTransition()
  const [images, setImages] = useState([]) // وضعیت برای مدیریت تصاویر
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(newSalesConditionSchema),
    defaultValues: {
      carId: cars[0]?.id || '',
      name: '',
      conditionType: 'GENERAL',
      salesMethod: 'CASH',
      contractPriceType: 'PREPAYMENT',
      paymentType: 'CASH',
      price: '',
      finalPrice: '',
      registrationPayment: '',
      oneMonthPayment: '',
      totalInstallments: '',
      monthlyInstallment: '',
      remainingAtDelivery: '',
      deliveryDate: '',
      participationProfit: '',
      siteSalesCode: '',
      isLocked: false,
      users: [],
      images: [], // مقدار پیش‌فرض برای تصاویر
    },
  })

  const handleDateChange = (date) => {
    setDeliveryDate(date)
    const isoDate = date ? date.toDate().toISOString().split('T')[0] : ''
    setValue('deliveryDate', isoDate)
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter((file) => /(\.jpg|\.jpeg|\.png)$/i.test(file.name))
    setImages(validFiles)
    setValue(
      'images',
      validFiles.map((file) => URL.createObjectURL(file))
    ) // ذخیره URL محلی تصاویر برای پیش‌نمایش
  }

  const onSubmit = async (formData) => {
    startTransition(async () => {
      const formDataWithImages = { ...formData }

      const uploadedImages = []
      for (const image of images) {
        const formDataImage = new FormData()
        formDataImage.append('files', image)

        const uploadResponse = await fetch('/api/upload/saleconditions', {
          method: 'POST',
          body: formDataImage,
        })

        if (uploadResponse.ok) {
          const { filePath } = await uploadResponse.json()
          uploadedImages.push(filePath)
        } else {
          toast.error('خطا در آپلود فایل.')
          return
        }
      }

      formDataWithImages.images = uploadedImages // افزودن لینک تصاویر آپلود شده به داده‌های فرم

      const res = await createSalesCondition(formDataWithImages)
      if (res.success) {
        toast.success('شرایط فروش شما ایجاد شد!', { duration: 5000 })
        router.push('/admin/sales-conditions')
        router.refresh()
      } else {
        toast.error(res.message || 'خطا در ایجاد شرایط فروش.', { duration: 5000 })
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label>خودرو:</label>
        <select {...register('carId')} className={styles.formSelect}>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        {errors.carId && <p className={styles.formError}>{errors.carId.message}</p>}

        <label>نام شرایط:</label>
        <input type="text" {...register('name')} className={styles.formInput} />
        {errors.name && <p className={styles.formError}>{errors.name.message}</p>}

        <label className={styles.formLabel}>کد فروش در سایت:</label>
        <input type="text" {...register('siteSalesCode')} className={styles.formInput} />
        {errors.siteSalesCode && <p className={styles.formError}>{errors.siteSalesCode.message}</p>}

        <label>نوع شرایط:</label>
        <select {...register('conditionType')} className={styles.formSelect}>
          <option value="GENERAL">عمومی</option>
          <option value="SPECIAL">خاص</option>
          <option value="ORGANIZATIONAL">سازمانی</option>
        </select>
        {errors.conditionType && <p className={styles.formError}>{errors.conditionType.message}</p>}

        <label>روش فروش:</label>
        <select {...register('salesMethod')} className={styles.formSelect}>
          <option value="CASH">نقدی</option>
          <option value="INSTALLMENT">اقساطی</option>
        </select>
        {errors.salesMethod && <p className={styles.formError}>{errors.salesMethod.message}</p>}

        <label>نوع قیمت در قرارداد:</label>
        <select {...register('contractPriceType')} className={styles.formSelect}>
          <option value="PREPAYMENT">علی‌الحساب</option>
          <option value="FIXED">قطعی</option>
        </select>
        {errors.contractPriceType && (
          <p className={styles.formError}>{errors.contractPriceType.message}</p>
        )}

        <label>نوع پرداخت:</label>
        <select {...register('paymentType')} className={styles.formSelect}>
          <option value="CASH">نقدی</option>
          <option value="INSTALLMENT">اقساط</option>
          <option value="PREPAYMENT">علی‌الحساب</option>
        </select>
        {errors.paymentType && <p className={styles.formError}>{errors.paymentType.message}</p>}

        <label>قیمت:</label>
        <input type="number" {...register('price')} className={styles.formInput} />
        {errors.price && <p className={styles.formError}>{errors.price.message}</p>}

        <label>قیمت نهایی:</label>
        <input type="number" {...register('finalPrice')} className={styles.formInput} />
        {errors.finalPrice && <p className={styles.formError}>{errors.finalPrice.message}</p>}

        <label>پرداخت زمان ثبت‌نام:</label>
        <input type="number" {...register('registrationPayment')} className={styles.formInput} />
        {errors.registrationPayment && (
          <p className={styles.formError}>{errors.registrationPayment.message}</p>
        )}

        <label>پرداخت یک ماهه:</label>
        <input type="number" {...register('oneMonthPayment')} className={styles.formInput} />
        {errors.oneMonthPayment && (
          <p className={styles.formError}>{errors.oneMonthPayment.message}</p>
        )}

        <label>تعداد اقساط:</label>
        <input type="number" {...register('totalInstallments')} className={styles.formInput} />
        {errors.totalInstallments && (
          <p className={styles.formError}>{errors.totalInstallments.message}</p>
        )}

        <label>مبلغ اقساط ماهیانه:</label>
        <input type="number" {...register('monthlyInstallment')} className={styles.formInput} />
        {errors.monthlyInstallment && (
          <p className={styles.formError}>{errors.monthlyInstallment.message}</p>
        )}

        <label>مانده زمان تحویل:</label>
        <input type="number" {...register('remainingAtDelivery')} className={styles.formInput} />
        {errors.remainingAtDelivery && (
          <p className={styles.formError}>{errors.remainingAtDelivery.message}</p>
        )}

        <label>تاریخ تحویل:</label>
        <DatePicker
          value={deliveryDate}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          className={styles.formInput}
        />
        {errors.deliveryDate && <p className={styles.formError}>{errors.deliveryDate.message}</p>}

        <label>سود مشارکت:</label>
        <input type="number" {...register('participationProfit')} className={styles.formInput} />
        {errors.participationProfit && (
          <p className={styles.formError}>{errors.participationProfit.message}</p>
        )}

        <label>آپلود تصاویر:</label>
        <input
          type="file"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
          className={styles.formInput}
        />
        {errors.images && <p className={styles.formError}>{errors.images.message}</p>}
        <div className={styles.previewContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt="Preview"
              className={styles.previewImage}
              height={150}
              width={150}
            />
          ))}
        </div>

        <label>قفل کردن شرایط فروش:</label>
        <input type="checkbox" {...register('isLocked')} className={styles.formCheckbox} />

        <button type="submit" disabled={isPending} className={styles.formButton}>
          ایجاد شرایط فروش
        </button>
      </form>
    </>
  )
}
