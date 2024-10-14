// src/components/admin/sales-conditions/SalesConditionEditForm.jsx

'use client'

import { useState, useTransition } from 'react'
import { updateSalesCondition, addAuthorizedUser } from '@/actions/admin/sales-conditions'
import styles from './SalesConditionEditForm.module.css'

export default function SalesConditionEditForm({ salesCondition }) {
  const [formData, setFormData] = useState({
    id: salesCondition.id,
    carId: salesCondition.car.id,
    name: salesCondition.name,
    conditionType: salesCondition.conditionType,
    salesMethod: salesCondition.salesMethod,
    paymentType: salesCondition.paymentType,
    price: salesCondition.price.toString(), // تغییر به string برای ورودی
    finalPrice: salesCondition.finalPrice.toString(), // افزودن فیلد finalPrice
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
      price: parseInt(formData.price), 
      finalPrice: parseInt(formData.finalPrice),
    }

    startTransition(() => {
      updateSalesCondition(updatedFormData)

      // اگر شرایط فروش قفل شده و کاربران مجاز وجود دارند
      if (formData.isLocked && authorizedUsers.length > 0) {
        authorizedUsers.forEach(async (user) => {
          await addAuthorizedUser(formData.id, user)
        })
      }
    })
  }

  // افزودن کاربر جدید به لیست
  const handleAddUser = (e) => {
    e.preventDefault()

    if (newUser.nationalCode && newUser.name && newUser.family) {
      setAuthorizedUsers([...authorizedUsers, newUser])
      setNewUser({ nationalCode: '', name: '', family: '' }) // پاک کردن فیلدهای کاربر جدید
    }
  }

  // حذف کاربر از لیست
  const handleRemoveUser = (index) => {
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
        onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
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
        value={formData.price} // تغییر از number به string
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <label>قیمت نهایی:</label>
      <input
        type="text"
        value={formData.finalPrice} // افزودن فیلد finalPrice
        onChange={(e) => setFormData({ ...formData, finalPrice: e.target.value })}
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
