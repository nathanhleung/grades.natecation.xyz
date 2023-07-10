import untypedSubjectIndex from "@/app/generated/subject-index.json";
import { CourseRow } from "@/app/types";
import { NextResponse } from "next/server";

type SubjectIndex = {
  [subjectArea: string]: {
    [catalogNumber: string]: CourseRow[];
  };
};

const subjectIndex = untypedSubjectIndex as SubjectIndex;

export async function GET(
  _: Request,
  { params }: { params: { subjectArea: string; catalogNumber: string } },
) {
  const { subjectArea, catalogNumber } = params;

  return NextResponse.json(
    subjectIndex[subjectArea.toUpperCase()][catalogNumber.toUpperCase()],
  );
}

export type Response = SubjectIndex[string][string];
