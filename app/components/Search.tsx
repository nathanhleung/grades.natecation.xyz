"use client";

import { useState, useEffect, useRef } from "react";

async function getCourses() {
    const res = await fetch('/api/courses');
    const json = await res.json();
    return json;
}

const Search = () => {
    const [subjectArea, setSubjectArea] = useState('');
    const [courses, setCourses] = useState<any>({});

    useEffect(() => {
        getCourses().then(setCourses);
    }, []);

    if (subjectArea === "") {
        return (
            <div className="flex flex-col text-center align-center justify-center">
                <h1 className="text-xl mb-4">I want grade distributions for classes in the</h1>
                <div className="flex gap-2">
                    <select
                        className="flex-1 p-4 rounded outline-none text-center text-2xl text-black"
                        value={subjectArea}
                        onChange={e => setSubjectArea(e.target.value)}
                        autoFocus>
                        {Object.keys(courses).map(subjectArea => (
                            <option value={subjectArea}>{subjectArea}</option>
                        ))}
                    </select>
                </div>
                <h1 className="text-xl mt-4">department</h1>
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(var(--background-start-rgb))] overflow-scroll">
            <div className="flex flex-col w-[75%] mx-auto p-20">
                <h1 className="text-2xl my-4">Select a class in the {subjectArea} department:</h1>
                <div className="grid grid-cols-3 grid-flow-row gap-4">
                    {courses[subjectArea].sort((number1, number2) => {
                        const onlyNumeric1 = parseInt(number1.replace(/\D/g, ''), 10);
                        const onlyNumeric2 = parseInt(number2.replace(/\D/g, ''), 10);
                        return onlyNumeric1 - onlyNumeric2;
                    }).map(catalogNumber => (
                        <div key={catalogNumber}>
                            <a href={`/${encodeURIComponent(subjectArea)}/${encodeURIComponent(catalogNumber)}`}>
                                <div className="p-4 rounded bg-[rgb(var(--foreground-rgb))] hover:opacity-50">
                                    <p className="text-[rgb(var(--background-start-rgb))] text-2xl">
                                        {subjectArea} {catalogNumber}
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

export { Search };