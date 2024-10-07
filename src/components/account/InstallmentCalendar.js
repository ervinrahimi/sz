"use client"
import React, { useState, useEffect } from 'react';
import { getInstallmentSchedule } from '@/actions/paymentActions';

export default function InstallmentCalendar() {
  const [schedule, setSchedule] = useState([]);

  // دریافت برنامه اقساط
  useEffect(() => {
    async function fetchData() {
      const data = await getInstallmentSchedule();
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
              <th>تاریخ سررسید</th>
              <th>مبلغ قسط</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((installment) => (
              <tr key={installment.id}>
                <td>{new Date(installment.dueDate).toLocaleDateString('fa-IR')}</td>
                <td>{installment.amount} تومان</td>
                <td>
                  {installment.status === 'پرداخت نشده' ? (
                    <button onClick={() => {/* پرداخت آنلاین */}}>پرداخت</button>
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
