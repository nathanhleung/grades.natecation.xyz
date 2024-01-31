import { readFileSync } from "fs";
import { readdir } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

const blogDir = path.resolve(process.cwd(), 'app', 'blog');

// Based on https://nextjs.org/learn-pages-router/basics/data-fetching/blog-data
async function getSortedPostsData() {
  // Get file names under /posts
  const files = await readdir(blogDir, { withFileTypes: true });
  const directories = files
    .filter(file => file.isDirectory())
    .map(file => file.name);

  const allPostsData = directories.map((directoryName) => {
    // Read markdown file as string
    const fullPath = path.join(
      blogDir, directoryName, 'page.mdx'
    );
    const fileContents = readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);


    return {
      path: `/blog/${directoryName}`,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export { getSortedPostsData };