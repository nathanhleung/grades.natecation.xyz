import { DONORS } from "../constants"

export default function Shoutouts() {
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-12 md:p-16 pb-0 sm:pb-0 md:pb-0 md:max-w-[85%] lg:max-w-[60%] md:mx-auto">
                <h1 className="text-4xl text-center mb-6 text-black font-bold">Shoutouts</h1>
                <div className="text-justify">
                    <p>
                        Thank you to the following individuals who contributed funds in order to get these grade distributions:
                    </p>
                    <div className="bg-uclaGold p-12 my-8 grid grid-cols-3 gap-3">
                        {DONORS.map(donor => {
                            return (
                                <div key={donor}>
                                    <p>{donor}</p>
                                </div>
                            )
                        })}
                    </div>
                    <p>
                        If your name is in the list above and you'd like a link added to your name, please contact me.
                    </p>
                </div>
            </div>
        </main>
    )
}