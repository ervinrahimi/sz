"use client"
import React, { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo, changePassword } from '@/actions/accountActions';

export default function PersonalInfo({ user }) {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // دریافت اطلاعات کاربر از سرور
  useEffect(() => {
    async function fetchData() {
      const data = await getUserInfo(user.id);
      setUserInfo(data);
    }
    fetchData();
  }, []);

  // تابع برای ذخیره تغییرات اطلاعات شخصی
  const handleSave = async () => {
    const success = await updateUserInfo(user.id, userInfo);
    if (success) {
      setEditMode(false);
    } else {
      alert('خطا در به‌روزرسانی اطلاعات');
    }
  };

  // تابع برای تغییر رمز عبور
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('رمزهای عبور جدید مطابقت ندارند');
      return;
    }
    const success = await changePassword(passwordData);
    if (success) {
      alert('رمز عبور با موفقیت تغییر یافت');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } else {
      alert('خطا در تغییر رمز عبور');
    }
  };

  if (!userInfo) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div>
      <h2>اطلاعات شخصی</h2>
      {editMode ? (
        <div>
          <label>نام:</label>
          <input
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <label>نام خانوادگی:</label>
          <input
            value={userInfo.family}
            onChange={(e) => setUserInfo({ ...userInfo, family: e.target.value })}
          />
          <label>ایمیل:</label>
          <input
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <label>شماره تماس:</label>
          <input
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
          <button onClick={handleSave}>ذخیره</button>
          <button onClick={() => setEditMode(false)}>لغو</button>
        </div>
      ) : (
        <div>
          <p>نام: {userInfo.name}</p>
          <p>نام خانوادگی: {userInfo.family}</p>
          <p>ایمیل: {userInfo.email}</p>
          <p>شماره تماس: {userInfo.phone}</p>
          <button onClick={() => setEditMode(true)}>ویرایش</button>
        </div>
      )}

      <h3>تغییر رمز عبور</h3>
      <div>
        <label>رمز عبور فعلی:</label>
        <input
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <label>رمز عبور جدید:</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <label>تأیید رمز عبور جدید:</label>
        <input
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
          }
        />
        <button onClick={handleChangePassword}>تغییر رمز عبور</button>
      </div>
    </div>
  );
}
