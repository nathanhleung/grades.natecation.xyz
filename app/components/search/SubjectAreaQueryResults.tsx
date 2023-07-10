import { Response } from "@/app/api/courses/route";
import { getSubjectAreaLongName } from "@/app/utils";
import { QueryResults } from "./QueryResults";

function getSubjectAreaAliases(subjectArea: string) {
    return (
        {
            "A&O SCI": ["AOS"],
            "AERO ST": ["Aero Studies"],
            "AF AMER": ["AA", "AAS"],
            "AM IND": ["AIS"],
            "ART&ARC": ["Art and Architecture", "AA"],
            "ASIA AM": ["AA", "AAS"],
            "C&EE": ["CEE"],
            "C&EE ST": ["CEE", "CEES"],
            "C&S BIO": ["CSB", "CSBIO", "CS BIO"],
            CCAS: ["Chicano Studies", "Chicanx Studies", "Chicana Studies"],
            "CH ENGR": ["ChemE"],
            "COM LIT": ["CompLit"],
            "COM SCI": ["CS", "CompSci", "EECS"],
            COMPTNG: ["PIC"],
            DESMA: ["Design Media Arts"],
            "EC ENGR": ["ECE", "EE", "CE"],
            "EE BIOL": ["EEB"],
            "EPS SCI": ["EPSS"],
            "FILM TV": ["FTV"],
            "I A STD": ["IAS"],
            "I E STD": ["IES"],
            "I M STD": ["IMS"],
            "INF STD": ["IS"],
            "INTL DV": ["IDS"],
            "ISLM ST": ["IS"],
            "M E STD": ["MES"],
            "MAT SCI": ["MATSCI"],
            "MC&IP": ["MCIP"],
            "MCD BIO": ["MCDB"],
            "MECH&AE": ["MAE", "MechE", "Aero"],
            "NR EAST": ["NEL"],
            "POL SCI": ["PoliSci"],
        }[subjectArea] ?? []
    );
}

type SubjectAreaQueryResultsProps = {
    courses: Response;
    /**
     * The subject area query
     */
    query: string;
    /**
     * Called when the user selects a subject area
     * @param subjectArea the subject area that the user selected
     *  from the query results
     */
    onSelectSubjectArea(subjectArea: string): void;
};

const SubjectAreaQueryResults = ({
    courses,
    query,
    onSelectSubjectArea,
}: SubjectAreaQueryResultsProps) => {
    const subjectAreas = Object.keys(courses);

    /**
     * Given a query, returns a function which checks whether a
     * `subjectArea` (short form) could match the `query`.
     *
     * TODO(nathanhleung):
     * - take into account edit distance?
     * - rank results somehow, e.g. "com sci" should be first result
     *   for "cs", not "classics"
     * - stream results, since the last check (nested array) could be expensive?
     * - maybe even just sort by number of courses available
     *
     * @param query the search query
     * @returns a matcher function which accepts a `subjectArea` and
     *  returns whether the given query matches the subject area.
     */
    function matchSubjectArea(query: string) {
        const normalizedQuery = query.toLowerCase().trim();

        if (normalizedQuery === "") {
            return () => ({
                matches: false,
                score: 0,
            });
        }

        return (subjectArea: string) => {
            const matches =
                subjectArea.toLowerCase().indexOf(normalizedQuery) !== -1 ||
                getSubjectAreaLongName(subjectArea)
                    .toLowerCase()
                    .indexOf(normalizedQuery) !== -1 ||
                getSubjectAreaAliases(subjectArea).some(
                    (alias) => alias.toLowerCase().indexOf(normalizedQuery) !== -1,
                );

            // If someone is searching for 'cs', push 'COM SCI' to the top
            let score = Object.entries(courses[subjectArea]).length;
            if (query === 'cs' && subjectArea.toLowerCase() === 'com sci') {
                score = 999;
            }

            return {
                matches,
                score,
            };
        };
    }

    return (
        <QueryResults
            data={subjectAreas}
            query={query}
            matcher={matchSubjectArea}
            onSelectResult={onSelectSubjectArea}
            noResultsMessage="No departments found matching your query"
            renderResult={(subjectArea) => {
                const nCourses = Object.values(courses[subjectArea]).length;

                return (
                    <div className="text-black bg-white cursor-pointer p-4 border-t-gray-200 border-t-2">
                        <div className="flex">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold">{subjectArea}</h3>
                                <p className="text-xs">{getSubjectAreaLongName(subjectArea)}</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl">{nCourses}</h3>
                                <p className="text-xs">
                                    {nCourses === 1 ? "course" : "courses"}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};

export { SubjectAreaQueryResults };
