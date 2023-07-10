import { Response } from "@/app/api/courses/route";
import { QueryResults } from "./QueryResults";

function getSubjectAreaCourses(courses: Response, subjectArea: string) {
  return Object.values(courses[subjectArea] ?? {});
}

function matchCourse(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  return (row: ReturnType<typeof getSubjectAreaCourses>[number]) => {
    return {
      matches: row.catalogNumber.toLowerCase().indexOf(normalizedQuery) !== -1,
      score: 0,
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
      noResultsMessage="No courses found matching your query"
      renderResult={(row) => {
        const nRows = courses[subjectArea][row.catalogNumber].nRows;

        return (
          <a href={`/${subjectArea}/${row.catalogNumber}`}>
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
                  <div className="text-center min-w-[100px]">
                    <h3 className="text-2xl">
                      {nRows > 50 ? "great" : nRows > 10 ? "good" : "limited"}
                    </h3>
                    <p className="text-xs">data</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        );
      }}
    />
  );
};

export { CatalogNumberQueryResults };
