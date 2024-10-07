// کامپوننت مرحله چهارم: دریافت وجه التزام به خرید
import React, { useState } from 'react';
import { uploadPaymentReceipts } from '@/actions/uploadPaymentReceipts';

export default function Step4({ order }) {
  const [files, setFiles] = useState([]);

  // تابع برای اضافه کردن فایل‌ها
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  // تابع برای ارسال فایل‌ها
  const handleUpload = async () => {
    const success = await uploadPaymentReceipts(order.id, 4, files);
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  };

  return (
    <div>
      <h2>مرحله چهارم: دریافت وجه التزام به خرید جهت رزرو قطعی</h2>
      <p>مبلغ قابل پرداخت: {order.saleCondition.registrationPayment} تومان</p>
      <p>شرایط بازگشت وجه: لورم ایپسوم متن ساختگی...</p>
      <div>
        <label>آپلود رسیدهای پرداخت:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>ارسال</button>
    </div>
  );
}
