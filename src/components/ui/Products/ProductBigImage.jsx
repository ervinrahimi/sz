import React from 'react'
import styles from "./ProductBigImage.module.css"
import Image from 'next/image'
export default function ProductBigImage({address}) {
  return (
    <div className={styles.container}>
      <Image src={address} width={1500} height={1500} />
      <span></span>
    </div>
  )
}
