'use client'
import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Sidebar from '../Sidebar/Sidebar'
import Canvas from '../Canvas/Canvas'
import Properties from '../Properties/Properties'
import Header from '../Header/Header'
import styles from './FormBuilder.module.css'
import { useForm } from 'react-hook-form'

export default function FormBuilder() {
  const [fields, setFields] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const { reset } = useForm()
  const [formSettings, setFormSettings] = useState({
    formTitle: 'فرم بدون عنوان',
    showLabels: true,
    submitButtonColor: '#6366f1',
    submitButtonText: 'ارسال'
  })
  const [showSettings, setShowSettings] = useState(false)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    if (result.source.droppableId === 'components' && result.destination.droppableId === 'canvas') {
      const newField = {
        id: `field-${Date.now()}`,
        type: result.draggableId,
        label: result.draggableId.charAt(0).toUpperCase() + result.draggableId.slice(1),
        placeholder: `${result.draggableId} را وارد کنید`
      }
      setFields([...fields, newField])
    } else if (result.source.droppableId === 'canvas' && result.destination.droppableId === 'canvas') {
      const items = Array.from(fields);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setFields(items);
    }
  }

  const handleFieldDelete = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId))
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null)
    }
  }

  const handleFieldUpdate = (updatedField) => {
    setFields(fields.map(f => 
      f.id === updatedField.id ? updatedField : f
    ))
    setSelectedField(updatedField)
    setShowSettings(false)
    reset(updatedField)
  }

  const handleSettingsChange = (newSettings) => {
    setFormSettings(newSettings)
    setShowSettings(false)
  }

  const handleSettingsClick = () => {
    setShowSettings(true)
    setSelectedField(null)
  }

  return (
    <div className={styles.container}>
      <Header 
        formTitle={formSettings.formTitle}
        onSettingsClick={handleSettingsClick}
      />
      <div className={styles.content}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Sidebar />
          <Canvas 
            fields={fields} 
            onFieldSelect={setSelectedField}
            onFieldDelete={handleFieldDelete}
            onFieldsReorder={setFields}
            showLabels={formSettings.showLabels}
            submitButtonColor={formSettings.submitButtonColor}
            submitButtonText={formSettings.submitButtonText}
            formTitle={formSettings.formTitle}
          />
          <Properties 
            selectedField={selectedField}
            formSettings={formSettings}
            onFieldUpdate={handleFieldUpdate}
            onSettingsUpdate={handleSettingsChange}
            showSettings={showSettings}
          />
        </DragDropContext>
      </div>
    </div>
  )
}

