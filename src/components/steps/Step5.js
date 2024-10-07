// کامپوننت مرحله پنجم: ارسال فرم تاییدیه ثبت اطلاعات
import React from 'react';

export default function Step5({ order }) {
  // لینک فایل آپلود شده توسط ادمین
  const adminFileLink = '/uploads/admin/' + order.id + '/confirmation_form.pdf';

  // تابع برای تایید
  const handleConfirm = async () => {
    // ایجاد مرحله جدید
    const success = await submitStepConfirmation(order.id, 5);
    if (success) {
      // رفرش صفحه یا انتقال به مرحله بعد
    }
  };

  return (
    <div>
      <h2>مرحله پنجم: ارسال فرم تاییدیه ثبت اطلاعات</h2>
      <p>لطفاً فرم زیر را دانلود کنید:</p>
      <a href={adminFileLink} download>دانلود فرم تاییدیه</a>
      <button onClick={handleConfirm}>تایید</button>
    </div>
  );
}
