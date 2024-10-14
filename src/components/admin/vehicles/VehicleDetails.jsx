'use client'

import { useState } from 'react'
import styles from './VehicleDetails.module.css'
import { updateVehicle } from '@/actions/admin/vehicles'

export default function VehicleDetails({ vehicle }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: vehicle.id,
    model: vehicle.model || '',
    name: vehicle.name || '',
    status: vehicle.status || 'AVAILABLE',
    appearanceSpecifications: vehicle.appearanceSpecifications || [],
    technicalSpecifications: vehicle.technicalSpecifications || [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateVehicle(formData)
    setEditing(false)
  }

  const handleAddAppearanceSpec = () => {
    setFormData({
      ...formData,
      appearanceSpecifications: [
        ...formData.appearanceSpecifications,
        { title: '', options: [], isSelectable: true },
      ],
    })
  }

  const handleRemoveAppearanceSpec = (index) => {
    const newSpecs = [...formData.appearanceSpecifications]
    newSpecs.splice(index, 1)
    setFormData({ ...formData, appearanceSpecifications: newSpecs })
  }

  const handleAddTechnicalSpec = () => {
    setFormData({
      ...formData,
      technicalSpecifications: [
        ...formData.technicalSpecifications,
        { key: '', value: '', note: '' },
      ],
    })
  }

  const handleRemoveTechnicalSpec = (index) => {
    const newSpecs = [...formData.technicalSpecifications]
    newSpecs.splice(index, 1)
    setFormData({ ...formData, technicalSpecifications: newSpecs })
  }

  return (
    <div className={styles.vehicleDetails}>
      {editing ? (
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

          {/* ویرایش مشخصات ظاهری */}
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

          {/* ویرایش مشخصات فنی */}
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

          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>
              ذخیره
            </button>
            <button type="button" className={styles.cancelButton} onClick={() => setEditing(false)}>
              لغو
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p className={styles.text}>مدل: {vehicle.model}</p>
          <p className={styles.text}>نام: {vehicle.name}</p>
          <p className={styles.text}>
            وضعیت: {vehicle.status === 'AVAILABLE' ? 'موجود' : 'ناموجود'}
          </p>

          <h3 className={styles.subtitle}>مشخصات ظاهری</h3>
          {vehicle.appearanceSpecifications.map((spec, index) => (
            <div key={index}>
              <p className={styles.text}>عنوان: {spec.title}</p>
              <p className={styles.text}>مقادیر: {spec.options.join(', ')}</p>
              <p className={styles.text}>قابل انتخاب بودن: {spec.isSelectable ? 'بله' : 'خیر'}</p>
            </div>
          ))}

          <h3 className={styles.subtitle}>مشخصات فنی</h3>
          {vehicle.technicalSpecifications.map((spec, index) => (
            <div key={index}>
              <p className={styles.text}>ویژگی: {spec.key}</p>
              <p className={styles.text}>مقدار: {spec.value}</p>
              <p className={styles.text}>یادداشت: {spec.note}</p>
            </div>
          ))}

          <button onClick={() => setEditing(true)} className={styles.editButton}>
            ویرایش اطلاعات
          </button>
        </div>
      )}
    </div>
  )
}
