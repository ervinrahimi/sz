// src/components/admin/SalesConditionEditForm.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import {
  updateSalesCondition,
  addAuthorizedUser,
  removeAuthorizedUser,
} from '@/actions/admin/sales-conditions'
import toast from 'react-hot-toast'
import { salesConditionSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'

export default function SalesConditionEditForm({ salesCondition }) {
  const [authorizedUsers, setAuthorizedUsers] = useState(salesCondition.authorizedUsers || []) // کاربران مجاز
  const [newUser, setNewUser] = useState({ nationalCode: '', name: '', family: '' }) // کاربر جدید
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

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

    startTransition(() => {
      updateSalesCondition(updatedFormData)
    })
  }

  // افزودن کاربر جدید به لیست
  const handleAddUser = async (e) => {
    e.preventDefault()

    // بررسی وجود کاربر با کد ملی تکراری
    if (
      newUser.nationalCode &&
      !authorizedUsers.some((user) => user.nationalCode === newUser.nationalCode)
    ) {
      const updatedUsers = [...authorizedUsers, newUser]
      setAuthorizedUsers(updatedUsers)

      // افزودن کاربر به سرور
      await addAuthorizedUser(salesCondition.id, newUser)
      setNewUser({ nationalCode: '', name: '', family: '' }) // پاک کردن فیلدهای کاربر جدید
    } else {
      toast('کاربری با این کد ملی قبلاً اضافه شده است.')
    }
  }

  // حذف کاربر از لیست
  const handleRemoveUser = async (index) => {
    const userToRemove = authorizedUsers[index]

    // حذف کاربر از سرور
    await removeAuthorizedUser(userToRemove.id)

    const updatedUsers = authorizedUsers.filter((_, i) => i !== index)
    setAuthorizedUsers(updatedUsers)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>خودرو:</label>
        <input type="text" value={salesCondition.car.id} disabled className={styles.formInput} />

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

        {/* بقیه فیلدها به همین شکل */}
        {/* اضافه کردن فیلد های دیگر همراه با ولیدیشن در همین ساختار انجام می شود */}

        <button type="submit" disabled={isPending} className={styles.formButton}>
          ویرایش شرایط فروش
        </button>
      </form>

      {/* مدیریت کاربران مجاز */}
      {salesCondition.isLocked && (
        <div className={styles.authorizedUsers}>
          <h3>افزودن کاربران مجاز</h3>
          <form onSubmit={handleAddUser}>
            <label className={styles.formLabel}>کد ملی:</label>
            <input
              type="text"
              value={newUser.nationalCode}
              onChange={(e) => setNewUser({ ...newUser, nationalCode: e.target.value })}
              className={styles.formInput}
            />
            {errors.nationalCode && (
              <p className={styles.formError}>{errors.nationalCode.message}</p>
            )}

            <label className={styles.formLabel}>نام:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className={styles.formInput}
            />
            {errors.name && <p className={styles.formError}>{errors.name.message}</p>}

            <label className={styles.formLabel}>نام خانوادگی:</label>
            <input
              type="text"
              value={newUser.family}
              onChange={(e) => setNewUser({ ...newUser, family: e.target.value })}
              className={styles.formInput}
            />
            {errors.family && <p className={styles.formError}>{errors.family.message}</p>}

            <button type="submit" className={styles.formButton}>
              افزودن کاربر
            </button>
          </form>
        </div>
      )}
    </>
  )
}
