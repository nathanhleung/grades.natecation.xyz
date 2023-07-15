"use client";

import untypedSubjectSummaries from "@/app/generated/subject-summaries.json";
import { SummaryRow } from "@/app/types";
import { useState, useRef, useEffect } from "react";

const SUMMARY_DISPLAY_COUNT = 100;
const subjectSummaries = untypedSubjectSummaries as unknown as SummaryRow[];
const tableHeaders = [
    {
        key: "enrollmentTerm",
        label: "Term"
    },
    {
        key: "subjectArea",
        label: "Subject"
    },
    {
        key: "catalogNumber",
        label: "Course Number"
    },
    {
        key: "courseTitle",
        label: "Course Name"
    },
    {
        key: "instructorName",
        label: "Professor"
    },
    {
        key: "gradeAverage",
        label: "Average Grade"
    },
    {
        key: "gradeSpread",
        label: "Grade Spread"
    },
    {
        key: "gradedTotal",
        label: "Total Graded"
    },
    {
        key: "enrollmentTotal",
        label: "Total Enrolled"
    }
]

const Summary = () => {
    const [cutoff, setCutoff] = useState(SUMMARY_DISPLAY_COUNT);
    const [sortBy, setSortBy] = useState<keyof SummaryRow>("gradeAverage");
    const [sortReverse, setSortReverse] = useState(true);
    const [displaySummaries, setDisplaySummaries] = useState(subjectSummaries.slice(0, cutoff));
    const observerRef = useRef<HTMLDivElement>(null);

    const onHeaderClick = (key: keyof SummaryRow) => {
        if (sortBy === key) {
            setSortReverse(!sortReverse);
        } else {
            setSortBy(key);
            setSortReverse(false);
        }
        setCutoff(SUMMARY_DISPLAY_COUNT);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setCutoff(c => c + SUMMARY_DISPLAY_COUNT);
            }
        });

        const node = observerRef.current;

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        }
    }, [observerRef]);

    useEffect(() => {
        setDisplaySummaries(subjectSummaries.filter(row => row.gradedTotal !== 0).sort((a, b) => {
            if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
                return ((a[sortBy] as number) - (b[sortBy] as number)) * (sortReverse ? -1 : 1);
            } else if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string") {
                return (a[sortBy] as string).localeCompare(b[sortBy] as string) * (sortReverse ? -1 : 1);
            }
            return 0;
        }).slice(0, cutoff));
    }, [cutoff, sortBy, sortReverse]);

    return (
        <main className="flex flex-col w-full">
            <h1 className="text-4xl text-center mt-16 mb-8 text-black font-bold">
                Grade Summaries
            </h1>
            <div className="max-w-full overflow-auto">
                <table className="text-sm mx-4">
                    <thead>
                        <tr>
                            {tableHeaders.map(({ key, label }) =>
                                <th className={`cursor-pointer max-w-[100px] pr-4 ${key === sortBy ? "relative text-uclaBlue after:absolute after:inline-block after:ml-1 after:content-['▼']" : ''} ${key === sortBy && !sortReverse ? 'after:rotate-180' : ''}`} key={key} onClick={() => onHeaderClick(key as keyof SummaryRow)}>{label}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {displaySummaries.map(({
                            enrollmentTerm,
                            subjectArea,
                            catalogNumber,
                            sectionNumber,
                            enrollmentTotal,
                            instructorName,
                            courseTitle,
                            gradeAverage,
                            gradeSpread,
                            gradedTotal }) =>
                            <tr key={`${enrollmentTerm}-${subjectArea}-${catalogNumber}-${sectionNumber}`}>
                                <td>{enrollmentTerm}</td>
                                <td>{subjectArea}</td>
                                <td className="text-center">{catalogNumber}</td>
                                <td className="pr-2">{courseTitle}</td>
                                <td className="pr-2">{instructorName}</td>
                                <td className="text-center">{gradeAverage?.toFixed(2)}</td>
                                <td className="text-center">{gradeSpread?.toFixed(2)}</td>
                                <td className="text-center">{gradedTotal}</td>
                                <td className="text-center">{enrollmentTotal}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bg-gradient-to-t from-white via-white to-transparent pt-4 sticky bottom-0 text-center text-slate-700">Showing the first {cutoff} of {subjectSummaries.length} courses</div>
            <div ref={observerRef} />
        </main>
    )
}

export default Summary;