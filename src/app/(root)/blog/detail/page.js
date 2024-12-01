import ArticleDetail from '@/components/ui/blog/article-detail/ArticleDetail'
import { auth } from '@/security/auth'
import React from 'react'

export default async function page() {
  const session = await auth()
  return <ArticleDetail user={session?.user} />
}
