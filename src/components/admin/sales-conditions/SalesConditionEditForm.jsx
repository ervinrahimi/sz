'use client'

import { useState, useTransition } from 'react'
import { updateSalesCondition, addAuthorizedUser, removeAuthorizedUser } from '@/actions/admin/sales-conditions'
import styles from './SalesConditionEditForm.module.css'
import toast from 'react-hot-toast'

export default function SalesConditionEditForm({ salesCondition }) {
  const [formData, setFormData] = useState({
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
    deliveryDate: salesCondition.deliveryDate ? new Date(salesCondition.deliveryDate).toISOString().split('T')[0] : '',
    participationProfit: salesCondition.participationProfit?.toString() || '',
    isLocked: salesCondition.isLocked,
  })

  const [authorizedUsers, setAuthorizedUsers] = useState(salesCondition.authorizedUsers || []) // کاربران مجاز
  const [newUser, setNewUser] = useState({ nationalCode: '', name: '', family: '' }) // کاربر جدید

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // تبدیل قیمت‌ها به عدد قبل از ارسال
    const updatedFormData = {
      ...formData,
      price: parseFloat(formData.price),
      registrationPayment: formData.registrationPayment ? parseFloat(formData.registrationPayment) : null,
      oneMonthPayment: formData.oneMonthPayment ? parseFloat(formData.oneMonthPayment) : null,
      totalInstallments: formData.totalInstallments ? parseInt(formData.totalInstallments) : null,
      monthlyInstallment: formData.monthlyInstallment ? parseFloat(formData.monthlyInstallment) : null,
      remainingAtDelivery: formData.remainingAtDelivery ? parseFloat(formData.remainingAtDelivery) : null,
      finalPrice: parseFloat(formData.finalPrice),
      deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate) : null,
      participationProfit: formData.participationProfit ? parseFloat(formData.participationProfit) : null,
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
      !authorizedUsers.some(user => user.nationalCode === newUser.nationalCode)
    ) {
      const updatedUsers = [...authorizedUsers, newUser]
      setAuthorizedUsers(updatedUsers)
      
      // افزودن کاربر به سرور
      await addAuthorizedUser(formData.id, newUser)
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>خودرو:</label>
      <input
        type="text"
        value={formData.carId}
        disabled
      />

      <label>نام شرایط:</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <label>نوع شرایط:</label>
      <select
        value={formData.conditionType}
        onChange={(e) => setFormData({ ...formData, conditionType: e.target.value })}
      >
        <option value="GENERAL">عمومی</option>
        <option value="SPECIAL">خاص</option>
        <option value="ORGANIZATIONAL">سازمانی</option>
      </select>

      <label>روش فروش:</label>
      <select
        value={formData.salesMethod}
        onChange={(e) => setFormData({ ...formData, salesMethod: e.target.value })}
      >
        <option value="CASH">نقدی</option>
        <option value="INSTALLMENT">اقساطی</option>
        <option value="PREPAYMENT">علی‌الحساب</option>
      </select>

      <label>نوع پرداخت:</label>
      <select
        value={formData.paymentType}
        onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
      >
        <option value="CASH">نقدی</option>
        <option value="INSTALLMENT">اقساط</option>
        <option value="PREPAYMENT">علی‌الحساب</option>
      </select>

      <label>قیمت:</label>
      <input
        type="text"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <label>پرداخت زمان ثبت‌نام:</label>
      <input
        type="text"
        value={formData.registrationPayment}
        onChange={(e) => setFormData({ ...formData, registrationPayment: e.target.value })}
      />

      <label>پرداخت یک ماهه:</label>
      <input
        type="text"
        value={formData.oneMonthPayment}
        onChange={(e) => setFormData({ ...formData, oneMonthPayment: e.target.value })}
      />

      <label>تعداد اقساط:</label>
      <input
        type="text"
        value={formData.totalInstallments}
        onChange={(e) => setFormData({ ...formData, totalInstallments: e.target.value })}
      />

      <label>مبلغ اقساط ماهیانه:</label>
      <input
        type="text"
        value={formData.monthlyInstallment}
        onChange={(e) => setFormData({ ...formData, monthlyInstallment: e.target.value })}
      />

      <label>مانده زمان تحویل:</label>
      <input
        type="text"
        value={formData.remainingAtDelivery}
        onChange={(e) => setFormData({ ...formData, remainingAtDelivery: e.target.value })}
      />

      <label>قیمت نهایی:</label>
      <input
        type="text"
        value={formData.finalPrice}
        onChange={(e) => setFormData({ ...formData, finalPrice: e.target.value })}
      />

      <label>تاریخ تحویل:</label>
      <input
        type="date"
        value={formData.deliveryDate}
        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
      />

      <label>سود مشارکت:</label>
      <input
        type="text"
        value={formData.participationProfit}
        onChange={(e) => setFormData({ ...formData, participationProfit: e.target.value })}
      />

      <label>قفل کردن شرایط فروش:</label>
      <input
        type="checkbox"
        checked={formData.isLocked}
        onChange={(e) => setFormData({ ...formData, isLocked: e.target.checked })}
      />

      <button type="submit" disabled={isPending}>
        ویرایش شرایط فروش
      </button>
    </form>

    {/* مدیریت کاربران مجاز */}
    {formData.isLocked && (
      <div className={styles.authorizedUsers}>
        <h3>افزودن کاربران مجاز</h3>

        <form onSubmit={handleAddUser}>
          <label>کد ملی:</label>
          <input
            type="text"
            value={newUser.nationalCode}
            onChange={(e) => setNewUser({ ...newUser, nationalCode: e.target.value })}
          />

          <label>نام:</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />

          <label>نام خانوادگی:</label>
          <input
            type="text"
            value={newUser.family}
            onChange={(e) => setNewUser({ ...newUser, family: e.target.value })}
          />

          <button type="submit">افزودن کاربر</button>
        </form>

        <h4>لیست کاربران مجاز</h4>
        <ul>
          {authorizedUsers.map((user, index) => (
            <li key={index}>
              {user.nationalCode} - {user.name} {user.family}
              <button type="button" onClick={() => handleRemoveUser(index)}>
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
    </>
  )
}
