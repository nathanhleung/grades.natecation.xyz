import { About } from "@/app/components/About";
import { Distribution } from "@/app/components/Distribution";

export default function Course({ params }: { params: { subjectArea: string, catalogNumber: string } }) {
    const { subjectArea: rawSubjectArea, catalogNumber: rawCatalogNumber } = params;
    const subjectArea = decodeURIComponent(rawSubjectArea);
    const catalogNumber = decodeURIComponent(rawCatalogNumber);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 md:max-w-[75%] md:mx-auto">
            <div className="flex flex-col text-center">
                <h2 className="text-lg text-gray-500 mb-6"><a href="/">grades.natecation.com</a></h2>
                <h1 className="text-4xl mb-4">{subjectArea} {catalogNumber}</h1>
                <Distribution subjectArea={subjectArea} catalogNumber={catalogNumber} />
            </div>

            <div className="flex flex-col text-center mt-6">
                <About />
            </div>
        </main >
    )
}
