"use client";

import useCourses from "@/app/hooks/useCourses";
import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../Loading";
import { CatalogNumberQueryResults } from "./CatalogNumberQueryResults";
import { SubjectAreaQueryResults } from "./SubjectAreaQueryResults";

type SearchProps = {
    onlyInput: boolean;
}

const Search = ({ onlyInput }: SearchProps) => {
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
            {!onlyInput && (
                <h1 className="text-2xl lg:text-3xl mb-6 text-center font-bold">
                    {subjectAreaQuery === ""
                        ? "I want grade distributions for classes in the"
                        : selectedSubjectArea === ""
                            ? "I want grade distributions for classes in"
                            : "I want the grade distribution for"}
                </h1>
            )}
            <div className="flex gap-2">
                <input
                    className={
                        classNames(
                            "flex-1 p-4 outline-none text-center text-2xl text-black",
                            "font-bold shadow-lg disabled:bg-white rounded transition-all border-uclaBlue border-b-8 focus:border-uclaGold",
                            selectedSubjectArea && "rounded-r-none"
                        )
                    }
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

                            if (pathname === '/') {
                                router.push(pathname);
                            }
                        }
                    }}
                />
                {selectedSubjectArea && (
                    <input
                        className={
                            classNames(
                                "flex-1 p-4 outline-none text-center text-2xl text-black",
                                "font-bold shadow-lg disabled:bg-white rounded",
                                "rounded-l-none transition-all border-uclaBlue border-b-8 focus:border-uclaGold"
                            )
                        }
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

                                if (pathname === '/') {
                                    router.push(pathname);
                                }
                            }
                        }}
                    />
                )}
            </div>
            {searchingForSubjectArea ? (
                <div className="mt-8">
                    <SubjectAreaQueryResults
                        courses={courses}
                        query={subjectAreaQuery}
                        onResetSearch={() => {
                            setSubjectAreaQuery('');
                            subjectAreaQueryInputRef.current?.focus();
                        }}
                        onSelectSubjectArea={(subjectArea) => {
                            setSelectedSubjectArea(subjectArea);

                            if (pathname === '/') {
                                router.push(`${pathname}?subjectArea=${subjectArea}`)
                            }

                            // Wait until next tick to ensure component is mounted
                            requestAnimationFrame(() => {
                                catalogNumberQueryInputRef.current?.focus();
                            })
                        }}
                    />
                </div>
            ) : (
                (!onlyInput && subjectAreaQuery === "") && (
                    <h1 className="mt-8 text-2xl lg:text-3xl text-center font-bold">department</h1>
                )
            )}
            {selectedSubjectArea && (
                <div className="mt-8">
                    <CatalogNumberQueryResults
                        courses={courses}
                        subjectArea={selectedSubjectArea}
                        query={catalogNumberQuery}
                        onResetSearch={() => {
                            setCatalogNumberQuery('');
                            catalogNumberQueryInputRef.current?.focus();
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export { Search };
