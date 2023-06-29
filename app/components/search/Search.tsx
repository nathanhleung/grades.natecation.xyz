"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SubjectAreaQueryResults } from "./SubjectAreaQueryResults";
import { CatalogNumberQueryResults } from "./CatalogNumberQueryResults";

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

const Search = () => {
    const [subjectAreaQuery, setSubjectAreaQuery] = useState('');
    const [courses, setCourses] = useState<any>({});
    const [selectedSubjectArea, setSelectedSubjectArea] = useState('');
    const subjectAreaQueryInputRef = useRef<HTMLInputElement>(null);
    const catalogNumberQueryInputRef = useRef<HTMLInputElement>(null);
    const [catalogNumberQuery, setCatalogNumberQuery] = useState('');

    useEffect(() => {
        getCourses().then(setCourses);
    }, []);

    const searchingForSubjectArea = (
        (subjectAreaQuery !== '') &&
        (selectedSubjectArea === '')
    );

    return (
        <div
            className="flex flex-col align-center justify-center w-full"
        >
            <h1 className="text-2xl lg:text-3xl mb-6 text-center">
                {subjectAreaQuery === ""
                    ? "I want grade distributions for classes in the"
                    : selectedSubjectArea === ""
                        ? "I want grade distributions for classes in"
                        : "I want the grade distribution for"}
            </h1>
            <div className="flex gap-2">
                <input
                    className="flex-1 p-4 mb-6 outline-none text-center text-2xl text-black shadow-lg dark:shadow-gray-700 disabled:bg-white"
                    type="text"
                    ref={subjectAreaQueryInputRef}
                    value={selectedSubjectArea || subjectAreaQuery}
                    onChange={(e) => {
                        if (selectedSubjectArea === "") {
                            setSubjectAreaQuery(e.target.value)
                        }
                    }}
                    placeholder="Search by department"
                    autoFocus
                    onClick={() => {
                        if (selectedSubjectArea !== "") {
                            setSelectedSubjectArea("");
                            setSubjectAreaQuery(selectedSubjectArea);
                            setCatalogNumberQuery("");
                            subjectAreaQueryInputRef.current?.select();
                        }
                    }}
                />
                {selectedSubjectArea && (
                    <input
                        className="flex-1 p-4 mb-6 outline-none text-center text-2xl text-black shadow-lg dark:shadow-gray-700 disabled:bg-white"
                        type="text"
                        ref={catalogNumberQueryInputRef}
                        value={catalogNumberQuery}
                        onChange={e => setCatalogNumberQuery(e.target.value)}
                        placeholder="Course number"
                        onKeyDown={(e) => {
                            // If the user backspaces and there's nothing in the
                            // input, go back to searching for a department.
                            if (e.key === "Backspace" && catalogNumberQuery === "") {
                                setSelectedSubjectArea("");
                                setSubjectAreaQuery(selectedSubjectArea);
                                setCatalogNumberQuery("");
                                subjectAreaQueryInputRef.current?.focus();
                            }
                        }}
                    />
                )}
            </div>
            {searchingForSubjectArea ? (
                <SubjectAreaQueryResults
                    courses={courses}
                    query={subjectAreaQuery}
                    onResetSearch={() => {
                        setSubjectAreaQuery('');
                        subjectAreaQueryInputRef.current?.focus();
                    }}
                    onSelectSubjectArea={(subjectArea) => {
                        setSelectedSubjectArea(subjectArea);
                        // Wait until next tick to ensure component is mounted
                        requestAnimationFrame(() => {
                            catalogNumberQueryInputRef.current?.focus();
                        })
                    }}
                />
            ) : (
                subjectAreaQuery === "" && (
                    <h1 className="text-2xl lg:text-3xl text-center">department</h1>
                )
            )}
            {selectedSubjectArea && (
                <CatalogNumberQueryResults
                    courses={courses}
                    subjectArea={selectedSubjectArea}
                    query={catalogNumberQuery}
                    onResetSearch={() => {
                        setCatalogNumberQuery('');
                        catalogNumberQueryInputRef.current?.focus();
                    }}
                />
            )}
        </div >
    );
}

export { Search };