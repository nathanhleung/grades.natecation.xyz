"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

async function getCourseData(subjectArea: string, catalogNumber: string) {
    const res = await fetch(`/api/course/${subjectArea}/${catalogNumber}`);
    const json = await res.json();
    return json;
}

function compareGrades(a: string, b: string) {
    const gradeOrdering = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'P', 'NP', 'I'];
    const indexOfA = gradeOrdering.indexOf(a);
    const indexOfB = gradeOrdering.indexOf(b);

    if (indexOfA === -1) {
        return 1;
    }
    if (indexOfB === -1) {
        return -1;
    }
    return indexOfA - indexOfB;
}

type CourseProps = {
    subjectArea: string;
    catalogNumber: string;
}

const Distribution = ({ subjectArea, catalogNumber }: CourseProps) => {
    const [courseData, setCourseData] = useState<any[]>([]);
    const gradeCounts =
        courseData
            .reduce((acc, row) => {
                if (!acc[row.gradeOffered]) {
                    acc[row.gradeOffered] = 0;
                }
                acc[row.gradeOffered] += parseInt(row.gradeCount, 10);
                return acc;
            }, {})
    const chartData = Object.keys(gradeCounts).map(gradeOffered => ({
        gradeOffered,
        gradeCount: gradeCounts[gradeOffered],
    })).sort((a, b) => {
        return compareGrades(a.gradeOffered, b.gradeOffered);
    });

    useEffect(() => {
        getCourseData(subjectArea, catalogNumber).then(setCourseData);
    }, [subjectArea, catalogNumber]);

    return (
        <div className="text-center">
            <h2 className="text-2xl mb-4">{courseData[0]?.courseTitle}</h2>
            <div className="flex justify-center">
                <BarChart data={chartData} height={500} width={500}>
                    <XAxis dataKey="gradeOffered" />
                    <YAxis />
                    <Tooltip cursor={false} />
                    <Legend />
                    <Bar dataKey="gradeCount" fill="rgb(59 130 246)" />
                </BarChart>
            </div>
        </div>
    )
}

export { Distribution }