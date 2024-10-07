// کامپوننت مرحله ششم: ارسال شناسه پرداخت وجه
import React, { useState } from 'react';
import { uploadBankReceipt } from '@/actions/uploadBankReceipt';

export default function Step6({ order }) {
  // لینک فایل آپلود شده توسط ادمین
  const adminFileLink = '/uploads/admin/' + order.id + '/payment_identifier.pdf';
  const [file, setFile] = useState(null);

  // تابع برای ارسال فایل
  const handleUpload = async () => {
    const success = await uploadBankReceipt(order.id, 6, file);
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  };

  return (
    <div>
      <h2>مرحله ششم: ارسال شناسه پرداخت وجه</h2>
      <p>لطفاً فایل زیر را دانلود کرده و پس از واریز وجه، فیش واریزی را آپلود کنید:</p>
      <a href={adminFileLink} download>دانلود شناسه پرداخت</a>
      <div>
        <label>آپلود فیش واریزی:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <button onClick={handleUpload}>ارسال</button>
    </div>
  );
}
