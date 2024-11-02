// src/app/admin/card-box-sections/page.jsx

import prisma from '@/db/client'
import CardBoxSectionsList from '@/components/admin/cardBoxSections/CardBoxSectionsList'

export default async function CardBoxSectionsPage() {
  const sections = await prisma.cardBoxSection.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div>
      <h1>مدیریت بخش‌های کارت باکس</h1>
      <CardBoxSectionsList sections={sections} />
    </div>
  )
}
