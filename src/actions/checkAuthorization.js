'use server';

// سرور اکشنی برای بررسی مجوز کاربر
import prisma from '@/db/client';

export async function checkAuthorization(conditionId, nationalCode) {
  const condition = await prisma.carSaleCondition.findUnique({
    where: { id: conditionId },
    include: { authorizedUsers: true },
  });

  if (condition.isLocked) {
    // بررسی وجود کد ملی در لیست مجاز
    const isAuthorized = condition.authorizedUsers.some((user) => user.nationalCode === nationalCode);
    return isAuthorized;
  } else {
    // شرایط فروش عمومی است
    return true;
  }
}
