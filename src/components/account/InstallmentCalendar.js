'use client'
import React, { useState, useEffect } from 'react';
import { getInstallmentSchedule } from '@/actions/paymentActions';

export default function InstallmentCalendar({user}) {
  const [schedule, setSchedule] = useState([]);

  // دریافت برنامه اقساط
  useEffect(() => {
    async function fetchData() {
      const data = await getInstallmentSchedule(user.id);
      setSchedule(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>تقویم اقساط</h2>
      {schedule.length === 0 ? (
        <p>شما هیچ قسطی ندارید.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>خودرو</th>
              <th>تاریخ سررسید</th>
              <th>مبلغ قسط</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((installment) => (
              <tr key={installment.id}>
                <td>{installment.order.car.name}</td>
                <td>{new Date(installment.dueDate).toLocaleDateString('fa-IR')}</td>
                <td>{installment.amount} تومان</td>
                <td>{installment.status === 'پرداخت نشده' ? 'در انتظار پرداخت' : 'پرداخت شده'}</td>
                <td>
                  {installment.status === 'پرداخت نشده' ? (
                    <button onClick={() => {/* تابع پرداخت */}}>پرداخت</button>
                  ) : (
                    'پرداخت شده'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
