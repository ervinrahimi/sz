// کامپوننت مرحله اول: فرم اطلاعات متقاضی
import React, { useState } from 'react'
import { submitStep1 } from '@/actions/submitStep1'
import { iranCities } from '@/utils/iranCities';

export default function Step1({ order }) {
  const [formData, setFormData] = useState({
    gender: '',
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    idNumber: '',
    // سایر فیلدها
  })

  // تابع برای ارسال داده‌ها
  const handleSubmit = async () => {
    const success = await submitStep1(order.id, formData)
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  }

  return (
    <div>
      <h2>مرحله اول: فرم اطلاعات متقاضی</h2>
      {/* فرم اطلاعات متقاضی */}
      {/* مثال برای جنسیت */}
      <label>جنسیت:</label>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          مرد
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          زن
        </label>
        <label>نام استان:</label>
        <select onChange={(e) => setSelectedProvince(e.target.value)}>
          {Object.keys(iranCities).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>

        <label>نام شهر:</label>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          {iranCities[selectedProvince]?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {/* سایر فیلدهای فرم */}
      <button onClick={handleSubmit}>ارسال</button>
    </div>
  )
}
