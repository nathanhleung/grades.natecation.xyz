import { useCallback } from "react";

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
     * the query or not.
     */
    matcher(query: string): (datum: T) => boolean;
    /**
     * Called when the user requests to reset the search.
     */
    onResetSearch(): void;
    /**
     * Called when the user selects a result.
     */
    onSelectResult(result: T): void;
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
    onSelectResult,
    keyExtractor = (datum) => datum?.toString() ?? '',
    renderResult,
    noResultsMessage = "No results",
}: QueryResultsProps<T>) {
    const predicate = useCallback(matcher(query), [query]);
    const results = data.filter(predicate);

    return (
        <div>
            <ul>
                {results.map((datum) => (
                    <li
                        key={keyExtractor(datum)}
                        onClick={() => onSelectResult(datum)}
                    >
                        {renderResult(datum)}
                    </li>
                ))}
                {query !== "" && results.length === 0 && (
                    <li className="text-black bg-white cursor-pointer p-4 border-t-gray-100 border-t-2">
                        <div className="flex justify-between">
                            <p className="italic">
                                {noResultsMessage}
                            </p>
                            <p className="text-blue-400 dark:text-blue-800 hover:opacity-50 cursor-pointer" onClick={onResetSearch}>
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