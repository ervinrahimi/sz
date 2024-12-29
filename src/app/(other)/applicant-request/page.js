import { getMenuItems } from '@/actions/admin/menu'
import ApplicantRequestForm from '@/components/forms/applicant-request-form/ApplicantRequestForm'
import ConditionalHeader from '@/components/layout/Header/ConditionalHeader'
import SecondaryFooter from '@/components/layout/tfooter/secondary-footer'
import Subscribe from '@/components/ui/tblog/Subscribe'
import { auth } from '@/security/auth'
import React from 'react'
import Footer from 'react-multi-date-picker/plugins/range_picker_footer'

export default async function ApplicantRequestPage() {
  const menuItems = await getMenuItems()
  const session = await auth()
  return (
    <div>
      <ConditionalHeader menuItems={menuItems} user={session?.user} />
      <ApplicantRequestForm />
      <Subscribe />
      <Footer />
      <SecondaryFooter />
    </div>
  )
}
