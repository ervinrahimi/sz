'use client'

import React, { useState } from 'react'
import { updateMenuItem, deleteMenuItem } from '@/actions/admin/menu'
import styles from '@/components/admin/menu/MenuTable.module.css' // استایل‌ها از فایل UsersTable.module.css

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
          <div key={subMenu.id} className={styles.row}>
            <div className={styles.cell}>
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
            </div>
            <div className={styles.cell}>
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
            </div>
            <div className={styles.cell}>
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
            </div>
            <div className={styles.cell}>{subMenu.isActive ? 'فعال' : 'غیرفعال'}</div>
            <div className={styles.cell}>
              {editingItemId === subMenu.id ? (
                <button onClick={() => saveChanges(subMenu.id)} className={styles.button}>
                  ذخیره
                </button>
              ) : (
                <button onClick={() => startEditing(subMenu)} className={styles.button}>
                  ویرایش
                </button>
              )}
              <button onClick={() => removeItem(subMenu.id)} className={styles.button}>
                حذف
              </button>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>عنوان</div>
        <div className={styles.headerCell}>لینک</div>
        <div className={styles.headerCell}>ترتیب</div>
        <div className={styles.headerCell}>فعال</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <div className={styles.row}>
              <div className={styles.cell}>
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
              </div>
              <div className={styles.cell}>
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
              </div>
              <div className={styles.cell}>
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
              </div>
              <div className={styles.cell}>{item.isActive ? 'فعال' : 'غیرفعال'}</div>
              <div className={styles.cell}>
                {editingItemId === item.id ? (
                  <button onClick={() => saveChanges(item.id)} className={styles.button}>
                    ذخیره
                  </button>
                ) : (
                  <button onClick={() => startEditing(item)} className={styles.button}>
                    ویرایش
                  </button>
                )}
                <button onClick={() => removeItem(item.id)} className={styles.button}>
                  حذف
                </button>
              </div>
            </div>

            {renderSubMenus(item.subMenus)}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
