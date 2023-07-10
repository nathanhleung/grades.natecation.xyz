import { Search } from "./components/search";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="flex flex-col text-center justify-center p-6 sm:p-12 md:p-16 md:w-[85%] lg:w-[60%] md:mx-auto">
        <h1 className="text-4xl mb-4 text-uclaDarkerBlue hover:opacity-50 font-bold">
          <a href="/">UCLA Grade Distributions</a>
        </h1>
        <h2 className="text-lg text-gray-400">
          Data from Fall 2021, Winter 2022, Spring 2022, and Summer 2022,
          brought to you by{" "}
          <a href="/shoutouts" className="text-uclaBlue hover:opacity-50">
            40+ UCLA students
          </a>
        </h2>
      </div>

      <div className="w-full h-auto flex flex-1 justify-center p-6 sm:p-8 md:p-12 text-white bg-uclaBlue">
        <div className="flex md:w-[65%] lg:w-[60%] xl:w-[50%] md:mx-auto items-center">
          <Search />
        </div>
      </div>
    </main>
  );
}
