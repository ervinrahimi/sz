'use server'

import { signOut } from '@/security/auth'

export const logout = async () => {
  await signOut()
}
