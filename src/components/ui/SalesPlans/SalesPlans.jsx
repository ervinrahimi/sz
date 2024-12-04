'use client'

import React, { useState, useEffect, useTransition } from 'react'
import styles from './SalesPlans.module.css'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { getSalesConditions } from '@/actions/admin/sales-conditions'
import { getSalesFestivals } from '@/actions/admin/salesFestivals' // واکشی لیست SalesFestival
import { WideLightPoster } from '../Posters/Posters'

export default function SalesPlans() {
  const [salesConditions, setSalesConditions] = useState([])
  const [salesFestivals, setSalesFestivals] = useState([]) // لیست فیلترها
  const [loading, startTransition] = useTransition()
  const [filter, setFilter] = useState(null)
  const [activeButton, setActiveButton] = useState(null) // وضعیت دکمه فعال

  // تعیین رنگ‌ها بر اساس نام
  const getColors = (name) => {
    switch (name) {
      case 'پرایم':
        return { bg: '#ffd8e0', color: '#ff2250', indicator: '#49ff0a' } // زرد
      case 'پرستیژ':
        return { bg: '#f6dfff', color: '#bc12ff', indicator: '#49ff0a' } // بنفش
      case 'اولتیمیت':
        return { bg: '#dcffea', color: '#2ea45d', indicator: '#49ff0a' } // آبی
      default:
        return { bg: '#e0e3ff', color: '#0f21cf', indicator: '#49ff0a' } // پیش‌فرض
    }
  }

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

  // مدیریت فعال‌سازی دکمه‌ها
  const handleFilterClick = (festivalName) => {
    setFilter(festivalName)
    setActiveButton(festivalName)
  }

  return (
    <>
      <div className={styles.filterButtons}>
        <div
          className={styles.filterButtonWrapper}
          style={{
            '--active-bg': getColors('all').bg,
            '--active-color': getColors('all').color,
            '--indicator-color': getColors('all').indicator,
          }}
        >
          <button
            className={`${styles.filterButton} ${activeButton === null ? styles.active : ''}`}
            onClick={() => handleFilterClick(null)}
          >
            نمایش همه
          </button>
          {activeButton === null && <div className={styles.activeIndicator} />}
        </div>
        {salesFestivals.map((festival) => {
          const { bg, color, indicator } = getColors(festival.name)
          return (
            <div
              key={festival.id}
              className={styles.filterButtonWrapper}
              style={{
                '--active-bg': bg,
                '--active-color': color,
                '--indicator-color': indicator,
              }}
            >
              <button
                className={`${styles.filterButton} ${
                  activeButton === festival.name ? styles.active : ''
                }`}
                onClick={() => handleFilterClick(festival.name)}
              >
                {festival.name}
              </button>
              {activeButton === festival.name && <div className={styles.activeIndicator} />}
            </div>
          )
        })}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingDot}></div>
            <span className={styles.loadingText}>در حال بارگذاری</span>
          </div>
        </div>
      ) : (
        <>
          {salesConditions.length === 0 && (
            <div className={styles.errorItemContainer}>
              <p className={styles.errorItemText}>هیچ آیتمی موجود نیست</p>
            </div>
          )}
          {salesConditions.length > 0 && (
            <div className={styles.saleConditions}>
              {salesConditions.map((condition) => {
                const { bg, color } = getColors(condition.salesFestival)
                return (
                  <div
                    key={condition.id}
                    className={styles.salesCondition}
                    style={{
                      '--festival-bg': bg,
                      '--festival-color': color,
                    }}
                  >
                    <div className={styles.salesFestival}>
                      <p>{condition.salesFestival}</p>
                    </div>

                    {condition.carImage[0] && (
                      <Image
                        className={styles.salesConditionImage}
                        src={condition.carImage[0]}
                        width={1000}
                        height={1000}
                        alt={'car-image'}
                      />
                    )}

                    <div className={styles.salesConditionDescription}>
                      <h2>{condition.carName}</h2>
                      <p>{condition.name}</p>
                      <p>{condition.description}</p>
                    </div>

                    <div className={styles.salesConditionButtons}>
                      <button onClick={() => handleViewDetails(condition.carId)}>شرایط فروش</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}
