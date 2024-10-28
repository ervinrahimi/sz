// src/components/admin/vehicles/VehiclesTable.jsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './VehiclesTable.module.css'

// Import the server action for toggling car status
import { toggleCarStatus } from '@/actions/admin/vehicles'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function VehiclesTable({ vehicles }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [confirmationId, setConfirmationId] = useState("")
  const router = useRouter()

  const openPopup = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setSelectedVehicle(null)
    setConfirmationId("")
    setIsPopupOpen(false)
  }

  const handleToggleStatus = async () => {
    if (selectedVehicle.id === confirmationId) {
      await toggleCarStatus(selectedVehicle.id)
      closePopup()
      // Refresh the list or handle UI updates if needed
      router.refresh()
      toast.success("وضعیت خودرو با موفقیت تغییر کرد!")
    } else {
      toast.error("آیدی وارد شده با آیدی خودرو مطابقت ندارد.")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد خودرو</div>
        <div className={styles.headerCell}>مدل</div>
        <div className={styles.headerCell}>نام</div>
        <div className={styles.headerCell}>وضعیت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className={styles.row}>
            <div className={styles.cell}>{vehicle.id}</div>
            <div className={styles.cell}>{vehicle.model}</div>
            <div className={styles.cell}>{vehicle.name}</div>
            <div className={styles.cell}>
              {vehicle.status === 'UNAVAILABLE' ? 'ناموجود': 'موجود' }
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/vehicles/${vehicle.id}`}>
                <button className={styles.button}>ویرایش</button>
              </Link>
              <button className={styles.button} onClick={() => openPopup(vehicle)}>
                {vehicle.status === 'DEACTIVATED' ? 'فعال کردن' : 'غیرفعال کردن' }
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>آیا از تغییر وضعیت خودرو اطمینان دارید؟</h3>
            <p>لطفاً کد خودرو را وارد کنید تا تایید شود:</p>
            <input
              type="text"
              value={confirmationId}
              onChange={(e) => setConfirmationId(e.target.value)}
              className={styles.input}
            />
            <div className={styles.popupActions}>
              <button onClick={handleToggleStatus} className={styles.buttonConfirm}>تایید</button>
              <button onClick={closePopup} className={styles.buttonCancel}>انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
