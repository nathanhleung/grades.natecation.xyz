import { useCallback } from "react";

/**
 * Gets the long name of a short `subjectArea` (e.g. "A&O SCI")
 * 
 * @param subjectArea the short subject area
 * @returns the long name for the subject area
 */
function getSubjectAreaLongName(subjectArea: string) {
    return {
        'A&O SCI': 'Atmospheric and Oceanic Sciences',
        'AERO ST': "Aerospace Studies",
        'AF AMER': 'African American Studies',
        'AM IND': 'American Indian Studies',
        'ANTHRO': 'Anthropology',
        'ART HIS': 'Art History',
        'ASIA AM': "Asian American Studies",
        'CLASSIC': "Classics",
        'COM SCI': 'Computer Science',
        'MATH': 'Mathematics',
    }[subjectArea] ?? '';
}

function getSubjectAreaAliases(subjectArea: string) {
    return {
        'A&O SCI': ['AOS'],
        'AF AMER': ['AAS'],
        'AM IND': ['AIS'],
        'ASIA AM': ['AAS'],
        'COM SCI': ['CS'],
    }[subjectArea] ?? []
}

/**
 * Given a query, returns a function which checks whether a
 * `subjectArea` (short form) could match the `query`.
 * 
 * TODO(nathanhleung):
 * - take into account edit distance?
 * - rank results somehow, e.g. return strength of match rather
 *   than just true or false; e.g. "com sci" should be first result
 *   for "cs", not "classics"
 * 
 * @param query the search query
 * @returns a matcher function which accepts a `subjectArea` and
 *  returns whether the given query matches the subject area.
 */
function matchSubjectArea(query: string) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        return () => false;
    }

    return (subjectArea: string) => {
        return (
            subjectArea.toLowerCase().indexOf(normalizedQuery) !== -1 ||
            getSubjectAreaLongName(subjectArea).toLowerCase().indexOf(normalizedQuery) !== -1 ||
            getSubjectAreaAliases(subjectArea).some((alias) =>
                alias.toLowerCase().indexOf(normalizedQuery) !== -1
            )
        );
    }
}

type QueryResultsProps = {
    courses: any;
    query: string;
    resetQuery(): void;
    onSelectSubjectArea(subjectArea: string): void;
}

const SubjectAreaQueryResults = ({ courses, query, resetQuery, onSelectSubjectArea }: QueryResultsProps) => {
    const subjectAreas = Object.keys(courses);

    const matcher = useCallback(matchSubjectArea(query), [query]);
    const filteredSubjectAreas = subjectAreas.filter(matcher);

    return (
        <div>
            <ul>
                {filteredSubjectAreas.map((subjectArea, i) => (
                    <li
                        key={subjectArea}
                        onClick={() => onSelectSubjectArea(subjectArea)}
                        className="text-black bg-gray-100 cursor-pointer p-4 border-t-gray-200 border-t-2"
                    >
                        <div className="flex">
                            <div className="flex-1">
                                <h3 className="text-2xl">{subjectArea}</h3>
                                <p className="text-xs">{getSubjectAreaLongName(subjectArea)}</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl">{courses[subjectArea].length}</h3>
                                <p className="text-xs">courses</p>
                            </div>
                        </div>
                    </li>
                ))}
                {query !== "" && filteredSubjectAreas.length === 0 && (
                    <li className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                        <div className="flex justify-between">
                            <p className="italic">
                                No departments found matching your query
                            </p>
                            <p className="text-blue-400 dark:text-blue-800 hover:opacity-50 cursor-pointer" onClick={resetQuery}>
                                Reset search
                            </p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export { SubjectAreaQueryResults }