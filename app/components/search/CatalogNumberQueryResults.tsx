import { Response } from "@/app/api/courses/route";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { QueryResults } from "./QueryResults";

function getSubjectAreaCourses(courses: Response, subjectArea: string) {
  return Object.values(courses[subjectArea] ?? {});
}

function matchCourse(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  return (row: ReturnType<typeof getSubjectAreaCourses>[number]) => {
    const { catalogNumber } = row;

    // Sort by course number, ascending (strip all letters)
    let score = Number(catalogNumber.replace(/\D/g, ""));

    // This makes sure sequences courses are ranked correctly
    const lastCharCode = catalogNumber
      .toLowerCase()
      .charCodeAt(catalogNumber.length - 1);
    // a-z lowercase in ASCII
    if (lastCharCode >= 97 && lastCharCode <= 122) {
      // This ensures the ordering 101 < 101A < 101Z < 102
      // TODO(nathanhleung): handle honors math courses
      score += (lastCharCode - 96) / 27;
    }

    return {
      matches: row.catalogNumber.toLowerCase().indexOf(normalizedQuery) !== -1,
      // Sort by course number, ascending
      score: -1 * score,
    };
  };
}

type CatalogNumberQueryResultsProps = {
  courses: Response;
  /**
   * The subject area within which we are searching for courses
   */
  subjectArea: string;
  /**
   * The catalog number query
   */
  query: string;
};

const CatalogNumberQueryResults = ({
  courses,
  subjectArea,
  query,
}: CatalogNumberQueryResultsProps) => {
  const subjectAreaCourses = getSubjectAreaCourses(courses, subjectArea);

  return (
    <QueryResults
      data={subjectAreaCourses}
      query={query}
      matcher={matchCourse}
      keyExtractor={it => it.catalogNumber}
      noResultsMessage="No courses found matching your query"
      renderResult={(row) => {
        return (
          <Result courses={courses} subjectArea={subjectArea} row={row} />
        );
      }}
    />
  );
};

type ResultProps = {
  courses: Response;
  subjectArea: string;
  row: ReturnType<typeof getSubjectAreaCourses>[number]
}

const Result = ({ courses, subjectArea, row }: ResultProps) => {
  const [clicked, setClicked] = useState(false);
  const nRows = courses[subjectArea][row.catalogNumber].nRows;

  return (
    <a
      href={`/${subjectArea}/${row.catalogNumber}`}
      onClick={() => {
        setClicked(true);

        // Fixes bug Pranav was experiencing on mobile
        // where the loading state would stay stuck
        setTimeout(() => {
          setClicked(false);
        }, 500);
      }}
    >
      <div className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
        <div className="flex">
          <div className="flex-1">
            <div>
              <h3 className="text-xl font-bold">
                {subjectArea} {row.catalogNumber}
              </h3>
              <p className="text-md">
                {courses[subjectArea][row.catalogNumber].courseTitle}
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end">
            {clicked ? (
              <Loading noLayoutStyles className="w-28" />
            ) : (
              <div className="text-center min-w-[100px]">
                <h3 className="text-2xl">
                  {nRows > 50 ? "great" : nRows > 10 ? "good" : "limited"}
                </h3>
                <p className="text-xs">data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

export { CatalogNumberQueryResults };
