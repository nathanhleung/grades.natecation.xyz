import { QueryResults } from "./QueryResults";

function matchCatalogNumber(query: string) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        return () => false;
    }

    return (catalogNumber: string) => {
        return (
            catalogNumber.toLowerCase().indexOf(normalizedQuery) !== -1
        );
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
                    <div className="text-black bg-gray-100 cursor-pointer p-4 border-t-gray-200 border-t-2">
                        <div className="flex">
                            <div className="flex-1">
                                <h3 className="text-2xl">{subjectArea} {catalogNumber}</h3>
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    );
}

export { CatalogNumberQueryResults }