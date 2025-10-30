"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetBlogs from "@/hooks/useGetBlogs";
import Image from "next/image";
import React, { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

const Home = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const { data: blogs, isPending } = useGetBlogs({
    page,
    take: 3,
    search: debounceSearch,
  });
  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {/* Jumbotron */}
      <div className="container mx-auto flex h-[20vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-5xl font-bold">The BlogHub</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          similique tempora molestias.
        </p>
        <Input
          className="max-w-lg"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* bloglist */}
      <div className="container mx-auto mt-12 space-y-4 px-4">
        {isPending && (
          <div className="flex h-[30vh] items-center justify-center">
            <p>Loading...</p>
          </div>
        )}

        {!isPending && !blogs?.data.length && (
          <div className="flex h-[30vh] items-center justify-center">
            <p>Blog not found!</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {blogs?.data.map((blog) => {
            return (
              <div key={blog.id} className="rounded-xl border border-black p-6">
                <Image
                  className="rounded-lg"
                  src={blog.thumbnail}
                  width={500}
                  height={300}
                  alt="thumbnail"
                />
                <h2 className="text-lg font-bold">{blog.title}</h2>
                <p className="line-clamp-3">{blog.description}</p>
              </div>
            );
          })}
        </div>

        {!!blogs?.meta && (
          <PaginationSection meta={blogs?.meta} onChangePage={onChangePage} />
        )}
      </div>
    </div>
  );
};

export default Home;
