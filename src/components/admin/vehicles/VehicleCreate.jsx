'use client'

import { useState, useTransition } from 'react'
import { createVehicle } from '@/actions/admin/vehicles'
import { useRouter } from 'next/navigation'
import styles from './VehicleCreate'

export default function VehicleCreate() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    model: '',
    name: '',
    image: '',
    status: 'AVAILABLE',
    appearanceSpecifications: [],
    technicalSpecifications: [],
  })
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e) => {
    e.preventDefault()
    startTransition(() => {
      createVehicle(formData).then(() => {
        router.push('/admin/vehicles')
      })
    })
  }

  // اضافه کردن مشخصات ظاهری جدید
  const handleAddAppearanceSpec = () => {
    setFormData({
      ...formData,
      appearanceSpecifications: [
        ...formData.appearanceSpecifications,
        { title: '', options: [], isSelectable: true },
      ],
    })
  }

  // حذف مشخصات ظاهری اضافه‌شده
  const handleRemoveAppearanceSpec = (index) => {
    const newSpecs = [...formData.appearanceSpecifications]
    newSpecs.splice(index, 1)
    setFormData({ ...formData, appearanceSpecifications: newSpecs })
  }

  // اضافه کردن مشخصات فنی جدید
  const handleAddTechnicalSpec = () => {
    setFormData({
      ...formData,
      technicalSpecifications: [
        ...formData.technicalSpecifications,
        { key: '', value: '', note: '' },
      ],
    })
  }

  // حذف مشخصات فنی اضافه‌شده
  const handleRemoveTechnicalSpec = (index) => {
    const newSpecs = [...formData.technicalSpecifications]
    newSpecs.splice(index, 1)
    setFormData({ ...formData, technicalSpecifications: newSpecs })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          مدل:
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          نام:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          تصویر:
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          وضعیت:
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className={styles.select}
          >
            <option value="AVAILABLE">موجود</option>
            <option value="UNAVAILABLE">ناموجود</option>
          </select>
        </label>
        <h3 className={styles.subtitle}>مشخصات ظاهری</h3>
        {formData.appearanceSpecifications.map((spec, index) => (
          <div key={index} className={styles.specification}>
            <label className={styles.label}>
              عنوان:
              <input
                type="text"
                value={spec.title}
                onChange={(e) => {
                  const newSpecs = [...formData.appearanceSpecifications]
                  newSpecs[index].title = e.target.value
                  setFormData({ ...formData, appearanceSpecifications: newSpecs })
                }}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              قابل انتخاب بودن:
              <input
                type="checkbox"
                checked={spec.isSelectable}
                onChange={(e) => {
                  const newSpecs = [...formData.appearanceSpecifications]
                  newSpecs[index].isSelectable = e.target.checked
                  setFormData({ ...formData, appearanceSpecifications: newSpecs })
                }}
                className={styles.checkbox}
              />
            </label>
            <label className={styles.label}>
              مقادیر:
              {spec.options.map((option, optIndex) => (
                <div key={optIndex} className={styles.optionContainer}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newSpecs = [...formData.appearanceSpecifications]
                      newSpecs[index].options[optIndex] = e.target.value
                      setFormData({ ...formData, appearanceSpecifications: newSpecs })
                    }}
                    className={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecs = [...formData.appearanceSpecifications]
                      newSpecs[index].options.splice(optIndex, 1)
                      setFormData({ ...formData, appearanceSpecifications: newSpecs })
                    }}
                    className={styles.removeButton}
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newSpecs = [...formData.appearanceSpecifications]
                  newSpecs[index].options.push('')
                  setFormData({ ...formData, appearanceSpecifications: newSpecs })
                }}
                className={styles.addButton}
              >
                افزودن مقدار
              </button>
            </label>
            <button
              type="button"
              onClick={() => handleRemoveAppearanceSpec(index)}
              className={styles.removeButton}
            >
              حذف مشخصه
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddAppearanceSpec} className={styles.addButton}>
          افزودن مشخصات ظاهری
        </button>
        <h3 className={styles.subtitle}>مشخصات فنی</h3>
        {formData.technicalSpecifications.map((spec, index) => (
          <div key={index} className={styles.specification}>
            <label className={styles.label}>
              ویژگی:
              <input
                type="text"
                value={spec.key}
                onChange={(e) => {
                  const newSpecs = [...formData.technicalSpecifications]
                  newSpecs[index].key = e.target.value
                  setFormData({ ...formData, technicalSpecifications: newSpecs })
                }}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              مقدار:
              <input
                type="text"
                value={spec.value}
                onChange={(e) => {
                  const newSpecs = [...formData.technicalSpecifications]
                  newSpecs[index].value = e.target.value
                  setFormData({ ...formData, technicalSpecifications: newSpecs })
                }}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              یادداشت:
              <input
                type="text"
                value={spec.note}
                onChange={(e) => {
                  const newSpecs = [...formData.technicalSpecifications]
                  newSpecs[index].note = e.target.value
                  setFormData({ ...formData, technicalSpecifications: newSpecs })
                }}
                className={styles.input}
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveTechnicalSpec(index)}
              className={styles.removeButton}
            >
              حذف مشخصه
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTechnicalSpec} className={styles.addButton}>
          افزودن مشخصات فنی
        </button>
        <button type="submit" disabled={isPending} className={styles.submitButton}>
          ایجاد خودرو
        </button>
      </form>
    </div>
  )
}
