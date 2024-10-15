'use client'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import styles from './page.module.css'

export default function shoppingStage1() {
  const schema = z.object({
    gender: z.enum(['مرد', 'زن']),
    nationalCode: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد'),
    firstName: z.string().nonempty('نام الزامی است'),
    lastName: z.string().nonempty('نام خانوادگی الزامی است'),
    fatherName: z.string().nonempty('نام پدر الزامی است'),
    idNumber: z.string().nonempty('شماره شناسنامه الزامی است'),
    province: z.string().optional(),
    city: z.string().optional(),
    area: z.string().nonempty('منطقه شهری الزامی است'),
    postalAddress: z.string().nonempty('آدرس پستی الزامی است'),
    plate: z.string().nonempty('پلاک الزامی است'),
    floor: z.string().nonempty('طبقه الزامی است'),
    unit: z.string().nonempty('واحد الزامی است'),
    postalCode: z.string().length(10, 'کد پستی باید ۱۰ رقم باشد'),
    phone: z.string().nonempty('تلفن ثابت الزامی است'),
    mobile1: z.string().nonempty('تلفن همراه اول الزامی است'),
    mobile2: z.string().optional(),
    email: z.string().email('ایمیل معتبر وارد کنید'),
    jobStatus: z.enum(['شاغل', 'بازنشسته', 'خانه دار', 'بیکار', 'محصل/دانشجو', 'خارج از کشور']),
    educationLevel: z.enum([
      'بی سواد',
      'ابتدایی',
      'سیکل',
      'دیپلم',
      'فوق دیپلم',
      'لیسانس',
      'فوق لیسانس',
      'دکترا',
    ]),
    workProvince: z.string().optional(),
    workCity: z.string().optional(),
    workArea: z.string().nonempty('منطقه شهرداری الزامی است'),
    workPostalAddress: z.string().nonempty('آدرس محل کار الزامی است'),
    workPlate: z.string().nonempty('پلاک الزامی است'),
    workFloor: z.string().nonempty('طبقه الزامی است'),
    workUnit: z.string().nonempty('واحد الزامی است'),
    workPostalCode: z.string().length(10, 'کد پستی باید ۱۰ رقم باشد'),
  })

  const [formData, setFormData] = useState({
    gender: '',
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    idNumber: '',
    province: '',
    city: '',
    area: '',
    postalAddress: '',
    plate: '',
    floor: '',
    unit: '',
    postalCode: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    email: '',
    jobStatus: '',
    educationLevel: '',
    workProvince: '',
    workCity: '',
    workArea: '',
    workPostalAddress: '',
    workPlate: '',
    workFloor: '',
    workUnit: '',
    workPostalCode: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = schema.safeParse(formData)
    if (!result.success) {
      console.log(result.error.errors)
    } else {
      console.log('Validation successful', formData)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* مشخصات متقاضی */}
      <h2>مشخصات متقاضی</h2>
      <label>
        جنسیت:
        <input type="radio" name="gender" value="مرد" /> مرد
        <input type="radio" name="gender" value="زن" /> زن
      </label>
      <label>
        کد ملی:
        <input type="number" name="nationalCode" />
      </label>
      {/* بقیه فیلدها مشابه */}
      <button type="submit">ارسال</button>
    </form>
  )
}
