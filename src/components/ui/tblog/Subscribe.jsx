'use client'

import { useState } from 'react'
import './Subscribe.css'

export default function Subscribe() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <section className="subscribe">
      <div className="subscribe__container">
        <div className="subscribe__content">
          <h2 className="subscribe__title">
            عضویت در خبرنامه
          </h2>
          <p className="subscribe__description">
            با عضویت در خبرنامه ما، از آخرین اخبار و مقالات دنیای خودرو مطلع شوید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="subscribe__form">
          <div className="subscribe__input-group">
            <label htmlFor="email" className="subscribe__label">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="subscribe__input"
              required
            />
          </div>
          <button type="submit" className="subscribe__button">
            عضویت
          </button>
        </form>
      </div>
    </section>
  )
}

