import { getBlog } from "@/api/get-blog";
import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetail = async (props: BlogDetailProps) => {
  const { slug } = await props.params;

  const blog = await getBlog(slug);

  return (
    <main className="container mx-auto p-4">
      <Badge>{blog.category}</Badge>
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="font-extralight">
        {format(new Date(blog.createdAt), "dd-MMMM-yyyy")} - {blog.user?.email}
      </p>
      <div className="relative mb-2 h-[360px] w-full">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          className="object-cover"
          fill
        />
      </div>

      <Markdown content={blog.content} />
    </main>
  );
};

export default BlogDetail;
