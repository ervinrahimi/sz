'use client'

import React, { useState } from 'react'
import { updateMenuItem, deleteMenuItem } from '@/actions/admin/menu'
import styles from '@/styles/form.module.css' // استایل‌ها از فایل form.module.css

export default function MenuTable({ menuItems }) {
  const [editingItemId, setEditingItemId] = useState(null)
  const [formData, setFormData] = useState({})

  const startEditing = (item) => {
    setEditingItemId(item.id)
    setFormData({
      title: item.title,
      link: item.link,
      order: item.order,
      isActive: item.isActive,
    })
  }

  const saveChanges = async (id) => {
    await updateMenuItem(id, formData)
    setEditingItemId(null)
    window.location.reload()
  }

  const removeItem = async (id) => {
    await deleteMenuItem(id)
    window.location.reload()
  }

  const renderSubMenus = (subMenus) => {
    return (
      <>
        {subMenus.map((subMenu) => (
          <tr key={subMenu.id} className={styles.tableRow}>
            <td>
              {editingItemId === subMenu.id ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.formInput}
                />
              ) : (
                `-- ${subMenu.title}`
              )}
            </td>
            <td>
              {editingItemId === subMenu.id ? (
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className={styles.formInput}
                />
              ) : (
                subMenu.link
              )}
            </td>
            <td>
              {editingItemId === subMenu.id ? (
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className={styles.formInput}
                />
              ) : (
                subMenu.order
              )}
            </td>
            <td>{subMenu.isActive ? 'فعال' : 'غیرفعال'}</td>
            <td>
              {editingItemId === subMenu.id ? (
                <button onClick={() => saveChanges(subMenu.id)} className={styles.formButton}>ذخیره</button>
              ) : (
                <button onClick={() => startEditing(subMenu)} className={styles.formButton}>ویرایش</button>
              )}
              <button onClick={() => removeItem(subMenu.id)} className={styles.formButton}>حذف</button>
            </td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>عنوان</th>
          <th>لینک</th>
          <th>ترتیب</th>
          <th>فعال</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <tr className={styles.tableRow}>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={styles.formInput}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className={styles.formInput}
                  />
                ) : (
                  item.link
                )}
              </td>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className={styles.formInput}
                  />
                ) : (
                  item.order
                )}
              </td>
              <td>{item.isActive ? 'فعال' : 'غیرفعال'}</td>
              <td>
                {editingItemId === item.id ? (
                  <button onClick={() => saveChanges(item.id)} className={styles.formButton}>ذخیره</button>
                ) : (
                  <button onClick={() => startEditing(item)} className={styles.formButton}>ویرایش</button>
                )}
                <button onClick={() => removeItem(item.id)} className={styles.formButton}>حذف</button>
              </td>
            </tr>

            {renderSubMenus(item.subMenus)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
