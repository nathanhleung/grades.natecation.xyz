import * as csv from "csv";
import fs from "fs";
import { mkdirp } from "mkdirp";
import path from "path";
import MultiStream from "multistream";

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

type Row = {
  enrollmentTerm: string;
  subjectArea: string;
  catalogNumber: string;
  sectionNumber: string;
  gradeOffered: string;
  gradeCount: string;
  enrollmentTotal: string;
  instructorName: string;
  courseTitle: string;
};

type InstructorIndex = {
  [instructorName: string]: Row[];
};

type SubjectIndex = {
  [subjectArea: string]: {
    [catalogNumber: string]: Row[];
  };
};

/**
 * Parses the CSV and returns an array of objects corresponding to rows and indexes.
 */
async function parseAndIndexGrades(): Promise<
  [Row[], InstructorIndex, SubjectIndex]
> {
  const rows: Row[] = [];
  const instructorIndex: InstructorIndex = {};
  const subjectIndex: SubjectIndex = {};

  const streams = [
    "header.csv",
    "grades-21f-222.csv",
    "grades-22f-23s.csv",
  ].map(
    (filename) => () => fs.createReadStream(path.resolve(__dirname, filename)),
  );

  const parser = new MultiStream(streams)
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

      const { instructorName, subjectArea, catalogNumber } = row;

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
    });

  return new Promise((resolve, reject) => {
    parser.on("error", (err) => {
      reject(err);
    });

    parser.on("end", () => {
      resolve([rows, instructorIndex, subjectIndex]);
    });
  });
}

async function main() {
  console.info("Parsing and cleaning data...");

  const [rows, instructorIndex, subjectIndex] = await parseAndIndexGrades();

  console.info("Parsed and cleaned data! Writing files to app/generated...");

  const generatedDataDir = path.resolve(__dirname, "..", "app", "generated");

  await mkdirp(generatedDataDir);
  await Promise.all([
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "rows.json"),
      JSON.stringify(rows),
      "utf-8",
    ),
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "instructor-index.json"),
      JSON.stringify(instructorIndex),
      "utf-8",
    ),
    fs.promises.writeFile(
      path.resolve(generatedDataDir, "subject-index.json"),
      JSON.stringify(subjectIndex),
      "utf-8",
    ),
  ]);

  console.info("Wrote files to app/generated!");
}

main()
  .then(() => {
    console.log("Completed successfully!");
  })
  .catch((err) => {
    console.error("An error occurred.");
    console.error(err);
  });
