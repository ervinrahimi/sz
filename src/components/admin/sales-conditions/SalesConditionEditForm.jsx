// src/components/admin/SalesConditionEditForm.jsx
'use client'

import { updateSalesCondition } from '@/actions/admin/sales-conditions'
import { salesConditionSchema } from '@/security/zod/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from '@/styles/form.module.css'
import toast from 'react-hot-toast'

export default function SalesConditionEditForm({ salesCondition }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(salesConditionSchema),
    defaultValues: {
      id: salesCondition.id,
      carId: salesCondition.car.id,
      name: salesCondition.name,
      conditionType: salesCondition.conditionType,
      salesMethod: salesCondition.salesMethod,
      paymentType: salesCondition.paymentType,
      price: salesCondition.price.toString(),
      registrationPayment: salesCondition.registrationPayment?.toString() || '',
      oneMonthPayment: salesCondition.oneMonthPayment?.toString() || '',
      totalInstallments: salesCondition.totalInstallments?.toString() || '',
      monthlyInstallment: salesCondition.monthlyInstallment?.toString() || '',
      remainingAtDelivery: salesCondition.remainingAtDelivery?.toString() || '',
      finalPrice: salesCondition.finalPrice.toString(),
      deliveryDate: salesCondition.deliveryDate
        ? new Date(salesCondition.deliveryDate).toISOString().split('T')[0]
        : '',
      participationProfit: salesCondition.participationProfit?.toString() || '',
      isLocked: salesCondition.isLocked,
    },
  })

  const onSubmit = async (data) => {
    const updatedFormData = {
      ...data,
      price: parseFloat(data.price),
      registrationPayment: data.registrationPayment ? parseFloat(data.registrationPayment) : null,
      oneMonthPayment: data.oneMonthPayment ? parseFloat(data.oneMonthPayment) : null,
      totalInstallments: data.totalInstallments ? parseInt(data.totalInstallments) : null,
      monthlyInstallment: data.monthlyInstallment ? parseFloat(data.monthlyInstallment) : null,
      remainingAtDelivery: data.remainingAtDelivery ? parseFloat(data.remainingAtDelivery) : null,
      finalPrice: parseFloat(data.finalPrice),
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      participationProfit: data.participationProfit ? parseFloat(data.participationProfit) : null,
    }

    const res = await updateSalesCondition(updatedFormData)

    if (res.success) {
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد.', { duration: 5000 })
      router.refresh()
    } else {
      toast.error(res.message || 'خطا در به‌روزرسانی اطلاعات.', { duration: 5000 })
    }
  }

  const handleCancel = () => {
    router.push('/admin/sales-conditions/')
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
          <option value="PREPAYMENT">علی‌الحساب</option>
        </select>
        {errors.salesMethod && <p className={styles.formError}>{errors.salesMethod.message}</p>}

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
        <input type="date" {...register('deliveryDate')} className={styles.formInput} />
        {errors.deliveryDate && <p className={styles.formError}>{errors.deliveryDate.message}</p>}

        <label className={styles.formLabel}>سود مشارکت:</label>
        <input type="text" {...register('participationProfit')} className={styles.formInput} />
        {errors.participationProfit && (
          <p className={styles.formError}>{errors.participationProfit.message}</p>
        )}

        <label className={styles.formLabel}>قفل کردن شرایط فروش:</label>
        <input type="checkbox" {...register('isLocked')} className={styles.formCheckbox} />
        <span>
          نکته مهم: در صورت قفل کردن شرایط فروش از قسمت مدیریت کاربران مجاز کاربر های مجاز به
          استفاده از این شرایط را وارد کنید!
        </span>
        <button type="submit" className={styles.formButton}>
          ویرایش شرایط فروش
        </button>
        <button type="button" className={styles.formButton} onClick={handleCancel}>
          لغو
        </button>
      </form>
    </>
  )
}
