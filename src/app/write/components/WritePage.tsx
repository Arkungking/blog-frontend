"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/useCreateBlog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import TiptapRichtexteditor from "@/components/TiptapRichtextEditor";
import { createBlogSchema } from "../schema";

const WritePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const form = useForm<z.infer<typeof createBlogSchema>>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      author: "",
      category: "",
      content: "",
      description: "",
      thumbnail: undefined,
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createBlogSchema>) {
    await createBlog(values);
  }

  return (
    <main className="container mx-auto space-y-4 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapRichtexteditor
                    content={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  {selectedImage ? (
                    <div className="relative w-fit">
                      <Image
                        src={selectedImage}
                        alt="thumbnail"
                        width={300}
                        height={250}
                      />

                      <Button
                        className="absolute -top-2 -right-2 rounded-full"
                        size="icon"
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          setSelectedImage("");
                          form.resetField("thumbnail");
                          if (inputRef.current) {
                            inputRef.current.value = "";
                          }
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      ref={inputRef}
                      accept="image/*"
                      placeholder="Thumbnail"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          field.onChange(file);
                          setSelectedImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default WritePage;
