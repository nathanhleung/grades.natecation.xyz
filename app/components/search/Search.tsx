"use client";

import useCourses from "@/app/hooks/useCourses";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CatalogNumberQueryResults } from "./CatalogNumberQueryResults";
import { SubjectAreaQueryResults } from "./SubjectAreaQueryResults";
import { Loading } from "../Loading";

const Search = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [subjectAreaQuery, setSubjectAreaQuery] = useState('');
    const { courses, loading } = useCourses();
    const [selectedSubjectArea, setSelectedSubjectArea] = useState('');
    const subjectAreaQueryInputRef = useRef<HTMLInputElement>(null);
    const catalogNumberQueryInputRef = useRef<HTMLInputElement>(null);
    const [catalogNumberQuery, setCatalogNumberQuery] = useState('');

    useEffect(() => {
        if (searchParams.has('subjectArea')) {
            const subjectAreaParam = searchParams.get('subjectArea') ?? "";
            setSelectedSubjectArea(subjectAreaParam);
            setSubjectAreaQuery(subjectAreaParam)

            // For some reason we need to call `requestAnimationFrame`
            // twice for the `focus` to actually work.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    catalogNumberQueryInputRef.current?.focus();
                });
            });
        }
    }, []);

    const searchingForSubjectArea = (
        (subjectAreaQuery !== '') &&
        (selectedSubjectArea === '')
    );

    if (loading) {
        return <Loading />
    }

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
                    className="flex-1 p-4 mb-6 outline-none text-center text-2xl text-black font-bold shadow-lg dark:shadow-gray-700 disabled:bg-white"
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
                            router.push(pathname);
                        }
                    }}
                />
                {selectedSubjectArea && (
                    <input
                        className="flex-1 p-4 mb-6 outline-none text-center text-2xl text-black font-bold shadow-lg dark:shadow-gray-700 disabled:bg-white"
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
                                router.push(pathname);
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
                        router.push(`${pathname}?subjectArea=${subjectArea}`)

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
