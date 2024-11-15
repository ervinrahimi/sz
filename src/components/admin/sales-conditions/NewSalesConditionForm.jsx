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
  const [imageFiles, setImageFiles] = useState([]) // مدیریت فایل‌ها به عنوان آرایه
  const [imagePreviews, setImagePreviews] = useState([]) // پیش‌نمایش تصاویر
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
    },
  })

  const handleDateChange = (date) => {
    setDeliveryDate(date)
    const isoDate = date ? date.toDate().toISOString().split('T')[0] : ''
    setValue('deliveryDate', isoDate)
  }

  const onSubmit = async (data) => {
    // اعتبارسنجی برای وجود فایل
    if (imageFiles.length === 0) {
      toast.error('لطفاً حداقل یک تصویر انتخاب کنید!', { duration: 5000 })
      return
    }

    // آپلود فایل‌ها
    const formData = new FormData()
    imageFiles.forEach((file) => formData.append('files', file))

    const res = await fetch('/api/upload/sales-condition', { method: 'POST', body: formData })
    const uploadData = await res.json()

    // اضافه کردن URLهای آپلود شده به داده‌های فرم
    data.images = uploadData.urls

    // ارسال داده‌ها به سرور
    startTransition(async () => {
      await createSalesCondition(data)
      toast.success('شرایط فروش شما ایجاد شد!', { duration: 5000 })
      router.push('/admin/sales-conditions')
      router.refresh()
    })
  }

  const moveImageUp = (index) => {
    if (index > 0) {
      const newFiles = [...imageFiles]
      const newPreviews = [...imagePreviews]

      // جابه‌جایی آیتم‌ها
      ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
      ;[newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]]

      setImageFiles(newFiles)
      setImagePreviews(newPreviews)
    }
  }

  const moveImageDown = (index) => {
    if (index < imageFiles.length - 1) {
      const newFiles = [...imageFiles]
      const newPreviews = [...imagePreviews]

      // جابه‌جایی آیتم‌ها
      ;[newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]]
      ;[newPreviews[index + 1], newPreviews[index]] = [newPreviews[index], newPreviews[index + 1]]

      setImageFiles(newFiles)
      setImagePreviews(newPreviews)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImageFiles((prevFiles) => [...prevFiles, ...files]) // افزودن فایل‌ها به آرایه
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]) // افزودن پیش‌نمایش‌ها به آرایه
    }
  }

  const removeImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
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
          onChange={handleDateChange} // تابع تغییر تاریخ
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

<label className={styles.formInput}>
  تصاویر شرایط فروش:
  <input
    className={styles.formFile}
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />
  <p>نکته: تصویر اول به عنوان تصویر اصلی قرار می‌گیرد!</p>
</label>

<div className={styles.imagePreviewContainer}>
  {imagePreviews.map((preview, index) => (
    <div key={index} className={styles.imagePreviewWrapper}>
      <Image
        src={preview}
        alt={`پیش‌نمایش تصویر ${index + 1}`}
        className={styles.preview}
        width={100}
        height={100}
      />
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => removeImage(index)}
      >
        حذف تصویر
      </button>
      <button
        type="button"
        className={styles.moveButton}
        onClick={() => moveImageUp(index)}
        disabled={index === 0}
      >
        بالا
      </button>
      <button
        type="button"
        className={styles.moveButton}
        onClick={() => moveImageDown(index)}
        disabled={index === imagePreviews.length - 1}
      >
        پایین
      </button>
    </div>
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
