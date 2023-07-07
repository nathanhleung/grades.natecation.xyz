import { useState, useEffect, cache } from "react";

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

function useCourses() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);

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