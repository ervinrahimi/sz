"use client"
import React, { useState, useEffect } from 'react';
import { getUserNotifications, markAsRead } from '@/actions/notificationActions';

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);

  // دریافت اعلان‌ها
  useEffect(() => {
    async function fetchData() {
      const data = await getUserNotifications(user.id);
      setNotifications(data);
    }
    fetchData();
  }, []);

  // تابع برای علامت‌گذاری به عنوان خوانده‌شده
  const handleMarkAsRead = async (notificationId) => {
    const success = await markAsRead(notificationId);
    if (success) {
      // به‌روزرسانی لیست اعلان‌ها
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    }
  };

  return (
    <div>
      <h2>اعلان‌ها</h2>
      {notifications.length === 0 ? (
        <p>شما هیچ اعلان جدیدی ندارید.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <button onClick={() => handleMarkAsRead(notification.id)}>علامت‌گذاری به عنوان خوانده‌شده</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
