import React from 'react'
import styles from './AllPages.module.css'

export default function AllPages() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}></div>
        <div className={styles.leftright}>
          <div className={styles.right}></div>
          <div className={styles.lefts}>
            <div className={styles.leftone}></div>
            <div className={styles.lefttwo}></div>
          </div>
        </div>
        <div className={styles.bottom}></div>
        <div className={styles.end}></div>
      </div>
    </>
  )
}
