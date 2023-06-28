"use client";

import { useState, useEffect, useCallback } from "react";

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

/**
 * Gets the long name of a short `subjectArea` (e.g. "A&O SCI")
 * 
 * @param subjectArea the short subject area
 * @returns the long name for the subject area
 */
function getSubjectAreaLongName(subjectArea: string) {
    return {
        'A&O SCI': 'Atmospheric and Oceanic Sciences',
        'AF AMER': 'African American Studies',
        'AM IND': 'American Indian Studies',
        'MATH': 'Mathematics',
    }[subjectArea] ?? '';
}

/**
 * Given a query, returns a function which checks whether a
 * `subjectArea` (short form) could match the `query`.
 * 
 * TODO(nathanhleung): take into account edit distance?
 * 
 * @param query the search query
 * @returns a matcher function which accepts a `subjectArea` and
 *  returns whether the given query matches the subject area.
 */
function matchSubjectArea(query: string) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        return () => false;
    }

    return (subjectArea: string) => {
        return (
            subjectArea.toLowerCase().indexOf(normalizedQuery) !== -1 ||
            getSubjectAreaLongName(subjectArea).toLowerCase().indexOf(normalizedQuery) !== -1
        );
    }
}

type SubjectAreaSearchProps = {
    onSelectSubjectArea(subjectArea: string): void;
    courses: any;
}

const SubjectAreaSearch = ({ onSelectSubjectArea, courses }: SubjectAreaSearchProps) => {
    const [query, setQuery] = useState('');
    const subjectAreas = Object.keys(courses);

    const matcher = useCallback(matchSubjectArea(query), [query]);
    const filteredSubjectAreas = subjectAreas.filter(matcher);

    return (
        <div>
            <div className="flex gap-2">
                <input
                    className="flex-1 p-4 mb-4 outline-none text-center text-2xl text-black shadow-lg"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by department"
                    autoFocus
                />
            </div>
            <div>
                <ul>
                    {filteredSubjectAreas.map(subjectArea => (
                        <li
                            key={subjectArea}
                            onClick={() => onSelectSubjectArea(subjectArea)}
                            className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2"
                        >
                            <div className="flex">
                                <div className="flex-1">
                                    <h3 className="text-2xl">{subjectArea}</h3>
                                    <p className="text-xs">{getSubjectAreaLongName(subjectArea)}</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl">{courses[subjectArea].length}</h3>
                                    <p className="text-xs">courses</p>
                                </div>
                            </div>
                        </li>
                    ))}
                    {query !== "" && filteredSubjectAreas.length === 0 && (
                        <li className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                            No departments found
                        </li>
                    )}
                    {query === "" && (
                        <h1 className="text-xl text-center">department</h1>
                    )}
                </ul>
            </div>
        </div>
    )
}

const Search = () => {
    const [courses, setCourses] = useState<any>({});
    const [selectedSubjectArea, setSelectedSubjectArea] = useState('');

    useEffect(() => {
        getCourses().then(setCourses);
    }, []);

    return (
        <div className="flex flex-col align-center justify-center">
            <h1 className="text-xl mb-4">I want grade distributions for classes in the</h1>
            {selectedSubjectArea === '' ?
                <SubjectAreaSearch courses={courses} onSelectSubjectArea={setSelectedSubjectArea} /> :
                <div>
                    <div
                        className="flex flex-1 p-4 mb-4 outline-none text-center text-2xl text-black bg-white shadow-lg"
                    >
                        <div className="flex-1"></div>
                        <div className="flex-1">{selectedSubjectArea}</div>
                        <div className="flex-1"></div>
                    </div>
                </div>
            }
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