import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';
import { GENERATED_DATA_DIR } from '../constants';

type CoursesByInstructor = {
    [instructor: string]: {
        [subjectArea: string]: Set<string>;
    }
}

export async function GET() {
    const instructorIndex = JSON.parse(await fs.promises.readFile(
        path.resolve(GENERATED_DATA_DIR, 'instructor-index.json'), 'utf-8'
    ));

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

    console.log(coursesByInstructor["BIANCHI, DANIELE"]["A&O SCI"])


    return NextResponse.json(JSON.parse(JSON.stringify(
        coursesByInstructor,
        // Convert Sets to Arrays so they are correctly stringified
        (_, value) => (value instanceof Set ? Array.from(value) : value)
    )));
}