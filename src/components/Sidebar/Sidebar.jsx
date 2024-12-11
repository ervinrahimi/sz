import React, { useState, useEffect } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './Sidebar.module.css'

const components = [
  { id: 'section', icon: '⚏', label: 'بخش', category: 'چیدمان' },
  { id: 'text', icon: 'T', label: 'متن', category: 'چیدمان' },
  { id: 'input', icon: '⌨', label: 'فیلد ورودی', category: 'فیلدهای ورودی متنی' },
  { id: 'paragraph', icon: '¶', label: 'پاراگراف', category: 'فیلدهای ورودی متنی' },
  { id: 'email', icon: '✉', label: 'ایمیل', category: 'فیلدهای ویژه' },
  { id: 'password', icon: '🔒', label: 'رمز عبور', category: 'فیلدهای ویژه' },
  { id: 'phone', icon: '📞', label: 'شماره تلفن', category: 'فیلدهای عددی' },
  { id: 'number', icon: '#', label: 'ورودی عددی', category: 'فیلدهای عددی' },
]

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredComponents, setFilteredComponents] = useState(components)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = searchTerm
        ? components.filter(component =>
            component.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : components;
      setFilteredComponents(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.search}>
        <input 
          type="text" 
          placeholder="جستجوی المان‌ها" 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            setIsLoading(true);
          }}
        />
        {searchTerm && isLoading && <div className={styles.loadingAnimation}></div>}
      </div>
      
      <Droppable droppableId="components" isDropDisabled={true}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.componentList}
          >
            {filteredComponents.map((component, index) => (
              <Draggable 
                key={component.id} 
                draggableId={component.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.component}
                  >
                    <span className={styles.icon}>{component.icon}</span>
                    <span className={styles.label}>{component.label}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

