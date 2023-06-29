import { About } from "@/app/components/About";
import { Distribution } from "@/app/components/Distribution";

export default function Course({ params }: { params: { subjectArea: string, catalogNumber: string } }) {
    const { subjectArea: rawSubjectArea, catalogNumber: rawCatalogNumber } = params;
    const subjectArea = decodeURIComponent(rawSubjectArea);
    const catalogNumber = decodeURIComponent(rawCatalogNumber);

    return (
        <main className="flex min-h-screen flex-col p-6 sm:p-12 md:p-24 md:mx-auto justify-between">
            <div className="flex flex-col text-center w-full">
                <div className="flex items-center justify-around mb-12">
                    <div className="flex-1">
                        <a
                            className="text-md text-blue-400 dark:text-blue-800 hover:opacity-50"
                            // TODO(nathanhleung): handle query on search page
                            // add this query to history when clicking on a link to
                            // an individual course page
                            href={`/?subjectArea=${rawSubjectArea}`}
                        >
                            &laquo; Back to Search
                        </a>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl text-gray-400 dark:text-gray-800 hover:opacity-50">
                            <a href="/">grades.natecation.xyz</a>
                        </h2>
                    </div>
                    <div className="flex-1"></div>
                </div>
                <h1 className="text-4xl mb-4">{subjectArea} {catalogNumber}</h1>
                <Distribution subjectArea={subjectArea} catalogNumber={catalogNumber} />
            </div>

            <div className="flex flex-col text-center mt-6">
                <About />
            </div>
        </main >
    )
}
