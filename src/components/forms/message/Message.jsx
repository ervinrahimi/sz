import styles from './Message.module.css'

export function FormError({ message }) {
  if (!message) return null

  return (
    <div className={styles.formError}>
      <p>{message}</p>
    </div>
  )
}

export function FormSuccess({ message }) {
  if (!message) return null

  return (
    <div className={styles.formSuccess}>
      <p>{message}</p>
    </div>
  )
}

export function FormInfo({ message }) {
  if (!message) return null

  return (
    <div className={styles.formInfo}>
      <p>{message}</p>
    </div>
  )
}

export function FormWarning({ message }) {
  if (!message) return null

  return (
    <div className={styles.formWarning}>
      <p>{message}</p>
    </div>
  )
}
