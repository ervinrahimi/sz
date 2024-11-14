'use client'

import {
  updateSalesCondition,
  updateIsLocked,
  removeImageFromSalesCondition,
} from '@/actions/admin/sales-conditions'
import { salesConditionSchema } from '@/security/zod/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian from 'react-date-object/calendars/persian'
import DatePicker from 'react-multi-date-picker'
import styles from '@/styles/form.module.css'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function SalesConditionEditForm({ salesCondition }) {
  const salesConditionId = salesCondition.id // دریافت شناسه شرایط فروش از prop
  const [deliveryDate, setDeliveryDate] = useState(
    salesCondition.deliveryDate ? new Date(salesCondition.deliveryDate) : null
  )
  const [isLocked, setIsLocked] = useState(salesCondition.isLocked)
  const [status, setStatus] = useState(salesCondition.status)
  const [images, setImages] = useState(
    salesCondition.images.map((imgUrl) => ({ preview: imgUrl, isUploaded: true }))
  ) // مدیریت تصاویر
  const router = useRouter()

  const handleCheckboxChange = async () => {
    try {
      const newIsLocked = !isLocked
      const res = await updateIsLocked(salesCondition.id, newIsLocked)
      if (res.success) {
        toast.success('وضعیت قفل شرایط فروش به‌روزرسانی شد.', { duration: 5000 })
        setIsLocked(newIsLocked)
        router.refresh()
      } else {
        throw new Error(res.message || 'خطا در به‌روزرسانی وضعیت قفل کردن.')
      }
    } catch (error) {
      toast.error(error.message, { duration: 5000 })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(salesConditionSchema),
    defaultValues: {
      id: salesCondition.id,
      carId: salesCondition.car.id,
      name: salesCondition.name,
      conditionType: salesCondition.conditionType,
      salesMethod: salesCondition.salesMethod,
      contractPriceType: salesCondition.contractPriceType,
      paymentType: salesCondition.paymentType,
      price: salesCondition.price.toString(),
      finalPrice: salesCondition.finalPrice.toString(),
      registrationPayment: salesCondition.registrationPayment?.toString() || '',
      oneMonthPayment: salesCondition.oneMonthPayment?.toString() || '',
      totalInstallments: salesCondition.totalInstallments?.toString() || '',
      monthlyInstallment: salesCondition.monthlyInstallment?.toString() || '',
      remainingAtDelivery: salesCondition.remainingAtDelivery?.toString() || '',
      participationProfit: salesCondition.participationProfit?.toString() || '',
      siteSalesCode: salesCondition.siteSalesCode?.toString() || '',
      status: salesCondition.status || 'PENDING',
      images: salesCondition.images || [], // مقدار پیش‌فرض تصاویر
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
    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isUploaded: false,
    }))
    setImages((prevImages) => [...prevImages, ...newImages])
  }

  const removeImage = async (index) => {
    const imageUrl = images[index].preview

    if (images[index].isUploaded) {
      // حذف تصویر از پایگاه داده و فایل سیستم اگر قبلاً آپلود شده باشد
      const response = await removeImageFromSalesCondition(imageUrl, salesConditionId)

      if (response.success) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
        toast.success('تصویر با موفقیت حذف شد.', { duration: 5000 })
      } else {
        toast.error(response.message || 'خطا در حذف تصویر.', { duration: 5000 })
      }
    } else {
      // اگر تصویر هنوز آپلود نشده است، فقط آن را از پیش‌نمایش حذف کنید
      setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }
  }

  const handleImageReorder = (fromIndex, toIndex) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages]
      const [movedImage] = updatedImages.splice(fromIndex, 1)
      updatedImages.splice(toIndex, 0, movedImage)
      return updatedImages
    })
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      const newFiles = images.filter((image) => image.file && !image.isUploaded)

      const MAX_FILE_SIZE = 2 * 1024 * 1024
      const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']

      for (const image of newFiles) {
        if (!ALLOWED_FORMATS.includes(image.file.type)) {
          toast.error('فقط فرمت‌های jpg و png مجاز است', { duration: 5000 })
          return
        }
        if (image.file.size > MAX_FILE_SIZE) {
          toast.error('حجم فایل نباید بیشتر از ۲ مگابایت باشد', { duration: 5000 })
          return
        }
      }

      if (newFiles.length > 0) {
        newFiles.forEach((image) => {
          formData.append('files', image.file)
        })

        const uploadResponse = await fetch('/api/upload/saleconditions', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('خطا در آپلود فایل‌ها')
        }

        const { urls } = await uploadResponse.json()

        data.images = [...(salesCondition.images || []), ...urls]
      } else {
        data.images = salesCondition.images || []
      }

      const res = await updateSalesCondition(data)

      if (res.success) {
        toast.success('اطلاعات با موفقیت به‌روزرسانی شد.', { duration: 5000 })
        router.push('/admin/sales-conditions/')
        router.refresh()
      } else {
        toast.error(res.message || 'خطا در به‌روزرسانی اطلاعات.', { duration: 5000 })
      }
    } catch (error) {
      console.error('Upload Error:', error)
      toast.error(error.message || 'خطا در آپلود فایل‌ها', { duration: 5000 })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.formLabel}>خودرو:</label>
      <input
        type="text"
        value={`${salesCondition.car.name}`}
        disabled
        className={styles.formInput}
      />

      <label className={styles.formLabel}>نام شرایط:</label>
      <input type="text" {...register('name')} className={styles.formInput} />
      {errors.name && <p className={styles.formError}>{errors.name.message}</p>}

      <label className={styles.formLabel}>کد فروش در سایت:</label>
      <input type="text" {...register('siteSalesCode')} className={styles.formInput} />
      {errors.siteSalesCode && <p className={styles.formError}>{errors.siteSalesCode.message}</p>}

      <label className={styles.formLabel}>نوع شرایط:</label>
      <select {...register('conditionType')} className={styles.formSelect}>
        <option value="GENERAL">عمومی</option>
        <option value="SPECIAL">خاص</option>
        <option value="ORGANIZATIONAL">سازمانی</option>
      </select>
      {errors.conditionType && <p className={styles.formError}>{errors.conditionType.message}</p>}

      <label className={styles.formLabel}>روش فروش:</label>
      <select {...register('salesMethod')} className={styles.formSelect}>
        <option value="CASH">نقدی</option>
        <option value="INSTALLMENT">اقساطی</option>
      </select>
      {errors.salesMethod && <p className={styles.formError}>{errors.salesMethod.message}</p>}

      <label className={styles.formLabel}>نوع قیمت در قرارداد:</label>
      <select {...register('contractPriceType')} className={styles.formSelect}>
        <option value="PREPAYMENT">علی‌الحساب</option>
        <option value="FIXED">قطعی</option>
      </select>
      {errors.contractPriceType && (
        <p className={styles.formError}>{errors.contractPriceType.message}</p>
      )}

      <label className={styles.formLabel}>نوع پرداخت:</label>
      <select {...register('paymentType')} className={styles.formSelect}>
        <option value="CASH">نقدی</option>
        <option value="INSTALLMENT">اقساط</option>
        <option value="PREPAYMENT">علی‌الحساب</option>
      </select>
      {errors.paymentType && <p className={styles.formError}>{errors.paymentType.message}</p>}

      <label className={styles.formLabel}>قیمت:</label>
      <input type="text" {...register('price')} className={styles.formInput} />
      {errors.price && <p className={styles.formError}>{errors.price.message}</p>}

      <label className={styles.formLabel}>پرداخت زمان ثبت‌نام:</label>
      <input type="text" {...register('registrationPayment')} className={styles.formInput} />
      {errors.registrationPayment && (
        <p className={styles.formError}>{errors.registrationPayment.message}</p>
      )}

      <label className={styles.formLabel}>پرداخت یک ماهه:</label>
      <input type="text" {...register('oneMonthPayment')} className={styles.formInput} />
      {errors.oneMonthPayment && (
        <p className={styles.formError}>{errors.oneMonthPayment.message}</p>
      )}

      <label className={styles.formLabel}>تعداد اقساط:</label>
      <input type="text" {...register('totalInstallments')} className={styles.formInput} />
      {errors.totalInstallments && (
        <p className={styles.formError}>{errors.totalInstallments.message}</p>
      )}

      <label className={styles.formLabel}>مبلغ اقساط ماهیانه:</label>
      <input type="text" {...register('monthlyInstallment')} className={styles.formInput} />
      {errors.monthlyInstallment && (
        <p className={styles.formError}>{errors.monthlyInstallment.message}</p>
      )}

      <label className={styles.formLabel}>مانده زمان تحویل:</label>
      <input type="text" {...register('remainingAtDelivery')} className={styles.formInput} />
      {errors.remainingAtDelivery && (
        <p className={styles.formError}>{errors.remainingAtDelivery.message}</p>
      )}

      <label className={styles.formLabel}>قیمت نهایی:</label>
      <input type="text" {...register('finalPrice')} className={styles.formInput} />
      {errors.finalPrice && <p className={styles.formError}>{errors.finalPrice.message}</p>}

      <label className={styles.formLabel}>تاریخ تحویل:</label>
      <DatePicker
        value={deliveryDate}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        className={styles.formInput}
      />
      {errors.deliveryDate && <p className={styles.formError}>{errors.deliveryDate.message}</p>}

      <label className={styles.formLabel}>سود مشارکت:</label>
      <input type="text" {...register('participationProfit')} className={styles.formInput} />
      {errors.participationProfit && (
        <p className={styles.formError}>{errors.participationProfit.message}</p>
      )}

      <label className={styles.formLabel}>آپلود تصاویر:</label>
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
          <div key={index} className={styles.imageWrapper}>
            <Image
              width={150}
              height={150}
              src={image.preview}
              alt="Preview"
              className={styles.previewImage}
            />
            <button type="button" onClick={() => removeImage(index)}>
              حذف
            </button>
            {index > 0 && (
              <button type="button" onClick={() => handleImageReorder(index, index - 1)}>
                بالا
              </button>
            )}
            {index < images.length - 1 && (
              <button type="button" onClick={() => handleImageReorder(index, index + 1)}>
                پایین
              </button>
            )}
          </div>
        ))}
      </div>

      <label className={styles.formLabel}>وضعیت:</label>
      <div className={styles.formStatusButtonGroup}>
        <button
          type="button"
          className={`${styles.buttonStatus} ${
            status === 'ACTIVE' ? styles.buttonStatusActive : ''
          }`}
          onClick={() => setStatus('ACTIVE')}
        >
          فعال
        </button>
        <button
          type="button"
          className={`${styles.buttonStatus} ${
            status === 'INACTIVE' ? styles.buttonStatusActive : ''
          }`}
          onClick={() => setStatus('INACTIVE')}
        >
          غیرفعال
        </button>
        <button
          type="button"
          className={`${styles.buttonStatus} ${
            status === 'PENDING' ? styles.buttonStatusActive : ''
          }`}
          onClick={() => setStatus('PENDING')}
        >
          در انتظار
        </button>
      </div>

      <label className={styles.formLabel}>اختصاص شرایط برای خریداران خاص:</label>
      <input
        type="checkbox"
        checked={isLocked}
        onChange={handleCheckboxChange}
        className={styles.formCheckbox}
      />
      <span>
        نکته مهم: در صورت قفل کردن شرایط فروش از قسمت مدیریت کاربران مجاز کاربر های مجاز به استفاده
        از این شرایط را وارد کنید!
      </span>
      <button type="submit" className={styles.formButton}>
        ویرایش شرایط فروش
      </button>
      <button type="button" className={styles.formButton}>
        لغو
      </button>
    </form>
  )
}
