import { useCallback, useMemo } from "react";

type QueryResultsProps<T> = {
    /** The search query */
    query: string;
    /** The data to search through */
    data: T[];
    /**
     * A function which extracts a React key from
     * a datum. Defaults to calling `.toString()`.
     */
    keyExtractor?(datum: T): string;
    /**
     * A function which takes in a query and returns another
     * function which returns whether the given datum matches
     * the query or not and a match score. Higher score means
     * higher up in results.
     */
    matcher(query: string): (datum: T) => { matches: boolean, score: number };
    /**
     * Called when the user requests to reset the search.
     */
    onResetSearch(): void;
    /**
     * Called when the user clicks/selects a result.
     */
    onSelectResult?(result: T): void;
    /**
     * Renders a search result.
     */
    renderResult(datum: T): JSX.Element;
    /**
     * The message to display when no results are found.
     */
    noResultsMessage?: string;
}

function QueryResults<T>({
    query,
    matcher,
    data,
    onResetSearch,
    onSelectResult = () => { },
    keyExtractor = (datum) => datum?.toString() ?? '',
    renderResult,
    noResultsMessage = "No results",
}: QueryResultsProps<T>) {
    const matcherForQuery = useCallback(matcher(query), [query]);

    const predicate = useCallback((datum: T) => {
        return matcherForQuery(datum).matches;
    }, [matcherForQuery])

    const results = useMemo(() => {
        return data.filter(predicate).sort((a, b) => {
            const aScore = matcherForQuery(a).score;
            const bScore = matcherForQuery(b).score;

            // Higher is better
            return bScore - aScore;
        });
    }, [data, predicate, matcherForQuery])

    return (
        <div className="shadow-lg">
            <ul>
                {results.map((datum) => (
                    <li
                        key={keyExtractor(datum)}
                        onClick={() => onSelectResult(datum)}
                        className="bg-uclaBlue"
                    >
                        <div className="hover:opacity-50">
                            {renderResult(datum)}
                        </div>
                    </li>
                ))}
                {query !== "" && results.length === 0 && (
                    <li className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                        <div className="flex justify-between">
                            <p className="italic font-normal text-gray-400">
                                {noResultsMessage}
                            </p>
                            <p className="text-uclaBlue hover:opacity-50 cursor-pointer" onClick={onResetSearch}>
                                Reset search
                            </p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export { QueryResults }