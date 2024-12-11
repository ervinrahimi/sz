import BestBlog from "@/components/ui/tblog/BestBlog";
import BlogSlider from "@/components/ui/tblog/BlogSlider";
import FeaturedBlog from "@/components/ui/tblog/FeaturedBlog";
import NewsBlog from "@/components/ui/tblog/NewsBlog";
import Subscribe from "@/components/ui/tblog/Subscribe";

export default function BlogPage() {
  return (
    <main>
      <BlogSlider />
      <NewsBlog />
      <BestBlog />
      <FeaturedBlog />
    </main>
  )
}
