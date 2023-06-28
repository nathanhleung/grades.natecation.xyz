// TODO(nathanhleung) fix type errors

export default function Department() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(var(--background-start-rgb))] overflow-scroll">
            <div className="flex flex-col w-[75%] mx-auto p-20">
                <h1 className="text-2xl my-4">Select a class in the {selectedSubjectArea} department:</h1>
                <div className="grid grid-cols-3 grid-flow-row gap-4">
                    {courses[selectedSubjectArea].sort((number1: string, number2: string) => {
                        const onlyNumeric1 = parseInt(number1.replace(/\D/g, ''), 10);
                        const onlyNumeric2 = parseInt(number2.replace(/\D/g, ''), 10);
                        return onlyNumeric1 - onlyNumeric2;
                    }).map((catalogNumber: string) => (
                        <div key={catalogNumber}>
                            <a href={`/${encodeURIComponent(selectedSubjectArea)}/${encodeURIComponent(catalogNumber)}`}>
                                <div className="p-4 rounded bg-[rgb(var(--foreground-rgb))] hover:opacity-50">
                                    <p className="text-[rgb(var(--background-start-rgb))] text-2xl">
                                        {selectedSubjectArea} {catalogNumber}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}