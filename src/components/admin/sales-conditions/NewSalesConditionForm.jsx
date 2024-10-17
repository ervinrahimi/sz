'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSalesCondition, addAuthorizedUser } from '@/actions/admin/sales-conditions'
import { newSalesConditionSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'

export default function NewSalesConditionForm({ cars }) {
  const [users, setUsers] = useState([]) // ذخیره کاربران مجاز
  const [newUser, setNewUser] = useState({ nationalCode: '', name: '', family: '' })
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(newSalesConditionSchema),
    defaultValues: {
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
    },
  })

  // استفاده از watch برای دریافت مقدار isLocked
  const isLocked = watch('isLocked')

  const handleAddUser = () => {
    if (newUser.nationalCode) {
      setUsers([...users, newUser])
      setNewUser({ nationalCode: '', name: '', family: '' })
    }
  }

  const handleRemoveUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index)
    setUsers(updatedUsers)
  }

  const onSubmit = async (formData) => {
    startTransition(async () => {
      const createdCondition = await createSalesCondition(formData)

      for (const user of users) {
        await addAuthorizedUser(createdCondition.id, user)
      }

      router.push('/admin/sales-conditions')
    })
  }

  return (
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
        <option value="PREPAYMENT">علی‌الحساب</option>
      </select>
      {errors.salesMethod && <p className={styles.formError}>{errors.salesMethod.message}</p>}

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
      <input type="date" {...register('deliveryDate')} className={styles.formInput} />
      {errors.deliveryDate && <p className={styles.formError}>{errors.deliveryDate.message}</p>}

      <label>سود مشارکت:</label>
      <input type="number" {...register('participationProfit')} className={styles.formInput} />
      {errors.participationProfit && (
        <p className={styles.formError}>{errors.participationProfit.message}</p>
      )}

      <label>قفل کردن شرایط فروش:</label>
      <input type="checkbox" {...register('isLocked')} className={styles.formCheckbox} />

      {/* بخش مدیریت کاربران مجاز */}
      {isLocked && (
        <div className={styles.userManagement}>
          <h3>افزودن کاربران مجاز</h3>
          <div>
            <label>کد ملی:</label>
            <input
              type="text"
              value={newUser.nationalCode}
              className={styles.formInput}
              onChange={(e) => setNewUser({ ...newUser, nationalCode: e.target.value })}
            />

            <label>نام:</label>
            <input
              type="text"
              value={newUser.name}
              className={styles.formInput}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />

            <label>نام خانوادگی:</label>
            <input
              type="text"
              value={newUser.family}
              className={styles.formInput}
              onChange={(e) => setNewUser({ ...newUser, family: e.target.value })}
            />

            <button type="button" onClick={handleAddUser} className={styles.formButton}>
              افزودن کاربر
            </button>
          </div>

          {/* نمایش لیست کاربران مجاز */}
          <h4>لیست کاربران مجاز</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} {user.family} - {user.nationalCode}
                <button type="button" onClick={() => handleRemoveUser(index)}  className={styles.formButton}>
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" disabled={isPending} className={styles.formButton}>
        ایجاد شرایط فروش
      </button>
    </form>
  )
}
