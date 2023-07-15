import * as csv from "csv";
import fs from "fs";
import { mkdirp } from "mkdirp";
import path from "path";
import {
  InstructorIndex,
  CourseRow,
  SubjectIndex,
  SummaryIndex,
  SummaryRow,
} from "../app/types";

type RawRow = {
  "ENROLLMENT TERM": string;
  "SUBJECT AREA": string;
  "CATLG NBR": string;
  "SECT NBR": string;
  "GRD OFF": string;
  "GRD COUNT": string;
  "ENRL TOT": string;
  "INSTR NAME": string;
  "INSTR CD": string;
  "LONG CRSE TITLE": string;
  "ENROL TERM SEQ NBR": string;
  "INTL CATL": string;
  "INTL SECT": string;
  "CREATION DATE": string;
  ROWNO: string;
};

/**
 * Parses the CSV and returns an array of objects corresponding to rows and indexes.
 */
async function parseAndIndexGrades(): Promise<
  [CourseRow[], InstructorIndex, SubjectIndex, SummaryIndex]
> {
  const rows: CourseRow[] = [];
  const instructorIndex: InstructorIndex = {};
  const subjectIndex: SubjectIndex = {};
  const summaryIndex: SummaryIndex = {};

  const parser = fs
    .createReadStream(path.resolve(__dirname, "grades.csv"))
    .pipe(csv.parse({ columns: true }))
    .on("data", (rawRow: RawRow) => {
      const row = {
        enrollmentTerm: rawRow["ENROLLMENT TERM"].trim(),
        subjectArea: rawRow["SUBJECT AREA"].trim(),
        catalogNumber: rawRow["CATLG NBR"].trim(),
        sectionNumber: rawRow["SECT NBR"].trim(),
        gradeOffered: rawRow["GRD OFF"].trim(),
        gradeCount: rawRow["GRD COUNT"].trim(),
        enrollmentTotal: rawRow["ENRL TOT"].trim(),
        instructorName: rawRow["INSTR NAME"].trim(),
        courseTitle: rawRow["LONG CRSE TITLE"].trim(),
      };
      rows.push(row);

      const {
        instructorName,
        subjectArea,
        catalogNumber,
        enrollmentTerm,
        sectionNumber,
      } = row;

      if (!instructorIndex[instructorName]) {
        instructorIndex[instructorName] = [];
      }
      instructorIndex[instructorName].push(row);

      if (!subjectIndex[subjectArea]) {
        subjectIndex[subjectArea] = {};
      }
      if (!subjectIndex[subjectArea][catalogNumber]) {
        subjectIndex[subjectArea][catalogNumber] = [];
      }
      subjectIndex[subjectArea][catalogNumber].push(row);

      const summaryKey = `${enrollmentTerm}|${subjectArea}|${catalogNumber}|${sectionNumber}`;
      if (!summaryIndex[summaryKey]) {
        summaryIndex[summaryKey] = [];
      }
      summaryIndex[summaryKey].push(row);
    });

  return new Promise((resolve) => {
    parser.on("end", () => {
      resolve([rows, instructorIndex, subjectIndex, summaryIndex]);
    });
  });
}

function calculateSummaries(summaryIndex: SummaryIndex): SummaryRow[] {
  const GRADE_VALUES = {
    "A+": 4,
    A: 4,
    "A-": 3.7,
    "B+": 3.3,
    B: 3,
    "B-": 2.7,
    "C+": 2.3,
    C: 2,
    "C-": 1.7,
    "D+": 1.3,
    D: 1,
    "D-": 0.7,
    F: 0,
  };

  return Object.entries(summaryIndex).map(([summaryKey, rows]) => {
    let totalWithGrade = 0;
    let totalGradeValue = 0;
    let standardErrors = 0;

    rows.forEach((row) => {
      const gradeValue =
        GRADE_VALUES[row.gradeOffered as keyof typeof GRADE_VALUES];
      if (gradeValue >= 0) {
        totalWithGrade += Number(row.gradeCount);
        totalGradeValue += gradeValue * Number(row.gradeCount);
      }
    });

    const {
      enrollmentTerm,
      subjectArea,
      catalogNumber,
      sectionNumber,
      enrollmentTotal,
      instructorName,
      courseTitle,
    } = rows[0];

    if (totalWithGrade === 0) {
      return {
        enrollmentTerm,
        subjectArea,
        catalogNumber,
        sectionNumber,
        enrollmentTotal,
        instructorName,
        courseTitle,
        gradeAverage: null,
        gradeSpread: null,
        gradedTotal: 0,
      };
    }

    const gradeAverage = totalGradeValue / totalWithGrade;

    rows.forEach((row) => {
      const gradeValue =
        GRADE_VALUES[row.gradeOffered as keyof typeof GRADE_VALUES];
      if (gradeValue >= 0) {
        standardErrors += Math.pow(gradeValue - gradeAverage, 2);
      }
    });

    return {
      enrollmentTerm,
      subjectArea,
      catalogNumber,
      sectionNumber,
      enrollmentTotal,
      instructorName,
      courseTitle,
      gradeAverage,
      gradeSpread: Math.sqrt(standardErrors / totalWithGrade),
      gradedTotal: totalWithGrade,
    };
  });
}

async function main() {
  console.info("Parsing and cleaning data...");

  const [rows, instructorIndex, subjectIndex, summaryIndex] =
    await parseAndIndexGrades();

  console.info("Parsed and cleaned data! Writing files to app/generated...");

  const generatedDataDir = path.resolve(__dirname, "..", "app", "generated");

  await mkdirp(generatedDataDir);
  await Promise.all([
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "rows.json"),
      JSON.stringify(rows),
      "utf-8"
    ),
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "instructor-index.json"),
      JSON.stringify(instructorIndex),
      "utf-8"
    ),
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "subject-index.json"),
      JSON.stringify(subjectIndex),
      "utf-8"
    ),
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "subject-summaries.json"),
      JSON.stringify(calculateSummaries(summaryIndex)),
      "utf-8"
    ),
  ]);

  console.info("Wrote files to app/generated!");
}

main();
