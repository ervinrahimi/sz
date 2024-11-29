'use client'

import React, { useState, useEffect, useTransition } from 'react'
import styles from './SalesPlans.module.css'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { getSalesConditions } from '@/actions/admin/sales-conditions'
import { getSalesFestivals } from '@/actions/admin/salesFestivals' // واکشی لیست SalesFestival

export default function SalesPlans() {
  const [salesConditions, setSalesConditions] = useState([])
  const [salesFestivals, setSalesFestivals] = useState([]) // لیست فیلترها
  const [loading, startTransition] = useTransition()
  const [filter, setFilter] = useState(null)

  // واکشی لیست SalesFestival
  const fetchSalesFestivals = async () => {
    try {
      const data = await getSalesFestivals()
      setSalesFestivals(data)
    } catch (error) {
      toast.error('خطا در واکشی لیست فیلترها')
    }
  }

  // واکشی شرایط فروش
  const fetchData = async (filter) => {
    try {
      setSalesConditions([]) // پاک‌سازی داده‌های قبلی
      const data = await getSalesConditions(filter)
      setSalesConditions(data)
    } catch (error) {
      toast.error('خطا در واکشی اطلاعات شرایط فروش')
    }
  }

  // واکشی اولیه لیست فیلترها و شرایط فروش
  useEffect(() => {
    fetchSalesFestivals()
    startTransition(() => {
      fetchData(null)
    })
  }, [])

  // واکشی داده‌ها هنگام تغییر فیلتر
  useEffect(() => {
    startTransition(() => {
      fetchData(filter)
    })
  }, [filter])

  // هدایت به صفحه جزئیات خودرو
  const handleViewDetails = (carId) => {
    window.location.href = `/cars/${carId}`
  }

  return (
    <>
      <Image
        className={styles.bannerContainer}
        alt=""
        src="/banner.jpg"
        width={1200}
        height={300}
      />
      <div className={styles.filterButtonContainer}>
        {salesFestivals.map((festival) => (
          <button key={festival.id} onClick={() => setFilter(festival.name)}>
            {festival.name}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>نمایش همه</button>
      </div>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <div className={styles.saleConditionsContainer}>
          {salesConditions.map((condition) => (
            <div key={condition.id} className={styles.salesConditionDetails}>
              <div className={styles.salesConditionContent}>
                <div className={styles.showSalesCondition}>
                  {condition.carImage[0] && (
                    <Image
                      className={styles.imageSalesCondition}
                      src={condition.carImage[0]}
                      alt={condition.name}
                      height={200}
                      width={600}
                    />
                  )}
                </div>
                <div className={styles.description}>
                  <h2>{condition.name}</h2>
                  <p>ماشین: {condition.carName}</p>
                  <p>شرایط فروش: {condition.salesFestival}</p>
                  <p>{condition.description}</p>
                </div>
                <div className={styles.salesConditionButton}>
                  <button onClick={() => handleViewDetails(condition.carId)}>شرایط فروش</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
