import { useEffect, useState } from "react";

async function getCourseData(subjectArea: string, catalogNumber: string) {
    const res = await fetch(`/api/course/${subjectArea}/${catalogNumber}`);
    const json = await res.json();
    return json;
}

function useCourseData(subjectArea: string, catalogNumber: string) {
    const [courseData, setCourseData] = useState<any[]>([]);

    useEffect(() => {
        getCourseData(subjectArea, catalogNumber).then(setCourseData);
    }, [subjectArea, catalogNumber]);

    return { courseData };
}

export default useCourseData;