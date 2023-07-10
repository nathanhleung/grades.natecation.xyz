import untypedInstructorIndex from '@/app/generated/instructor-index.json';
import { CourseRow } from '@/app/types';
import { NextResponse } from 'next/server';

type InstructorIndex = {
    [instructorName: string]: CourseRow[]
}

const instructorIndex = untypedInstructorIndex as InstructorIndex;

type CoursesByInstructor = {
    [instructor: string]: {
        [subjectArea: string]: Set<string>;
    }
}

export async function GET() {
    const coursesByInstructor: CoursesByInstructor = {};
    const instructors = Object.keys(instructorIndex);
    for (const instructor of instructors) {
        if (!coursesByInstructor[instructor]) {
            coursesByInstructor[instructor] = {};
        }

        for (const course of instructorIndex[instructor]) {
            const { subjectArea } = course;
            if (!coursesByInstructor[instructor][subjectArea]) {
                coursesByInstructor[instructor][subjectArea] = new Set();;
            }
            coursesByInstructor[instructor][subjectArea].add(course.catalogNumber);
        }
    }

    return NextResponse.json(JSON.parse(JSON.stringify(
        coursesByInstructor,
        // Convert Sets to Arrays so they are correctly stringified
        (_, value) => (value instanceof Set ? Array.from(value) : value)
    )));
}