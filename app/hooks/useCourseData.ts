import { useEffect, useState } from "react";
import { Response } from "../api/course/[subjectArea]/[catalogNumber]/route";

async function getCourseData(subjectArea: string, catalogNumber: string) {
  const res = await fetch(`/api/course/${subjectArea}/${catalogNumber}`);
  const json: Response = await res.json();
  return json;
}

function useCourseData(subjectArea: string, catalogNumber: string) {
  const [courseData, setCourseData] = useState<Response>([]);

  useEffect(() => {
    getCourseData(subjectArea, catalogNumber).then(setCourseData);
  }, [subjectArea, catalogNumber]);

  return { courseData };
}

export default useCourseData;
