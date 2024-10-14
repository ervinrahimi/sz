'use client'

import { useEffect, useState } from 'react'
import styles from './InstallmentManagement.module.css'
import { getInstallments, uploadReceipt } from '@/actions/dashboard/getInstallments'

export default function InstallmentManagement() {
  const [installments, setInstallments] = useState([])

  useEffect(() => {
    async function fetchInstallments() {
      const res = await getInstallments()
      if (res.success) {
        setInstallments(res.installments)
      }
    }
    fetchInstallments()
  }, [])

  const handleUpload = async (installmentId, file) => {
    const res = await uploadReceipt(installmentId, file)
    if (res.success) {
      alert('رسید با موفقیت آپلود شد.')
    } else {
      alert(res.message)
    }
  }

  return (
    <div className={styles.installmentManagement}>
      <h2>مدیریت اقساط</h2>
      {installments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>تاریخ قسط</th>
              <th>مبلغ قسط</th>
              <th>وضعیت</th>
              <th>آپلود رسید</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((installment) => (
              <tr key={installment.id}>
                <td>{new Date(installment.dueDate).toLocaleDateString()}</td>
                <td>{installment.amount}</td>
                <td>{installment.status}</td>
                <td>
                  {installment.status === 'UNPAID' && (
                    <input
                      type="file"
                      onChange={(e) => handleUpload(installment.id, e.target.files[0])}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>هیچ قسطی یافت نشد.</p>
      )}
    </div>
  )
}
