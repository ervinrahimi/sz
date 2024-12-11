'use client'

import styles from './newsletter.module.css'

export default function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup logic here
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>عضویت در خبرنامه سلطان زاده</h2>
        <p className={styles.description}>
          از آخرین مدل‌های خودرو و پیشنهادات ویژه ما مطلع شوید.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            عضویت
          </button>
        </form>
      </div>
    </div>
  )
}

