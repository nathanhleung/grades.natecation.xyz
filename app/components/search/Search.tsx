"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SubjectAreaQueryResults } from "./SubjectAreaQueryResults";

/**
 * Gets a list of courses from the backend
 * 
 * @returns a list of courses is JSON format
 */
async function getCourses() {
    const res = await fetch('/api/courses');
    const json = await res.json();
    return json;
}

type SubjectAreaSearchProps = {
    selectedSubjectArea: string;
    onSelectSubjectArea(subjectArea: string): void;
    courses: any;
}

const Search = () => {
    const [query, setQuery] = useState('');
    const [courses, setCourses] = useState<any>({});
    const [selectedSubjectArea, setSelectedSubjectArea] = useState('');
    const searching = (
        (query !== '') &&
        (selectedSubjectArea === '')
    );
    const queryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getCourses().then(setCourses);
    }, []);

    return (
        <div
            className="flex flex-col align-center justify-center"
        >
            <h1 className="text-2xl lg:text-3xl mb-6 text-center">
                I want grade distributions for classes in the
            </h1>
            <div className="flex gap-2">
                <input
                    className="flex-1 p-4 mb-6 outline-none text-center text-2xl text-black shadow-lg dark:shadow-gray-700 disabled:bg-white"
                    type="text"
                    ref={queryInputRef}
                    onChange={(e) => {
                        if (selectedSubjectArea === "") {
                            setQuery(e.target.value)
                        }
                    }}
                    placeholder="Search by department"
                    autoFocus
                    value={selectedSubjectArea || query}
                    onClick={() => {
                        if (selectedSubjectArea !== "") {
                            setSelectedSubjectArea("");
                            setQuery(selectedSubjectArea);
                        }
                    }}
                />
            </div>
            {searching ? (
                <SubjectAreaQueryResults
                    courses={courses}
                    query={query}
                    resetQuery={() => {
                        setQuery('');
                        queryInputRef.current?.focus();
                    }}
                    onSelectSubjectArea={setSelectedSubjectArea}
                />
            ) : (
                <h1 className="text-2xl lg:text-3xl text-center">department</h1>
            )}
        </div >
    );

    // return (
    //     <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(var(--background-start-rgb))] overflow-scroll">
    //         <div className="flex flex-col w-[75%] mx-auto p-20">
    //             <h1 className="text-2xl my-4">Select a class in the {selectedSubjectArea} department:</h1>
    //             <div className="grid grid-cols-3 grid-flow-row gap-4">
    //                 {courses[selectedSubjectArea].sort((number1: string, number2: string) => {
    //                     const onlyNumeric1 = parseInt(number1.replace(/\D/g, ''), 10);
    //                     const onlyNumeric2 = parseInt(number2.replace(/\D/g, ''), 10);
    //                     return onlyNumeric1 - onlyNumeric2;
    //                 }).map((catalogNumber: string) => (
    //                     <div key={catalogNumber}>
    //                         <a href={`/${encodeURIComponent(selectedSubjectArea)}/${encodeURIComponent(catalogNumber)}`}>
    //                             <div className="p-4 rounded bg-[rgb(var(--foreground-rgb))] hover:opacity-50">
    //                                 <p className="text-[rgb(var(--background-start-rgb))] text-2xl">
    //                                     {selectedSubjectArea} {catalogNumber}
    //                                 </p>
    //                             </div>
    //                         </a>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )
}

export { Search };