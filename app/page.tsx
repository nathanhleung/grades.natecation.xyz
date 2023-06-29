import { About } from './components/About'
import { Search } from './components/search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 sm:p-12 md:p-24 md:max-w-[85%] lg:max-w-[60%] md:mx-auto justify-between">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl mb-2 text-blue-400 dark:text-blue-800 hover:opacity-50"><a href="/">grades.natecation.xyz</a></h1>
        <h2 className="text-lg text-gray-400 dark:text-gray-700">Fall 2021, Winter 2022, Spring 2022, and Summer 2022 UCLA Grade Distributions</h2>
      </div>

      <div className="flex justify-center my-12">
        <Search />
      </div>

      <div className="flex flex-col text-center">
        <About />
      </div>
    </main >
  )
}
