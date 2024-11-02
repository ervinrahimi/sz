// src/app/admin/card-box-sections/[id]/edit/page.jsx

import prisma from '@/db/client'
import CardBoxSectionForm from '@/components/admin/cardBoxSections/CardBoxSectionForm'

export default async function EditCardBoxSectionPage({ params }) {
  const section = await prisma.cardBoxSection.findUnique({
    where: { id: params.id },
  })

  if (!section) {
    return <div>بخش یافت نشد</div>
  }

  return (
    <div>
      <h1>ویرایش بخش</h1>
      <CardBoxSectionForm section={section} />
    </div>
  )
}
