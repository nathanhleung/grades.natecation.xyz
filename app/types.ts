export type BaseCourseRow = {
  subjectArea: string;
  courseTitle: string;
  catalogNumber: string;
};

export type CourseRow = BaseCourseRow & {
  enrollmentTerm: string;
  sectionNumber: string;
  gradeOffered: string;
  gradeCount: string;
  enrollmentTotal: string;
  instructorName: string;
};
