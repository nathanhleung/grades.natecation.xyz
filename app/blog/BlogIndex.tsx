"use client";

import { format } from 'date-fns';
import Link from "next/link";
import { getSortedPostsData } from "./getSortedPostsData";

type BlogIndexProps = {
  allPostsData: Awaited<ReturnType<typeof getSortedPostsData>>;
}

const BlogIndex = ({ allPostsData }: BlogIndexProps) => {
  return (
    <div>
      {allPostsData.map(post => (
        <Link href={post.path} key={post.path}>
          <div className="hover:opacity-50">
            <p className="mb-2">{format(new Date(post.date), 'PP')}</p>
            <h2 className="text-2xl font-bold mb-2">
              {post.title}
            </h2>
            <p>
              {post.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export { BlogIndex };
