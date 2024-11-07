'use client'

import { updateSalesCondition, updateIsLocked } from '@/actions/admin/sales-conditions'
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

export default function SalesConditionEditForm({ salesCondition }) {
  const [deliveryDate, setDeliveryDate] = useState(
    salesCondition.deliveryDate ? new Date(salesCondition.deliveryDate) : null
  )
  const [isLocked, setIsLocked] = useState(salesCondition.isLocked)
  const router = useRouter()

  const handleCheckboxChange = async () => {
    try {
      // تغییر مقدار isLocked و ارسال درخواست به سرور
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
    },
  })

  const handleDateChange = (date) => {
    setDeliveryDate(date)
    const isoDate = date ? date.toDate().toISOString().split('T')[0] : ''
    setValue('deliveryDate', isoDate)
  }

  const onSubmit = async (data) => {
    const res = await updateSalesCondition(data)
    if (res.success) {
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد.', { duration: 5000 })
      router.push('/admin/sales-conditions/')
      router.refresh()
    } else {
      toast.error(res.message || 'خطا در به‌روزرسانی اطلاعات.', { duration: 5000 })
    }
  }

  return (
    <>
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
        {errors.contractPriceType && <p className={styles.formError}>{errors.contractPriceType.message}</p>}

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

        <label className={styles.formLabel}>اختصاص شرایط برای خریداران خاص:</label>
        <input
          type="checkbox"
          checked={isLocked}
          onChange={handleCheckboxChange} // مدیریت جداگانه‌ی تغییرات
          className={styles.formCheckbox}
        />
        <span>
          نکته مهم: در صورت قفل کردن شرایط فروش از قسمت مدیریت کاربران مجاز کاربر های مجاز به
          استفاده از این شرایط را وارد کنید!
        </span>
        <button type="submit" className={styles.formButton}>
          ویرایش شرایط فروش
        </button>
        <button type="button" className={styles.formButton}>
          لغو
        </button>
      </form>
    </>
  )
}