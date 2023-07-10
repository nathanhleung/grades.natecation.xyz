"use client";

import useCourseData from "../hooks/useCourseData";

type CourseTitleProps = {
    subjectArea: string;
    catalogNumber: string;
}

const CourseTitle = ({ subjectArea, catalogNumber }: CourseTitleProps) => {
    const { courseData } = useCourseData(subjectArea, catalogNumber);

    return (
        <span>{courseData[0]?.courseTitle}</span>
    )
}

export { CourseTitle };