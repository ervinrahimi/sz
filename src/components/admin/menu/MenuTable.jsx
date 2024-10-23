'use client'

import React, { useState } from 'react'
import { updateMenuItem, deleteMenuItem } from '@/actions/admin/menu'
import styles from '@/components/admin/menu/MenuTable.module.css'
import { useRouter } from 'next/navigation'

export default function MenuTable({ menuItems }) {
  const [editingItemId, setEditingItemId] = useState(null)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const startEditing = (item) => {
    setEditingItemId(item.id)
    setFormData({
      title: item.title,
      link: item.link,
      order: item.order,
      isActive: item.isActive,
    })
  }

  const moveUp = async (item) => {
    if (item.order > 0) {
      item.order -= 1
      const oldItem = menuItems[item.order]
      await updateMenuItem(item.id, item)
      oldItem.order += 1
      await updateMenuItem(oldItem.id, oldItem)

      router.refresh()
    }
  }

  const moveDown = async (item) => {
    if (item.order + 1 < menuItems.length) {
      item.order += 1
      const oldItem = menuItems[item.order]
      await updateMenuItem(item.id, item)
      oldItem.order -= 1
      await updateMenuItem(oldItem.id, oldItem)

      router.refresh()
    }
  }

  const saveChanges = async (id) => {
    await updateMenuItem(id, formData)
    setEditingItemId(null)
    router.refresh()
  }

  const removeItem = async (id) => {
    await deleteMenuItem(id)
    router.refresh()
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
            <div className={styles.cell}>
              {editingItemId === subMenu.id ? (
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className={styles.formInput}
                />
              ) : (
                subMenu.isActive ? 'فعال' : 'غیرفعال'
              )}
            </div>
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
              <div className={`${styles.cell} ${styles.ltr}`}>
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
                <button onClick={() => moveUp(item)} className={styles.button}>
                  △
                </button>
                <button onClick={() => moveDown(item)} className={styles.button}>
                  ▽
                </button>
              </div>
              <div className={styles.cell}>
                {editingItemId === item.id ? (
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className={styles.formInput}
                  />
                ) : (
                  item.isActive ? 'فعال' : 'غیرفعال'
                )}
              </div>
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
