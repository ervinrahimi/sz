import Image from 'next/image'
import React from 'react'

export default function Farayand() {
  return (
    <div className={styles.container}>
      <Image
        onClick={() => handleCarLink(carName)}
        src={`/${carName}.jpg`}
        width={800}
        height={800}
        alt={`${carName}`}
      />
      <h2>مراحل خرید خودروی {carName}</h2>
      <p>برای راهنمایی و مشاوره، با ما در ارتباط باشید</p>
      <Farayand />
    </div>
  )
}
