'use client';

import React, { useState } from 'react';
import { updateMenuItem, deleteMenuItem } from '@/actions/admin/menu';
import styles from '@/components/admin/menu/MenuTable.module.css';
import { useRouter } from 'next/navigation';

export default function MenuTable({ menuItems }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeParentMenuId, setActiveParentMenuId] = useState(null);
  const router = useRouter();

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title,
      link: item.link,
      order: item.order,
      isActive: item.isActive,
    });
  };

  const saveChanges = async (id) => {
    const updatedItem = await updateMenuItem(id, formData);
    if (activeSubMenu) {
      const updatedSubMenu = activeSubMenu.map((subMenu) =>
        subMenu.id === id ? updatedItem : subMenu
      );
      setActiveSubMenu(updatedSubMenu);
    }
    setEditingItemId(null);
  };

  const removeItem = async (id) => {
    await deleteMenuItem(id);
    if (activeSubMenu) {
      const updatedSubMenu = activeSubMenu.filter((subMenu) => subMenu.id !== id);
      setActiveSubMenu(updatedSubMenu);
    } else {
      router.refresh();
    }
  };

  const moveItem = async (item, direction) => {
    const isUp = direction === 'up';
    const targetOrder = isUp ? item.order - 1 : item.order + 1;

    const siblings = activeSubMenu || menuItems;

    const targetItem = siblings.find((sibling) => sibling.order === targetOrder);

    if (targetItem) {
      await updateMenuItem(item.id, { order: targetOrder });
      await updateMenuItem(targetItem.id, { order: item.order });

      const updatedSiblings = siblings.map((sibling) => {
        if (sibling.id === item.id) return { ...sibling, order: targetOrder };
        if (sibling.id === targetItem.id) return { ...sibling, order: item.order };
        return sibling;
      });

      if (activeSubMenu) {
        setActiveSubMenu(updatedSiblings.sort((a, b) => a.order - b.order));
      }
      router.refresh();
    }
  };

  const openSubMenu = (subMenus, parentMenuId) => {
    setActiveSubMenu(subMenus.sort((a, b) => a.order - b.order));
    setActiveParentMenuId(parentMenuId);
    router.refresh();
  };

  const closeSubMenu = () => {
    setActiveSubMenu(null);
    setActiveParentMenuId(null);
    router.refresh();
  };

  const renderMenuRow = (item, isSubMenu = false) => (
    <div key={item.id} className={`${styles.row} ${isSubMenu ? styles.subMenuRow : ''}`}>
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
          item.link || '-'
        )}
      </div>
      <div className={styles.cell}>
        <button
          onClick={() => moveItem(item, 'up')}
          className={styles.button}
          disabled={item.order === 0}
        >
          △
        </button>
        <button
          onClick={() => moveItem(item, 'down')}
          className={styles.button}
        >
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
        {!isSubMenu && item.subMenus.length > 0 && (
          <button
            onClick={() => openSubMenu(item.subMenus, item.id)}
            className={styles.button}
          >
            زیرمنو
          </button>
        )}
      </div>
    </div>
  );

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
        {menuItems.map((item) => renderMenuRow(item))}
      </div>

      {activeSubMenu && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeSubMenu}>
              ✕
            </button>
            <div className={styles.subMenuContainer}>
              {activeSubMenu.map((subItem) => renderMenuRow(subItem, true))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
