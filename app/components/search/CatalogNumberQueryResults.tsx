import { getSubjectAreaLongName } from "@/app/utils";
import { QueryResults } from "./QueryResults";

function matchCatalogNumber(query: string) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        return () => ({
            matches: false,
            score: 0,
        });
    }

    return (catalogNumber: string) => {
        return ({
            matches: catalogNumber.toLowerCase().indexOf(normalizedQuery) !== -1,
            score: 0,
        });
    }
}

type CatalogNumberQueryResultsProps = {
    courses: any;
    subjectArea: string;
    query: string;
    onResetSearch(): void;
    onSelectCatalogNumber(catalogNumber: string): void;
}

const CatalogNumberQueryResults = ({
    courses,
    subjectArea,
    query,
    onResetSearch,
    onSelectCatalogNumber
}: CatalogNumberQueryResultsProps) => {
    const catalogNumbers = courses[subjectArea];

    return (
        <QueryResults
            data={catalogNumbers}
            query={query}
            onResetSearch={onResetSearch}
            matcher={matchCatalogNumber}
            onSelectResult={onSelectCatalogNumber}
            noResultsMessage="No courses found matching your query"
            renderResult={(catalogNumber) => {
                return (
                    <div className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                        <div className="flex">
                            <div className="flex-1">
                                <div>
                                    <h3 className="text-2xl">{subjectArea} {catalogNumber}</h3>
                                    <p className="text-xs">{getSubjectAreaLongName(subjectArea)} {catalogNumber}</p>
                                </div>
                            </div>
                            <div className="flex-1">
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    );
}

export { CatalogNumberQueryResults }