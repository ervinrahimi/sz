'use client'

import { useEffect, useState } from 'react'
import styles from './InstallmentManagement.module.css'
import { getInstallments, uploadReceipt } from '@/actions/dashboard/getInstallments'
import { useRouter } from 'next/navigation'

export default function InstallmentManagement() {
  const [installments, setInstallments] = useState([])
  const router = useRouter()

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
      router.refresh()
    } else {
      alert(res.message)
    }
  }

  return (
    <div className={styles.installmentManagement}>
      <h2 className={styles.title}>مدیریت اقساط</h2>
      {installments.length > 0 ? (
        <div className={styles.installments}>
          {installments.map((installment) => (
            <div key={installment.id} className={styles.installment}>
              <div className={styles.detail}>
                <span className={styles.label}>تاریخ قسط:</span>
                <span>{new Date(installment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>مبلغ قسط:</span>
                <span>{installment.amount}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>وضعیت:</span>
                <span>{installment.status}</span>
              </div>
              <div className={styles.detail}>
                {installment.status === 'UNPAID' && (
                  <input
                    type="file"
                    onChange={(e) => handleUpload(installment.id, e.target.files[0])}
                    className={styles.fileInput}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>هیچ قسطی یافت نشد.</p>
      )}
    </div>
  )
}
