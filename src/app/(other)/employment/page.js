// app/job-application/page.js

import { getMenuItems } from '@/actions/admin/menu'
import JobApplicationForm from '@/components/forms/job-application-form/JobApplicationForm'
import ConditionalHeader from '@/components/layout/Header/ConditionalHeader'
import Footer from '@/components/layout/tfooter/footer'
import SecondaryFooter from '@/components/layout/tfooter/secondary-footer'
import Subscribe from '@/components/ui/tblog/Subscribe'
import { auth } from '@/security/auth'
import React from 'react'

export default async function EmploymentPage() {
  const menuItems = await getMenuItems()
  const session = await auth()
  return (
    <div>
      <ConditionalHeader menuItems={menuItems} user={session?.user} />
      <JobApplicationForm />
      <Subscribe />
      <Footer />
      <SecondaryFooter />
    </div>
  )
}
