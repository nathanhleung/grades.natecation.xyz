
import { BlogIndex } from "./BlogIndex";
import { getSortedPostsData } from "./getSortedPostsData";

export default async function Blog() {
  const allPostsData = await getSortedPostsData();

  return (
    <main className="flex flex-col w-full">
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-12 md:p-16 pb-0 sm:pb-0 md:pb-0 md:w-[85%] lg:w-[60%] md:mx-auto">
        <h1 className="text-4xl text-center mb-6 text-black font-bold">
          Blog
        </h1>
        <BlogIndex allPostsData={allPostsData} />
      </div>
    </main>
  );
};
