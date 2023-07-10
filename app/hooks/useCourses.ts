import { useEffect, useState } from "react";
import { Response } from "../api/courses/route";

/**
 * Gets a list of courses from the backend
 * 
 * @returns a list of courses is JSON format
 */
async function getCourses() {
    const res = await fetch('/api/courses');
    const json: Response = await res.json();
    return json;
}

function useCourses() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Response>();

    useEffect(() => {
        // TODO(nathanhleung) add date + cache expiration
        const cachedCourses = window.localStorage.getItem('courses');
        if (cachedCourses) {
            setCourses(JSON.parse(cachedCourses) as any);
            setLoading(false);
        } else {
            getCourses().then(json => {
                setCourses(json);
                window.localStorage.setItem('courses', JSON.stringify(json));
            }).finally(() => {
                setLoading(false);
            });
        }
    }, []);

    return { courses, loading };
}

export default useCourses;