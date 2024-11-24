'use client'

import { useState } from 'react'
import styles from './AboutUs.module.css'

export default function AboutUsPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact our friendly team</h1>
      <p className={styles.subtitle}>Let us know how we can help.</p>

      {/* کارت‌ها */}
      <div className={styles.cards}>
        {[
          {
            title: 'Chat to sales',
            description: 'Speak to our friendly team.',
            link: 'sales@untitledui.com',
          },
          {
            title: 'Chat to support',
            description: 'We’re here to help.',
            link: 'support@untitledui.com',
          },
          { title: 'Visit us', description: 'Visit our office HQ.', link: 'View on Google Maps' },
          { title: 'Call us', description: 'Mon-Fri from 8am to 5pm.', link: '+1 555 000-0000' },
        ].map((card, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardDescription}>{card.description}</p>
            <a href="#" className={styles.cardLink}>
              {card.link}
            </a>
          </div>
        ))}
      </div>

      {/* سوالات متداول */}
      <h2 className={styles.faqTitle}>Frequently asked questions</h2>
      <div className={styles.faqs}>
        {[
          {
            question: 'Is there a free trial available?',
            answer:
              'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free 30-minute onboarding call to get you up and running.',
          },
          {
            question: 'Can I change my plan later?',
            answer: 'Yes, you can upgrade or downgrade your plan anytime.',
          },
          {
            question: 'What is your cancellation policy?',
            answer: 'You can cancel anytime without any penalties.',
          },
          {
            question: 'Can other info be added to an invoice?',
            answer:
              'Yes, you can include custom notes and additional information in your invoices.',
          },
          {
            question: 'How does billing work?',
            answer: 'We bill you monthly based on your chosen plan.',
          },
          {
            question: 'How do I change my account email?',
            answer: 'You can update your email in your account settings.',
          },
          {
            question: 'How does support work?',
            answer: 'Our support team is available 24/7 to assist you.',
          },
          {
            question: 'Do you provide tutorials?',
            answer: 'Yes, we offer a range of tutorials to help you get started.',
          },
        ].map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
          >
            <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={styles.icon}>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
