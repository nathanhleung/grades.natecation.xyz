import { addDays, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { Response as CoursesResponse } from "../api/courses/route";
import { Response as InstructorsResponse } from "../api/instructors/route";

/**
 * Gets a list of courses from the backend
 *
 * @returns a list of courses is JSON format
 */
async function getCourses() {
  const res = await fetch("/api/courses");
  const json: CoursesResponse = await res.json();
  return json;
}

/**
 * Gets a list of instructors from the backend
 *
 * @returns a list of instructors is JSON format
 */
async function getInstructors() {
  const res = await fetch("/api/instructors");
  const json: InstructorsResponse = await res.json();
  return json;
}

function useCourses() {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courses, setCourses] = useState<CoursesResponse>();

  const [isLoadingInstructors, setIsLoadingInstructors] = useState(true);
  const [instructors, setInstructors] = useState<InstructorsResponse>();

  useEffect(() => {
    const cachedCourses = window.localStorage.getItem("courses");
    const cachedCoursesExpiration = new Date(
      window.localStorage.getItem("courses-expiration") ?? 0,
    );
    const now = new Date();

    if (cachedCourses && isBefore(now, cachedCoursesExpiration)) {
      setCourses(JSON.parse(cachedCourses) as any);
      setIsLoadingCourses(false);
    } else {
      getCourses()
        .then((json) => {
          setCourses(json);
          window.localStorage.setItem("courses", JSON.stringify(json));
          window.localStorage.setItem(
            "courses-expiration",
            addDays(now, 1).toISOString(),
          );
        })
        .finally(() => {
          setIsLoadingCourses(false);
        });
    }
  }, []);

  useEffect(() => {
    const cachedInstructors = window.localStorage.getItem("instructors");
    const cachedInstructorsExpiration = new Date(
      window.localStorage.getItem("instructors-expiration") ?? 0,
    );
    const now = new Date();

    if (cachedInstructors && isBefore(now, cachedInstructorsExpiration)) {
      setInstructors(JSON.parse(cachedInstructors) as any);
      setIsLoadingInstructors(false);
    } else {
      getInstructors()
        .then((json) => {
          setInstructors(json);
          window.localStorage.setItem("instructors", JSON.stringify(json));
          window.localStorage.setItem(
            "instructors-expiration",
            addDays(now, 1).toISOString(),
          );
        })
        .finally(() => {
          setIsLoadingInstructors(false);
        });
    }
  }, []);

  const isLoading = isLoadingCourses && isLoadingInstructors;

  return { courses, instructors, isLoading };
}

export default useCourses;
