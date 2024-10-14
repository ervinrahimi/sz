// src/app/admin/notifications/new/page.jsx

import SendNotificationForm from "@/components/admin/notifications/SendNotificationForm/SendNotificationForm";

export default function NewNotificationPage() {
  return (
    <div>
      <h1>ارسال نوتیفیکیشن جدید</h1>
      <SendNotificationForm /> {/* فرم ارسال نوتیفیکیشن */}
    </div>
  )
}
