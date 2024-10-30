// src/components/admin/sales-conditions/SalesConditionDetails.jsx

'use client'

import { useState } from 'react'
import styles from './SalesConditionDetails.module.css'
import { updateSalesCondition } from '@/actions/admin/sales-conditions'
import { useRouter } from 'next/navigation'

export default function SalesConditionDetails({ salesCondition }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: salesCondition.id,
    name: salesCondition.name || '',
    conditionType: salesCondition.conditionType || 'GENERAL',
    salesMethod: salesCondition.salesMethod || 'CASH',
    paymentType: salesCondition.paymentType || 'CASH',
    price: salesCondition.price || 0,
    registrationPayment: salesCondition.registrationPayment || 0,
    oneMonthPayment: salesCondition.oneMonthPayment || 0,
    totalInstallments: salesCondition.totalInstallments || 0,
    monthlyInstallment: salesCondition.monthlyInstallment || 0,
    remainingAtDelivery: salesCondition.remainingAtDelivery || 0,
    finalPrice: salesCondition.finalPrice || 0,
    deliveryDate: salesCondition.deliveryDate || '',
    participationProfit: salesCondition.participationProfit || 0,
    isLocked: salesCondition.isLocked || false,
  })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateSalesCondition(formData)
    setEditing(false)
    router.refresh()
  }

  return (
    <div className={styles.salesConditionDetails}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            نام شرایط:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>

          <label>
            نوع شرایط:
            <select
              value={formData.conditionType}
              onChange={(e) => setFormData({ ...formData, conditionType: e.target.value })}
            >
              <option value="GENERAL">عمومی</option>
              <option value="SPECIAL">خاص</option>
              <option value="ORGANIZATIONAL">سازمانی</option>
            </select>
          </label>

          <label>
            روش فروش:
            <select
              value={formData.salesMethod}
              onChange={(e) => setFormData({ ...formData, salesMethod: e.target.value })}
            >
              <option value="CASH">نقدی</option>
              <option value="INSTALLMENT">اقساطی</option>
              <option value="PREPAYMENT">علی‌الحساب</option>
            </select>
          </label>

          <label>
            نوع پرداخت:
            <select
              value={formData.paymentType}
              onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
            >
              <option value="CASH">نقدی</option>
              <option value="INSTALLMENT">اقساط</option>
              <option value="PREPAYMENT">علی‌الحساب</option>
            </select>
          </label>

          <label>
            قیمت خودرو:
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
          </label>

          <label>
            پرداخت زمان ثبت‌نام:
            <input
              type="number"
              value={formData.registrationPayment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registrationPayment: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            پرداخت یک ماهه:
            <input
              type="number"
              value={formData.oneMonthPayment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  oneMonthPayment: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            تعداد اقساط:
            <input
              type="number"
              value={formData.totalInstallments}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalInstallments: parseInt(e.target.value),
                })
              }
            />
          </label>

          <label>
            مبلغ اقساط ماهیانه:
            <input
              type="number"
              value={formData.monthlyInstallment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyInstallment: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            مانده زمان تحویل:
            <input
              type="number"
              value={formData.remainingAtDelivery}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remainingAtDelivery: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            قیمت نهایی:
            <input
              type="number"
              value={formData.finalPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  finalPrice: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            موعد تحویل:
            <input
              type="date"
              value={formData.deliveryDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deliveryDate: e.target.value,
                })
              }
            />
          </label>

          <label>
            سود مشارکت:
            <input
              type="number"
              value={formData.participationProfit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  participationProfit: parseFloat(e.target.value),
                })
              }
            />
          </label>

          <label>
            وضعیت:
            <select
              value={formData.isLocked ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, isLocked: e.target.value === 'true' })}
            >
              <option value="false">باز</option>
              <option value="true">قفل شده</option>
            </select>
          </label>

          <button type="submit">ذخیره</button>
          <button type="button" onClick={() => setEditing(false)}>
            لغو
          </button>
        </form>
      ) : (
        <div>
          <p>نام شرایط: {salesCondition.name}</p>
          <p>نوع شرایط: {getConditionType(salesCondition.conditionType)}</p>
          <p>روش فروش: {getSalesMethod(salesCondition.salesMethod)}</p>
          <p>نوع پرداخت: {getPaymentType(salesCondition.paymentType)}</p>
          <p>قیمت خودرو: {salesCondition.price}</p>
          <p>پرداخت زمان ثبت‌نام: {salesCondition.registrationPayment}</p>
          <p>پرداخت یک ماهه: {salesCondition.oneMonthPayment}</p>
          <p>تعداد اقساط: {salesCondition.totalInstallments}</p>
          <p>مبلغ اقساط ماهیانه: {salesCondition.monthlyInstallment}</p>
          <p>مانده زمان تحویل: {salesCondition.remainingAtDelivery}</p>
          <p>قیمت نهایی: {salesCondition.finalPrice}</p>
          <p>موعد تحویل: {salesCondition.deliveryDate}</p>
          <p>سود مشارکت: {salesCondition.participationProfit}</p>
          <p>وضعیت: {salesCondition.isLocked ? 'قفل شده' : 'باز'}</p>
          <button onClick={() => setEditing(true)}>ویرایش اطلاعات</button>
        </div>
      )}
    </div>
  )
}

function getConditionType(type) {
  switch (type) {
    case 'GENERAL':
      return 'عمومی'
    case 'SPECIAL':
      return 'خاص'
    case 'ORGANIZATIONAL':
      return 'سازمانی'
    default:
      return ''
  }
}

function getSalesMethod(method) {
  switch (method) {
    case 'CASH':
      return 'نقدی'
    case 'INSTALLMENT':
      return 'اقساطی'
    case 'PREPAYMENT':
      return 'علی‌الحساب'
    default:
      return ''
  }
}

function getPaymentType(type) {
  switch (type) {
    case 'CASH':
      return 'نقدی'
    case 'INSTALLMENT':
      return 'اقساط'
    case 'PREPAYMENT':
      return 'علی‌الحساب'
    default:
      return ''
  }
}
