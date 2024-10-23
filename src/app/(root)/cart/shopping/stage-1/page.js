/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import provincesData from '../../../../lib/provinces.json'
import styles from './page.module.css'
import Header from '@/components/layout/Header/Header'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function shoppingStage1() {
  const [stageNum, setStageNum] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    // شکستن مسیر URL به بخش‌های مختلف
    const segments = pathname.split('/')

    // دریافت آخرین بخش URL
    const stage = segments[segments.length - 1]

    // گرفتن آخرین کاراکتر از بخش نهایی URL
    const finalStage = setStageNum(Number(stage.slice(-1)))

    // فقط یک بار چاپ کن
    console.log(finalStage)
  }, [pathname]) // اینجا وابستگی رو به pathname گذاشتیم که هر وقت تغییر کرد، این کد اجرا بشه

  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  const schema = z.object({
    // مشخصات متقاضی
    gender: z.enum(['مرد', 'زن']),
    nationalCode: z.string().regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
    name: z.string().min(1, 'نام الزامی است'),
    fullName: z.string().min(1, 'نام و نام خانوادگی الزامی است'),
    fatherName: z.string().min(1, 'نام پدر الزامی است'),
    idNumber: z.string().min(1, 'شماره شناسنامه الزامی است'),
    // مشخصات محل سکونت متقاضی
    province: z.string().min(1, 'انتخاب استان الزامی است'),
    city: z.string().min(1, 'انتخاب شهر الزامی است'),
    urbanArea: z.string().min(1, 'منطقه شهری الزامی است'),
    address: z.string().min(1, 'آدرس پستی الزامی است'),
    plaque: z.string().min(1, 'پلاک الزامی است'),
    floor: z.string().min(1, 'طبقه الزامی است'),
    unit: z.string().min(1, 'واحد الزامی است'),
    postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
    // اطلاعات تماس متقاضی
    phoneAreaCode: z.string().min(1, 'پیش شماره الزامی است'),
    phoneNumber: z.string().min(1, 'شماره تلفن الزامی است'),
    mobile1: z.string().regex(/^\d{11}$/, 'شماره موبایل باید ۱۱ رقم باشد'),
    mobile2: z
      .string()
      .regex(/^\d{11}$/, 'شماره موبایل باید ۱۱ رقم باشد')
      .optional(),
    email: z.string().email('ایمیل نامعتبر است'),
    // تحصیلات و شغل
    occupation: z.enum(['شاغل', 'بازنشسته', 'خانه دار', 'بیکار', 'محصل/دانشجو', 'خارج از کشور']),
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
    // مشخصات آدرس محل کار
    workProvince: z.string().min(1, 'انتخاب استان الزامی است'),
    workCity: z.string().min(1, 'انتخاب شهر الزامی است'),
    workUrbanArea: z.string().min(1, 'منطقه شهرداری الزامی است'),
    workAddress: z.string().min(1, 'آدرس پستی الزامی است'),
    workPlaque: z.string().min(1, 'پلاک الزامی است'),
    workFloor: z.string().min(1, 'طبقه الزامی است'),
    workUnit: z.string().min(1, 'واحد الزامی است'),
    workPostalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  })

  const [formData, setFormData] = useState({
    // مشخصات متقاضی
    gender: '',
    nationalCode: '',
    name: '',
    fullName: '',
    fatherName: '',
    idNumber: '',
    // مشخصات محل سکونت متقاضی
    province: '',
    city: '',
    urbanArea: '',
    address: '',
    plaque: '',
    floor: '',
    unit: '',
    postalCode: '',
    // اطلاعات تماس متقاضی
    phoneAreaCode: '',
    phoneNumber: '',
    mobile1: '',
    mobile2: '',
    email: '',
    // تحصیلات و شغل
    occupation: '',
    educationLevel: '',
    // مشخصات آدرس محل کار
    workProvince: '',
    workCity: '',
    workUrbanArea: '',
    workAddress: '',
    workPlaque: '',
    workFloor: '',
    workUnit: '',
    workPostalCode: '',
  })

  const [errors, setErrors] = useState({})
  const [cities, setCities] = useState([])
  const [workCities, setWorkCities] = useState([])

  const provinces = Object.keys(provincesData['استان‌ها'])

  useEffect(() => {
    if (formData.province) {
      setCities(provincesData['استان‌ها'][formData.province])
    } else {
      setCities([])
    }
  }, [formData.province])

  useEffect(() => {
    if (formData.workProvince) {
      setWorkCities(provincesData['استان‌ها'][formData.workProvince])
    } else {
      setWorkCities([])
    }
  }, [formData.workProvince])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? value.toString() : value
    setFormData({ ...formData, [name]: newValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      schema.parse(formData)
      // فرم با موفقیت اعتبارسنجی شد
      console.log('اطلاعات فرم:', formData)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {}
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>مشخصات متقاضی</h2>

          <div className={styles.field}>
            <label>جنسیت:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="gender" value="مرد" onChange={handleChange} />
                مرد
              </label>
              <label>
                <input type="radio" name="gender" value="زن" onChange={handleChange} />
                زن
              </label>
            </div>
            {errors.gender && <span className={styles.error}>{errors.gender}</span>}
          </div>

          <div className={styles.field}>
            <label>کد ملی:</label>
            <input type="number" name="nationalCode" onChange={handleChange} />
            {errors.nationalCode && <span className={styles.error}>{errors.nationalCode}</span>}
          </div>

          <div className={styles.field}>
            <label>نام:</label>
            <input type="text" name="name" onChange={handleChange} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label>نام و نام خانوادگی:</label>
            <input type="text" name="fullName" onChange={handleChange} />
            {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
          </div>

          <div className={styles.field}>
            <label>نام پدر:</label>
            <input type="text" name="fatherName" onChange={handleChange} />
            {errors.fatherName && <span className={styles.error}>{errors.fatherName}</span>}
          </div>

          <div className={styles.field}>
            <label>شماره شناسنامه:</label>
            <input type="number" name="idNumber" onChange={handleChange} />
            {errors.idNumber && <span className={styles.error}>{errors.idNumber}</span>}
          </div>

          <h2 className={styles.title}>مشخصات محل سکونت متقاضی</h2>

          <div className={styles.field}>
            <label>نام استان:</label>
            <select name="province" onChange={handleChange}>
              <option value="">انتخاب استان</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && <span className={styles.error}>{errors.province}</span>}
          </div>

          <div className={styles.field}>
            <label>نام شهر:</label>
            <select name="city" onChange={handleChange}>
              <option value="">انتخاب شهر</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <span className={styles.error}>{errors.city}</span>}
          </div>

          <div className={styles.field}>
            <label>منطقه شهری:</label>
            <input type="text" name="urbanArea" onChange={handleChange} />
            {errors.urbanArea && <span className={styles.error}>{errors.urbanArea}</span>}
          </div>

          <div className={styles.field}>
            <label>آدرس پستی:</label>
            <input type="text" name="address" onChange={handleChange} />
            {errors.address && <span className={styles.error}>{errors.address}</span>}
          </div>

          <div className={styles.field}>
            <label>پلاک:</label>
            <input type="text" name="plaque" onChange={handleChange} />
            {errors.plaque && <span className={styles.error}>{errors.plaque}</span>}
          </div>

          <div className={styles.field}>
            <label>طبقه:</label>
            <input type="text" name="floor" onChange={handleChange} />
            {errors.floor && <span className={styles.error}>{errors.floor}</span>}
          </div>

          <div className={styles.field}>
            <label>واحد:</label>
            <input type="text" name="unit" onChange={handleChange} />
            {errors.unit && <span className={styles.error}>{errors.unit}</span>}
          </div>

          <div className={styles.field}>
            <label>کد پستی:</label>
            <input type="number" name="postalCode" onChange={handleChange} />
            {errors.postalCode && <span className={styles.error}>{errors.postalCode}</span>}
          </div>

          <h2 className={styles.title}>اطلاعات تماس متقاضی</h2>

          <div className={styles.field}>
            <label>پیش شماره تلفن ثابت:</label>
            <input type="number" name="phoneAreaCode" onChange={handleChange} />
            {errors.phoneAreaCode && <span className={styles.error}>{errors.phoneAreaCode}</span>}
          </div>

          <div className={styles.field}>
            <label>شماره تلفن ثابت:</label>
            <input type="number" name="phoneNumber" onChange={handleChange} />
            {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
          </div>

          <div className={styles.field}>
            <label>تلفن همراه اول:</label>
            <input type="number" name="mobile1" onChange={handleChange} />
            {errors.mobile1 && <span className={styles.error}>{errors.mobile1}</span>}
          </div>

          <div className={styles.field}>
            <label>تلفن همراه دوم:</label>
            <input type="number" name="mobile2" onChange={handleChange} />
            {errors.mobile2 && <span className={styles.error}>{errors.mobile2}</span>}
          </div>

          <div className={styles.field}>
            <label>ایمیل:</label>
            <input type="email" name="email" onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <h2 className={styles.title}>تحصیلات و شغل</h2>

          <div className={styles.field}>
            <label>وضعیت شغلی:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="occupation" value="شاغل" onChange={handleChange} />
                شاغل
              </label>
              <label>
                <input type="radio" name="occupation" value="بازنشسته" onChange={handleChange} />
                بازنشسته
              </label>
              <label>
                <input type="radio" name="occupation" value="خانه دار" onChange={handleChange} />
                خانه دار
              </label>
              <label>
                <input type="radio" name="occupation" value="بیکار" onChange={handleChange} />
                بیکار
              </label>
              <label>
                <input type="radio" name="occupation" value="محصل/دانشجو" onChange={handleChange} />
                محصل/دانشجو
              </label>
              <label>
                <input
                  type="radio"
                  name="occupation"
                  value="خارج از کشور"
                  onChange={handleChange}
                />
                خارج از کشور
              </label>
            </div>
            {errors.occupation && <span className={styles.error}>{errors.occupation}</span>}
          </div>

          <div className={styles.field}>
            <label>مقطع تحصیلی:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="educationLevel" value="بی سواد" onChange={handleChange} />
                بی سواد
              </label>
              <label>
                <input type="radio" name="educationLevel" value="ابتدایی" onChange={handleChange} />
                ابتدایی
              </label>
              <label>
                <input type="radio" name="educationLevel" value="سیکل" onChange={handleChange} />
                سیکل
              </label>
              <label>
                <input type="radio" name="educationLevel" value="دیپلم" onChange={handleChange} />
                دیپلم
              </label>
              <label>
                <input
                  type="radio"
                  name="educationLevel"
                  value="فوق دیپلم"
                  onChange={handleChange}
                />
                فوق دیپلم
              </label>
              <label>
                <input type="radio" name="educationLevel" value="لیسانس" onChange={handleChange} />
                لیسانس
              </label>
              <label>
                <input
                  type="radio"
                  name="educationLevel"
                  value="فوق لیسانس"
                  onChange={handleChange}
                />
                فوق لیسانس
              </label>
              <label>
                <input type="radio" name="educationLevel" value="دکترا" onChange={handleChange} />
                دکترا
              </label>
            </div>
            {errors.educationLevel && <span className={styles.error}>{errors.educationLevel}</span>}
          </div>

          <h2 className={styles.title}>مشخصات آدرس محل کار</h2>

          <div className={styles.field}>
            <label>نام استان:</label>
            <select name="workProvince" onChange={handleChange}>
              <option value="">انتخاب استان</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.workProvince && <span className={styles.error}>{errors.workProvince}</span>}
          </div>

          <div className={styles.field}>
            <label>نام شهر:</label>
            <select name="workCity" onChange={handleChange}>
              <option value="">انتخاب شهر</option>
              {workCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.workCity && <span className={styles.error}>{errors.workCity}</span>}
          </div>

          <div className={styles.field}>
            <label>منطقه شهرداری:</label>
            <input type="text" name="workUrbanArea" onChange={handleChange} />
            {errors.workUrbanArea && <span className={styles.error}>{errors.workUrbanArea}</span>}
          </div>

          <div className={styles.field}>
            <label>آدرس پستی:</label>
            <input type="text" name="workAddress" onChange={handleChange} />
            {errors.workAddress && <span className={styles.error}>{errors.workAddress}</span>}
          </div>

          <div className={styles.field}>
            <label>پلاک:</label>
            <input type="text" name="workPlaque" onChange={handleChange} />
            {errors.workPlaque && <span className={styles.error}>{errors.workPlaque}</span>}
          </div>

          <div className={styles.field}>
            <label>طبقه:</label>
            <input type="text" name="workFloor" onChange={handleChange} />
            {errors.workFloor && <span className={styles.error}>{errors.workFloor}</span>}
          </div>

          <div className={styles.field}>
            <label>واحد:</label>
            <input type="text" name="workUnit" onChange={handleChange} />
            {errors.workUnit && <span className={styles.error}>{errors.workUnit}</span>}
          </div>

          <div className={styles.field}>
            <label>کد پستی:</label>
            <input type="number" name="workPostalCode" onChange={handleChange} />
            {errors.workPostalCode && <span className={styles.error}>{errors.workPostalCode}</span>}
          </div>

          {/* <button className={styles.button} onClick={handleToast} type="submit">
            ارسال
          </button> */}
          <button className={styles.button} onClick={handleToast} type="submit">
            ویرایش اطلاعات
          </button>
          <Link className={styles.link} href={`../shopping/stage-${stageNum + 1}`}>
            ورود به مرحله بعد
          </Link>
          <Link className={styles.link} href={'../shopping'}>
            بازگشت به مراحل فروش
          </Link>
        </form>
      </div>
    </div>
  )
}
