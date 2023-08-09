"use client";

import "chart.js/auto";
import { groupBy, last, mapValues, maxBy, size, sum, sumBy } from "lodash";
import { compose, get } from "lodash/fp";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { UCLA_BLUE_RGB } from "../constants";
import useCourseData from "../hooks/useCourseData";
import { compareGrades, getTermLongName } from "../utils";
import { Loading } from "./Loading";
import { Select } from "./Select";

type DistributionProps = {
  subjectArea: string;
  catalogNumber: string;
};

const Distribution = ({ subjectArea, catalogNumber }: DistributionProps) => {
  const { courseData } = useCourseData(subjectArea, catalogNumber);
  const [selectedInstructorName, setSelectedInstructorName] =
    useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<string>("");

  const courseDataByInstructorName = groupBy(courseData, get("instructorName"));

  const rowCountByInstructorName = mapValues(courseDataByInstructorName, size);
  const [instructorWithMostSections] =
    maxBy(Object.entries(rowCountByInstructorName), get("1")) ?? [];

  useEffect(() => {
    if (selectedInstructorName === "") {
      setSelectedInstructorName(instructorWithMostSections ?? "");
    }
  }, [instructorWithMostSections]);

  const courseDataByInstructorNameByTerm = mapValues(
    courseDataByInstructorName,
    (courseDataForInstructorName) => {
      const courseDataForInstructorNameByTerm = groupBy(
        courseDataForInstructorName,
        get("enrollmentTerm"),
      );
      return courseDataForInstructorNameByTerm;
    },
  );

  const gradeCountsByInstructorNameByTerm = mapValues(
    courseDataByInstructorNameByTerm,
    (courseDataForInstructorNameByTerm) => {
      return mapValues(
        courseDataForInstructorNameByTerm,
        (courseDataForInstructorNameForTerm) => {
          const courseDataForInstructorNameForTermByGradeOffered = groupBy(
            courseDataForInstructorNameForTerm,
            get("gradeOffered"),
          );
          const gradeCountsForInstructorNameForTermByGradeOffered = mapValues(
            courseDataForInstructorNameForTermByGradeOffered,
            (courseDataForInstructorNameForTermForGradeOffered) => {
              return sumBy(
                courseDataForInstructorNameForTermForGradeOffered,
                compose(Number, get("gradeCount")),
              );
            },
          );
          return gradeCountsForInstructorNameForTermByGradeOffered;
        },
      );
    },
  );

  const instructorNames = Object.keys(gradeCountsByInstructorNameByTerm);
  const instructorTerms = Object.keys(
    gradeCountsByInstructorNameByTerm[selectedInstructorName] ?? [],
  );

  useEffect(() => {
    setSelectedTerm(last(instructorTerms) ?? "");
  }, [selectedInstructorName]);

  const gradeCountsForInstructorNameForTerm =
    gradeCountsByInstructorNameByTerm?.[selectedInstructorName]?.[selectedTerm];
  const gradeCountArray = Object.values(gradeCountsForInstructorNameForTerm ?? {});
  const totalGradeCountForInstructorNameForTerm = sum(gradeCountArray);

  const maxGradeCount = Math.max(...gradeCountArray);

  const chartData = Object.keys(gradeCountsForInstructorNameForTerm ?? {})
    .map((gradeOffered) => ({
      x: gradeOffered,
      y: gradeCountsForInstructorNameForTerm[gradeOffered],
    }))
    .sort((a, b) => {
      return compareGrades(a.x, b.x);
    });

  const chartConfig: React.ComponentProps<typeof Bar>["data"] = {
    datasets: [
      {
        data: chartData,
        backgroundColor: `rgba(${UCLA_BLUE_RGB}, 0.4)`,
      },
    ],
  };

  return (
    <div className="text-center">
      {courseData.length > 0 ? (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 text-left">
            <div className="flex-1 md:flex-[2]">
              <label className="block mb-1 text-sm font-bold">
                Instructor Name
              </label>
              <Select
                value={selectedInstructorName}
                onChange={(newSelectedInstructorName) => {
                  if (
                    newSelectedInstructorName &&
                    newSelectedInstructorName !== selectedInstructorName
                  ) {
                    setSelectedInstructorName(newSelectedInstructorName);
                    setSelectedTerm("");
                  }
                }}
                options={instructorNames}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-bold">Term</label>
              <Select
                value={selectedTerm}
                getLabel={getTermLongName}
                onChange={(newSelectedTerm) => {
                  if (newSelectedTerm) {
                    setSelectedTerm(newSelectedTerm);
                  }
                }}
                options={instructorTerms}
              />
            </div>
          </div>
          <Bar
            data={chartConfig}
            options={{
              animation: {
                duration: 0,
              },
              plugins: {
                legend: {
                  display: false,
                },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.parsed.y;
                    const pct = ((Number(value) / totalGradeCountForInstructorNameForTerm) * 100).toFixed(1);
                    return `${value} (${pct}%)`
                  }
                }
              }
              },
              scales: {
                y: {
                  ticks: {
                    count: 7,
                    callback: (value) => {
                      const decimal =
                        Number(value) / totalGradeCountForInstructorNameForTerm;
                      return `${(decimal * 100).toFixed(1)}%`;
                    },
                  },
                  min: 0,
                  max: Math.min((15/14) * maxGradeCount, totalGradeCountForInstructorNameForTerm),
                  //if one letter grade makes up over ~93% of total count keep 100% as the max; otherwise leave top-margin of 1/14th of max letter grade count for a cleaner chart layout
                },
              },
            }}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export { Distribution };
