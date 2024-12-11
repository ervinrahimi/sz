import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { HexColorPicker } from 'react-colorful'
import styles from './Properties.module.css'

export default function Properties({ selectedField, formSettings, onFieldUpdate, onSettingsUpdate, showSettings }) {
  const { control: fieldControl, handleSubmit: handleFieldSubmit, reset: resetField } = useForm()
  const { control: settingsControl, handleSubmit: handleSettingsSubmit, reset: resetSettings } = useForm()
  const [localField, setLocalField] = useState(null)

  useEffect(() => {
    if (selectedField) {
      setLocalField(selectedField)
      resetField(selectedField)
    }
  }, [selectedField, resetField])

  useEffect(() => {
    resetSettings(formSettings)
  }, [formSettings, resetSettings])

  const onFieldSubmit = (data) => {
    if (localField) {
      const updatedField = { ...localField, ...data }
      onFieldUpdate(updatedField)
      setLocalField(updatedField)
    }
  }

  const onSettingsSubmit = (data) => {
    onSettingsUpdate(data)
  }

  const handleFieldChange = (name, value) => {
    if (localField) {
      const updatedField = { ...localField, [name]: value }
      setLocalField(updatedField)
      onFieldUpdate(updatedField)
    }
  }

  if (showSettings) {
    return (
      <div className={styles.properties}>
        <form onSubmit={handleSettingsSubmit(onSettingsSubmit)}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>تنظیمات فرم</h3>
            <div className={styles.field}>
              <label className={styles.label}>عنوان فرم</label>
              <Controller
                name="formTitle"
                control={settingsControl}
                defaultValue={formSettings.formTitle}
                render={({ field }) => (
                  <input {...field} type="text" className={styles.input} />
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                <Controller
                  name="showLabels"
                  control={settingsControl}
                  defaultValue={formSettings.showLabels}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                نمایش برچسب‌ها
              </label>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>رنگ دکمه ارسال</label>
              <Controller
                name="submitButtonColor"
                control={settingsControl}
                defaultValue={formSettings.submitButtonColor}
                render={({ field }) => (
                  <HexColorPicker color={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>متن دکمه ارسال</label>
              <Controller
                name="submitButtonText"
                control={settingsControl}
                defaultValue={formSettings.submitButtonText}
                render={({ field }) => (
                  <input {...field} type="text" className={styles.input} />
                )}
              />
            </div>
          </div>
          <button type="submit" className={`${styles.saveButton} ${styles.fullWidth}`}>ذخیره تنظیمات</button>
        </form>
      </div>
    )
  }

  if (!localField) {
    return (
      <div className={styles.properties}>
        <div className={styles.empty}>
          یک فیلد را برای ویرایش انتخاب کنید
        </div>
      </div>
    )
  }

  const showAlignment = localField.type !== 'paragraph'

  return (
    <div className={styles.properties}>
      <form onSubmit={handleFieldSubmit(onFieldSubmit)}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>ویژگی‌ها</h3>
          <div className={styles.field}>
            <label className={styles.label}>برچسب</label>
            <Controller
              name="label"
              control={fieldControl}
              defaultValue={localField.label}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={styles.input}
                  onChange={(e) => {
                    field.onChange(e)
                    handleFieldChange('label', e.target.value)
                  }}
                />
              )}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>متن راهنما</label>
            <Controller
              name="placeholder"
              control={fieldControl}
              defaultValue={localField.placeholder}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={styles.input}
                  onChange={(e) => {
                    field.onChange(e)
                    handleFieldChange('placeholder', e.target.value)
                  }}
                />
              )}
            />
          </div>
        </div>
        
        {showAlignment && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>تراز</h3>
            <div className={styles.alignmentTools}>
              <button 
                type="button"
                className={`${styles.alignButton} ${localField.alignment === 'left' ? styles.active : ''}`}
                onClick={() => handleFieldChange('alignment', 'left')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="21" y1="6" x2="3" y2="6"/>
                  <line x1="21" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="18" x2="3" y2="18"/>
                </svg>
              </button>
              <button 
                type="button"
                className={`${styles.alignButton} ${localField.alignment === 'center' ? styles.active : ''}`}
                onClick={() => handleFieldChange('alignment', 'center')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="21" y1="6" x2="3" y2="6"/>
                  <line x1="17" y1="12" x2="7" y2="12"/>
                  <line x1="21" y1="18" x2="3" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

