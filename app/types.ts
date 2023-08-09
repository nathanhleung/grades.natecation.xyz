export type CourseRow = {
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

export type SummaryRow = {
  enrollmentTerm: string;
  subjectArea: string;
  catalogNumber: string;
  sectionNumber: string;
  enrollmentTotal: string;
  instructorName: string;
  courseTitle: string;
  gradeAverage: number | null;
  gradeSpread: number | null;
  gradedTotal: number;
};

export type InstructorIndex = {
  [instructorName: string]: CourseRow[];
};

export type SubjectIndex = {
  [subjectArea: string]: {
    [catalogNumber: string]: CourseRow[];
  };
};

export type SummaryIndex = {
  [summaryKey: string]: CourseRow[];
};
