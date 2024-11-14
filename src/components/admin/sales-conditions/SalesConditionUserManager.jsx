'use client'

import { addAuthorizedUser, removeAuthorizedUser } from '@/actions/admin/sales-conditions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import styles from './SalesConditionUserManager.module.css'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

const userSchema = z.object({
  nationalCode: z
    .string()
    .length(10, 'کد ملی باید ۱۰ رقم باشد.')
    .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
  phone: z
    .string()
    .length(11, 'شماره تلفن باید ۱۱ رقم باشد.')
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست.'),
})

const excelSchema = z.object({
  excelFile: z
    .any()
    .refine((file) => file[0] && (file[0].name.endsWith('.xlsx') || file[0].name.endsWith('.xls')), {
      message: 'فایل باید از نوع اکسل باشد (با پسوند .xls یا .xlsx).',
    }),
})

export default function SalesConditionUserManager({ salesConditionId, initialUsers }) {
  const [authorizedUsers, setAuthorizedUsers] = useState(initialUsers || [])
  const [addUserPopup, setAddUserPopup] = useState(false)
  const [addExcelPopup, setAddExcelPopup] = useState(false)
  const [excelErrors, setExcelErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [previewData, setPreviewData] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { nationalCode: '', name: '', family: '', phone: '' },
  })

  const { register: registerExcel, handleSubmit: handleExcelSubmit, formState: { errors: excelFormErrors } } = useForm({
    resolver: zodResolver(excelSchema),
  })

  const openAddUserPopup = () => setAddUserPopup(true)
  const openAddExcelPopup = () => setAddExcelPopup(true)
  const closeAddUserPopup = () => {
    reset()
    setAddUserPopup(false)
  }
  const closeAddExcelPopup = () => {
    reset()
    setAddExcelPopup(false)
    setExcelErrors([])
    setPreviewData([])
    setHasErrors(false)
    setUploadProgress(null)
  }

  const onAddUser = async (data) => {
    const { nationalCode, phone, name, family } = data
    if (authorizedUsers.some((user) => user.nationalCode === nationalCode) && authorizedUsers.some((user) => user.phone === phone)) {
      toast.error('کاربری با این مشخصات از قبل وجود دارد!')
      return
    }
    const newUser = await addAuthorizedUser(salesConditionId, { nationalCode, phone, name, family })
    setAuthorizedUsers((prevUsers) => [...prevUsers, newUser])
    toast.success('کاربر با موفقیت اضافه شد.')
    closeAddUserPopup()
  }

  const onAddExcel = async (data) => {
    setIsLoading(true)
    setExcelErrors([])
    setHasErrors(false)
  
    const file = data.excelFile[0]
    const reader = new FileReader()
    reader.onload = async (e) => {
      const binaryStr = e.target.result
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
  
      // حذف موارد تکراری در jsonData
      const uniqueData = jsonData.reduce((acc, user) => {
        const isDuplicate = acc.some(
          (existingUser) =>
            existingUser.nationalCode === user.nationalCode && existingUser.phone === user.phone
        )
        return isDuplicate ? acc : [...acc, user]
      }, [])
  
      const validationErrors = []
      const errorCounts = { nationalCode: 0, phone: 0, name: 0, family: 0 }
  
      const parsedData = uniqueData?.map((user, index) => {
        const result = userSchema.safeParse(user)
        const isDuplicate = authorizedUsers.some(
          (existingUser) =>
            existingUser.nationalCode === user.nationalCode || existingUser.phone === user.phone
        )
  
        const tempId = `temp-${Date.now()}-${Math.random()}`
  
        if (!result.success || isDuplicate) {
          const errorFields = []
          if (isDuplicate) {
            errorFields.push('کد ملی یا شماره تلفن تکراری')
          } else {
            result.error.errors.forEach((err) => {
              if (err.path[0] === 'nationalCode') errorCounts.nationalCode++
              if (err.path[0] === 'phone') errorCounts.phone++
              if (err.path[0] === 'name') errorCounts.name++
              if (err.path[0] === 'family') errorCounts.family++
              errorFields.push(err.path[0])
            })
          }
          validationErrors.push({
            row: index + 1, // به روز کردن ردیف برای نمایش
            errors: errorFields,
          })
          return { ...user, isValid: false, errorFields, id: tempId, rowIndex: index + 1 }
        }
        return { ...user, isValid: true, id: tempId, rowIndex: index + 1 }
      })
  
      setPreviewData(parsedData)
      setHasErrors(validationErrors.length > 0)
  
      if (validationErrors.length > 0) {
        const errorMessages = []
        if (errorCounts.nationalCode) errorMessages.push(`${errorCounts.nationalCode} کد ملی اشتباه وجود دارد`)
        if (errorCounts.phone) errorMessages.push(`${errorCounts.phone} شماره تلفن اشتباه وجود دارد`)
        if (errorCounts.name) errorMessages.push(`${errorCounts.name} نام اشتباه وجود دارد`)
        if (errorCounts.family) errorMessages.push(`${errorCounts.family} نام خانوادگی اشتباه وجود دارد`)
        if (validationErrors.some((error) => error.errors.includes('کد ملی یا شماره تلفن تکراری')))
          errorMessages.push(`کد ملی یا شماره تلفن تکراری در فایل وجود دارد`)
        setExcelErrors(errorMessages)
        toast.error('فایل دارای خطاهایی است.')
      }
      setIsLoading(false)
    }
    reader.readAsBinaryString(file)
  }

  const confirmAndAddValidUsers = async () => {
    const validUsers = previewData.filter((user) => user.isValid)
    setUploadProgress({ added: 0, total: validUsers.length })
  
    const addedUsers = [] // Temporary array to store added users with final ids
  
    for (const [index, user] of validUsers.entries()) {
      const newUser = await addAuthorizedUser(salesConditionId, user)
      addedUsers.push(newUser) // Push the new user with the final id from the server
      setUploadProgress({ added: index + 1, total: validUsers.length })
    }
  
    // Update the authorized users with the newly added users having final ids
    setAuthorizedUsers((prevUsers) => [...prevUsers, ...addedUsers])
  
    toast.success('کاربران معتبر با موفقیت اضافه شدند.')
    setTimeout(() => closeAddExcelPopup(), 1000)
  }
  
  const handleRemoveUser = async (userId) => {
    await removeAuthorizedUser(userId)
    setAuthorizedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    toast.success('کاربر با موفقیت حذف شد.')
  }  

  return (
    <div className={styles.container}>
      <div className={styles.topSideContainer}>
        <button onClick={openAddUserPopup} className={styles.topSideButton}>
          افزودن کاربر جدید
        </button>
        <button onClick={openAddExcelPopup} className={styles.topSideButton}>
          وارد کردن فایل اکسل
        </button>
      </div>

      {/* لیست کاربران */}
      <div className={styles.userList}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>نام و نام خانوادگی</div>
          <div className={styles.headerCell}>شماره تلفن</div>
          <div className={styles.headerCell}>کد ملی</div>
          <div className={styles.headerCell}>عملیات</div>
        </div>
        <div className={styles.body}>
          {authorizedUsers?.map((user) => (
            <div key={user.id} className={styles.row}>
              <div className={styles.cell}>
                {user.name} {user.family}
              </div>
              <div className={styles.cell}>{user.phone}</div>
              <div className={styles.cell}>{user.nationalCode}</div>
              <div className={styles.cell}>
                <button onClick={() => handleRemoveUser(user.id)} className={styles.removeButton}>
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addUserPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h4>افزودن کاربر جدید</h4>
            <form onSubmit={handleSubmit(onAddUser)} className={styles.form}>
              <label className={styles.label}>کد ملی:</label>
              <input type="text" {...register('nationalCode')} className={styles.input} />
              {errors.nationalCode && <p className={styles.error}>{errors.nationalCode.message}</p>}

              <label className={styles.label}>شماره تلفن:</label>
              <input type="text" {...register('phone')} className={styles.input} />
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

              <label className={styles.label}>نام:</label>
              <input type="text" {...register('name')} className={styles.input} />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}

              <label className={styles.label}>نام خانوادگی:</label>
              <input type="text" {...register('family')} className={styles.input} />
              {errors.family && <p className={styles.error}>{errors.family.message}</p>}

              <button type="submit" className={styles.submitButton}>
                افزودن
              </button>
              <button type="button" onClick={closeAddUserPopup} className={styles.cancelButton}>
                لغو
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Excel Upload */}
      {addExcelPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            {uploadProgress ? (
              <div className={styles.uploadProgress}>
                <h4>در حال اضافه کردن کاربران</h4>
                <p>{`تعداد اضافه شده: ${uploadProgress.added} از ${uploadProgress.total}`}</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{
                      width: `${(uploadProgress.added / uploadProgress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <h4>پیش‌نمایش داده‌های آپلود شده</h4>
                <form onSubmit={handleExcelSubmit(onAddExcel)} className={styles.form}>
                  <label className={styles.label}>فایل Excel:</label>
                  <input type="file" {...registerExcel('excelFile')} className={styles.input} />
                  {excelFormErrors.excelFile && <p className={styles.error}>{excelFormErrors.excelFile.message}</p>}
                  <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'در حال آپلود...' : 'آپلود فایل'}
                  </button>
                  <button type="button" onClick={closeAddExcelPopup} className={styles.cancelButton}>
                    لغو
                  </button>
                </form>

                {excelErrors.length > 0 && (
                  <div className={styles.errorBox}>
                    <h4>خطاهای فایل</h4>
                    <ul>
                      {excelErrors?.map((error, index) => (
                        <li key={index} className={styles.error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {previewData.length > 0 && (
                  <div className={styles.previewBox}>
                    <div className={styles.previewContainer}>
                      {previewData?.map((user, index) => (
                        <div
                          key={user.id}
                          className={`${styles.previewRow} ${!user.isValid ? styles.invalidRow : ''}`}
                        >
                          <span>{user.rowIndex}. {user.name} {user.family} - {user.phone} - {user.nationalCode}</span>
                          {!user.isValid && (
                            <p className={styles.errorDetails}>
                              در این قسمت {user.errorFields.join(' / ')} اشتباه هست
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={confirmAndAddValidUsers} className={styles.submitButton}>
                      تایید و وارد کردن کاربران معتبر
                    </button>
                  </div>
                )}


              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
