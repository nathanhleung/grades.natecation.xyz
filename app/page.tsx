import { About } from './components/About'
import { Search } from './components/Search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 md:max-w-[75%] md:mx-auto">
      <div className="flex flex-col text-center">
        <h1 className="text-4xl mb-2"><a href="/">grades.natecation.xyz</a></h1>
        <h2 className="text-lg text-gray-500">Fall 2021, Winter 2022, Spring 2022, and Summer 2022 UCLA Grade Distributions</h2>
      </div>

      <div className="relative flex place-items-center my-12">
        <Search />
      </div>

      <div className="flex flex-col text-center">
        <About />
      </div>
    </main >
  )
}
