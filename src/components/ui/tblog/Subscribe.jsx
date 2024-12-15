'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import './Subscribe.css'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = async () => {
    if (!email) {
      toast.error('لطفاً ایمیل خود را وارد کنید!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('ایمیل با موفقیت ارسال شد!')
        setEmail('')
      } else {
        toast.error(result.error || 'خطا در ارسال ایمیل')
      }
    } catch (error) {
      toast.error('خطا در برقراری ارتباط با سرور')
    } finally {
      setLoading(false)
    }
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

        <form onSubmit={handleNewsletterSubmit} className="subscribe__form">
          <div className="subscribe__input-group">
            <label htmlFor="email" className="subscribe__label">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="subscribe__input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={handleNewsletterSubmit} disabled={loading} className="subscribe__button">
            {loading ? 'در حال ارسال...' : 'عضویت'}
          </button>
        </form>
      </div>
    </section>
  )
}

