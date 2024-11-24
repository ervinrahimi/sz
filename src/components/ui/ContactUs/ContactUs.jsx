'use client'

import styles from './ContactUs.module.css'

export default function ContactSupportPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact & support</h1>
      <p className={styles.subtitle}>
        Have questions about pricing, plans, or Untitled UI? Fill out the form and our friendly team
        can get back to you within 24 hours.
      </p>

      <div className={styles.content}>
        {/* فرم تماس */}
        <div className={styles.contactForm}>
          <h2>Contact our sales team</h2>
          <form className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={styles.input}
              />
              <input type="text" name="lastName" placeholder="Last name" className={styles.input} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              className={styles.input}
            />
            <input
              type="tel"
              name="phone"
              placeholder="AU +61 400 000 000"
              className={styles.input}
            />
            <select name="teamSize" className={styles.select}>
              <option value="">Team size</option>
              <option value="1-50">1-50 people</option>
              <option value="51-200">51-200 people</option>
              <option value="201+">201+ people</option>
            </select>
            <select name="location" className={styles.select}>
              <option value="">Location</option>
              <option value="Australia">Australia</option>
              <option value="USA">USA</option>
              <option value="Europe">Europe</option>
            </select>
            <textarea
              name="message"
              placeholder="Leave us a message..."
              className={styles.textarea}
            ></textarea>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" value="Mail" />
                Untitled Mail
              </label>
              <label>
                <input type="checkbox" value="VPN" />
                Untitled VPN
              </label>
              <label>
                <input type="checkbox" value="Calendar" />
                Untitled Calendar
              </label>
              <label>
                <input type="checkbox" value="Workspace" />
                Untitled Workspace
              </label>
              <label>
                <input type="checkbox" value="Drive" />
                Untitled Drive
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send message
            </button>
          </form>
        </div>

        {/* اطلاعات پشتیبانی */}
        <div className={styles.supportInfo}>
          <h2>Chat to sales</h2>
          <p>Interested in switching? Speak to our friendly team.</p>
          <p>
            <a href="mailto:sales@untitledui.com">sales@untitledui.com</a>
          </p>

          <h2>Email support</h2>
          <p>Email us and we’ll get back to you within 24 hours.</p>
          <p>
            <a href="mailto:support@untitledui.com">support@untitledui.com</a>
          </p>

          <h2>Chat support</h2>
          <p>Chat to our staff 24/7 for instant access to support.</p>
          <p>
            <a href="#">
              Start live chat <span style={{ color: 'green' }}>• Online</span>
            </a>
          </p>

          <h2>Call us</h2>
          <p>Mon - Fri, 9:00 AM - 5:00 PM (UTC/GMT +10:00)</p>
          <p>
            <a href="tel:+61340209204">+61 3 4020 9204</a>
          </p>

          <h2>Melbourne</h2>
          <p>Visit our office Mon - Fri, 9:00 AM - 5:00 PM.</p>
          <p>
            90 Office Street
            <br />
            Fitzroy, VIC 3065 Australia
          </p>

          <h2>Sydney</h2>
          <p>Visit our office Mon - Fri, 9:00 AM - 5:00 PM.</p>
          <p>
            40 Bridge Street
            <br />
            Sydney, NSW 2000 Australia
          </p>
        </div>
      </div>
    </div>
  )
}
