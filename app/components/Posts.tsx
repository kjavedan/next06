import { getSortedPostsData } from "@/lib/posts";
import React from "react";
import ListItem from "./ListItem";

export default function Posts() {
  const blogPosts = getSortedPostsData();

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
      <ul className="w-full">
        {blogPosts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
