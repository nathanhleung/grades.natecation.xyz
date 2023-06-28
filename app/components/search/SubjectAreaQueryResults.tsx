import { QueryResults } from "./QueryResults";

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
        'AN N EA': 'Ancient Near East',
        'ANTHRO': 'Anthropology',
        'ARABIC': "Arabic",
        'ARCH&UD': 'Architecture and Urban Design',
        'ARMENIA': 'Armenian',
        "ART": "Art",
        'ART HIS': 'Art History',
        'ART&ARC': "Arts and Architecture",
        'ARTS ED': 'Arts Education',
        'ASIA AM': "Asian American Studies",
        'ASIAN': "Asian Languages and Cultures",
        'ASL': "American Sign Language",
        'ASTR': "Astronomy",
        'BIOENGR': 'Bioengineering',
        'BIOINFO': 'Bioinformatics',
        'BIOL CH': 'Biological Chemistry',
        'BIOMATH': 'Biomathematics',
        'BIOSTAT': 'Biostatistics',
        'BMD RES': 'Biomedical Research',
        'C&EE': 'Civil and Environmental Engineering',
        'C&EE ST': 'Central and East European Studies',
        'C&S BIO': 'Computational and Systems Biology',
        'CCAS': 'Chicana/o and Central American Studies',
        'CESC': 'Community Engagement and Social Change',
        'CH ENGR': 'Chemical Engineering',
        'CHEM': ' Chemistry and Biochemistry',
        'CHIN': "Chinese",
        'CLASSIC': "Classics",
        'CLUSTER': "Clusters",
        'COM HLT': 'Community Health Sciences',
        'COM LIT': 'Comparative Literature',
        'COM SCI': 'Computer Science',
        'COMM': "Communication",
        'COMPTNG': "Program in Computing",
        'DANCE': 'Dance',
        'DESMA': 'Design / Media Arts',
        'DGT HUM': 'Digital Humanities',
        'DIS STD': 'Disability Studies',
        'DUTCH': 'Dutch',
        'EC ENGR': "Electrical and Computer Engineering",
        'ECON': 'Economics',
        'EDUC': 'Education',
        'EE BIOL': 'Ecology and Evolutionary Biology',
        'ENGCOMP': "English Composition",
        'ENGL': "English",
        'ENGR': "Engineering",
        'ENV HLT': 'Environmental Health Sciences',
        'ENVIRON': 'Environment',
        'EPIDEM': 'Epidemiology',
        'EPS SCI': 'Earth, Planetary, and Space Sciences',
        'ESL': 'English as A Second Language',
        'ETHNMUS': 'Ethnomusicology',
        'FILIPNO': 'Filipino',
        'FILM TV': 'Film and Television',
        'FRNCH': 'French',
        'MATH': 'Mathematics',
    }[subjectArea] ?? '';
}

function getSubjectAreaAliases(subjectArea: string) {
    return {
        'A&O SCI': ['AOS'],
        'AERO ST': ["Aero Studies"],
        'AF AMER': ['AA', 'AAS'],
        'AM IND': ['AIS'],
        'ART&ARC': ['Art and Architecture', 'AA'],
        'ASIA AM': ['AA', 'AAS'],
        'C&EE': ['CEE'],
        'C&EE ST': ['CEE', 'CEES'],
        'C&S BIO': ['CSB', 'CSBIO', 'CS BIO'],
        'CCAS': ['Chicano Studies', 'Chicanx Studies', 'Chicana Studies'],
        'CH ENGR': ['ChemE'],
        'COM LIT': ['CompLit'],
        'COM SCI': ['CS', 'CompSci', 'EECS'],
        'COMPTNG': ['PIC'],
        'DESMA': ['Design Media Arts'],
        'EC ENGR': ['ECE', 'EE', 'CE'],
        'EE BIOL': ['EEB'],
        'EPS SCI': ['EPSS'],
        'FILM TV': ['FTV'],
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
 * - stream results, since the last check (nested array) could be expensive?
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

type SubjectAreaQueryResultsProps = {
    courses: any;
    query: string;
    onResetSearch(): void;
    onSelectSubjectArea(subjectArea: string): void;
}

const SubjectAreaQueryResults = ({
    courses,
    query,
    onResetSearch,
    onSelectSubjectArea
}: SubjectAreaQueryResultsProps) => {
    const subjectAreas = Object.keys(courses);

    return (
        <QueryResults
            data={subjectAreas}
            query={query}
            onResetSearch={onResetSearch}
            matcher={matchSubjectArea}
            onSelectResult={onSelectSubjectArea}
            noResultsMessage="No departments found matching your query"
            renderResult={(subjectArea) => {
                return (
                    <div className="text-black bg-gray-100 cursor-pointer p-4 border-t-gray-200 border-t-2">
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
                    </div>
                )
            }}
        />
    );
}

export { SubjectAreaQueryResults }