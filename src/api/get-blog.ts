import { Blog } from "@/types/blog";
import { cache } from "react";

const url = process.env.NEXT_PUBLIC_BASE_URL_API2!;

export const getBlog = cache(async (slug: string) => {
  const response = await fetch(url + "/blogs/" + slug);
  const blog: Blog = await response.json();
  return blog;
});
