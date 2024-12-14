'use server'

import { posts } from '../components/ui/tblog/data/posts'

export async function getStaticPaths() {
  const paths = posts.map((post) => ({ params: { slug: post.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = posts.find((post) => post.slug === params.slug)
  return { props: { post } }
}