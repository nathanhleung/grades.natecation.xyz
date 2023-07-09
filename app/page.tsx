import { About } from './components/About'
import { Search } from './components/search'

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col text-center justify-center p-6 sm:p-12 md:p-16 md:max-w-[85%] lg:max-w-[60%] md:mx-auto">
        <h1 className="text-3xl mb-2 text-uclaDarkerBlue hover:opacity-50 font-bold"><a href="/">UCLA Grade Distributions</a></h1>
        <h2 className="text-lg text-gray-400">Data from Fall 2021, Winter 2022, Spring 2022, and Summer 2022</h2>
      </div>

      <div className="w-full flex flex-1 justify-center p-12 text-white bg-uclaBlue">
        <div className="flex md:max-w-[85%] lg:max-w-[60%] md:mx-auto items-center">
          <Search />
        </div>
      </div>
    </main >
  )
}
