// صفحه اصلی حساب کاربری
import React from 'react';
import PersonalInfo from '@/components/account/PersonalInfo';
import OrderHistory from '@/components/account/OrderHistory';
import Notifications from '@/components/account/Notifications';
import { auth } from '@/security/auth'
import PaymentManagement from '@/components/account/PaymentManagement';

export default async function AccountPage() {
  const session = await auth()
  return (
    <div>
      <h1>حساب کاربری</h1>
      <PersonalInfo user={session.user} />
      <OrderHistory user={session.user}/>
      <Notifications user={session.user}/>
      <PaymentManagement user={session.user} />
    </div>
  );
}
