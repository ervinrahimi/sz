'use client'
import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FiTrash2, FiArrowDown } from 'react-icons/fi'
import styles from './Canvas.module.css'

export default function Canvas({ fields, onFieldSelect, onFieldDelete, onFieldsReorder, showLabels, submitButtonColor, submitButtonText, formTitle }) {
  const getFieldStyle = (field) => {
    if (field.type === 'paragraph') return {};
    return {
      textAlign: field.alignment || 'right'
    };
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.toolbar}>
        <h2 className={styles.formTitle}>{formTitle}</h2>
      </div>
      
      <Droppable droppableId="canvas">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.content}
          >
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.fieldWrapper}
                  >
                    <div 
                      className={styles.field}
                      onClick={() => onFieldSelect(field)}
                      style={getFieldStyle(field)}
                    >
                      <div className={styles.fieldActions}>
                        <button 
                          className={styles.deleteButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            onFieldDelete(field.id);
                          }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      {showLabels && <label className={styles.label}>{field.label}</label>}
                      {field.type === 'paragraph' ? (
                        <textarea
                          placeholder={field.placeholder}
                          className={styles.textarea}
                        />
                      ) : (
                        <input
                          type={field.type === 'password' ? 'password' : 'text'}
                          placeholder={field.placeholder}
                          className={styles.input}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {fields.length === 0 && (
              <div className={styles.dropZone}>
                <FiArrowDown size={24} />
                <p>لطفا فیلدها را اینجا بکشید و رها کنید</p>
              </div>
            )}
            {fields.length > 0 && (
              <div className={styles.submitButtonWrapper}>
                <button className={styles.submitButton} style={{ backgroundColor: submitButtonColor }}>
                  {submitButtonText}
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

