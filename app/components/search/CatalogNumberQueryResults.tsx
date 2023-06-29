import { getSubjectAreaLongName } from "@/app/utils";
import { QueryResults } from "./QueryResults";
import Link from "next/link";

function matchCourse(query: string) {
    const normalizedQuery = query.toLowerCase().trim();

    return (row: any) => {
        return ({
            matches: row.catalogNumber.toLowerCase().indexOf(normalizedQuery) !== -1,
            score: 0,
        });
    }
}

type CatalogNumberQueryResultsProps = {
    courses: any;
    subjectArea: string;
    query: string;
    onResetSearch(): void;
}

const CatalogNumberQueryResults = ({
    courses,
    subjectArea,
    query,
    onResetSearch,
}: CatalogNumberQueryResultsProps) => {
    const subjectAreaCourses = Object.values(courses[subjectArea]);

    return (
        <QueryResults
            data={subjectAreaCourses}
            query={query}
            onResetSearch={onResetSearch}
            matcher={matchCourse}
            noResultsMessage="No courses found matching your query"
            renderResult={(row) => {
                const nSections = courses[subjectArea][row.catalogNumber].nSections;

                return (
                    <Link href={`/${subjectArea}/${row.catalogNumber}`}>
                        <div className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                            <div className="flex">
                                <div className="flex-1">
                                    <div>
                                        <h3 className="text-xl">{subjectArea} {row.catalogNumber}</h3>
                                        <p className="text-md">{courses[subjectArea][row.catalogNumber].courseTitle}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-end">
                                    <div className="text-center">
                                        <h3 className="text-2xl">{nSections}</h3>
                                        <p className="text-xs">{nSections === 1 ? "section" : "sections"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }}
        />
    );
}

export { CatalogNumberQueryResults }