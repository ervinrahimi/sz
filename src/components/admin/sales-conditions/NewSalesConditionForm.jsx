'use client'

import { useState, useTransition } from 'react'
import { createSalesCondition, addAuthorizedUser } from '@/actions/admin/sales-conditions'
import { useRouter } from 'next/navigation'
import styles from './NewSalesConditionForm.module.css'

export default function NewSalesConditionForm({ cars }) {
  const [formData, setFormData] = useState({
    carId: cars[0]?.id || '',
    name: '',
    conditionType: 'GENERAL',
    salesMethod: 'CASH',
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
    isLocked: false,
  })

  const [users, setUsers] = useState([]) // ذخیره کاربران مجاز
  const [newUser, setNewUser] = useState({ nationalCode: '', name: '', family: '' })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // مدیریت افزودن کاربر به لیست
  const handleAddUser = () => {
    if (newUser.nationalCode) {
      setUsers([...users, newUser])
      setNewUser({ nationalCode: '', name: '', family: '' })
    }
  }

  // مدیریت حذف کاربر از لیست
  const handleRemoveUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index)
    setUsers(updatedUsers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ابتدا شرایط فروش ایجاد شود
    startTransition(async () => {
      const createdCondition = await createSalesCondition(formData)

      // سپس کاربران مجاز به صورت دونه‌دونه اضافه شوند
      for (const user of users) {
        await addAuthorizedUser(createdCondition.id, user)
      }

      // بازگشت به صفحه اصلی مدیریت شرایط فروش
      router.push('/admin/sales-conditions')
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* فرم انتخاب خودرو و سایر فیلدها */}
      <label>خودرو:</label>
      <select
        value={formData.carId}
        onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
      >
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.name}
          </option>
        ))}
      </select>

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
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <label>قیمت نهایی:</label>
      <input
        type="number"
        value={formData.finalPrice}
        onChange={(e) => setFormData({ ...formData, finalPrice: e.target.value })}
      />

      <label>پرداخت زمان ثبت‌نام:</label>
      <input
        type="number"
        value={formData.registrationPayment}
        onChange={(e) => setFormData({ ...formData, registrationPayment: e.target.value })}
      />

      <label>پرداخت یک ماهه:</label>
      <input
        type="number"
        value={formData.oneMonthPayment}
        onChange={(e) => setFormData({ ...formData, oneMonthPayment: e.target.value })}
      />

      <label>تعداد اقساط:</label>
      <input
        type="number"
        value={formData.totalInstallments}
        onChange={(e) => setFormData({ ...formData, totalInstallments: e.target.value })}
      />

      <label>مبلغ اقساط ماهیانه:</label>
      <input
        type="number"
        value={formData.monthlyInstallment}
        onChange={(e) => setFormData({ ...formData, monthlyInstallment: e.target.value })}
      />

      <label>مانده زمان تحویل:</label>
      <input
        type="number"
        value={formData.remainingAtDelivery}
        onChange={(e) => setFormData({ ...formData, remainingAtDelivery: e.target.value })}
      />

      <label>تاریخ تحویل:</label>
      <input
        type="date"
        value={formData.deliveryDate}
        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
      />

      <label>سود مشارکت:</label>
      <input
        type="number"
        value={formData.participationProfit}
        onChange={(e) => setFormData({ ...formData, participationProfit: e.target.value })}
      />

      <label>قفل کردن شرایط فروش:</label>
      <input
        type="checkbox"
        checked={formData.isLocked}
        onChange={(e) => setFormData({ ...formData, isLocked: e.target.checked })}
      />

      {/* بخش مدیریت کاربران مجاز */}
      {formData.isLocked && (
        <div className={styles.userManagement}>
          <h3>افزودن کاربران مجاز</h3>
          <div>
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

            <button type="button" onClick={handleAddUser}>
              افزودن کاربر
            </button>
          </div>

          {/* نمایش لیست کاربران مجاز */}
          <h4>لیست کاربران مجاز</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} {user.family} - {user.nationalCode}
                <button type="button" onClick={() => handleRemoveUser(index)}>
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" disabled={isPending}>
        ایجاد شرایط فروش
      </button>
    </form>
  )
}
