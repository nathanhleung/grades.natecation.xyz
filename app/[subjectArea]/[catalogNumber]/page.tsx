import { About } from "@/app/components/About";
import { Distribution } from "@/app/components/Distribution";
import { Metadata } from "next";

type Props = {
    params: { subjectArea: string, catalogNumber: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { subjectArea, catalogNumber } = params;

    return {
        title: `${decodeURIComponent(subjectArea)} ${decodeURIComponent(catalogNumber)}`,
    }
}

export default function Course({ params }: { params: { subjectArea: string, catalogNumber: string } }) {
    const { subjectArea: rawSubjectArea, catalogNumber: rawCatalogNumber } = params;
    const subjectArea = decodeURIComponent(rawSubjectArea);
    const catalogNumber = decodeURIComponent(rawCatalogNumber);

    return (
        <main className="flex min-h-screen flex-col p-6 sm:p-12 md:p-24 md:max-w-[85%] lg:max-w-[60%] md:mx-auto justify-between">
            <div className="flex flex-col text-center w-full">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex-1 text-left">
                        <a
                            className="text-md text-blue-400 dark:text-blue-800 hover:opacity-50"
                            href={`/?subjectArea=${rawSubjectArea}`}
                        >
                            &laquo; Back to Search
                        </a>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl text-gray-400 dark:text-gray-800 hover:opacity-50 font-bold">
                            <a href="/">grades.natecation.xyz</a>
                        </h2>
                    </div>
                    <div className="flex-1"></div>
                </div>
                <h1 className="text-4xl mb-4 font-bold">{subjectArea} {catalogNumber}</h1>
                <Distribution subjectArea={subjectArea} catalogNumber={catalogNumber} />
            </div>

            <div className="flex flex-col text-center mt-16">
                <About />
            </div>
        </main >
    )
}
