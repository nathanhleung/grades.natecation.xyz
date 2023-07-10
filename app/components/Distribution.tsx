"use client";

import "chart.js/auto";
import { groupBy, mapValues, maxBy, size, sum, sumBy } from "lodash";
import { compose, get } from "lodash/fp";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import { UCLA_BLUE_RGB } from "../constants";
import useCourseData from "../hooks/useCourseData";
import { compareGrades, getTermLongName } from "../utils";
import { Loading } from "./Loading";

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
    setSelectedTerm(instructorTerms[0]);
  }, [selectedInstructorName]);

  const gradeCountsForInstructorNameForTerm =
    gradeCountsByInstructorNameByTerm?.[selectedInstructorName]?.[selectedTerm];
  const totalGradeCountForInstructorNameForTerm = sum(
    Object.values(gradeCountsForInstructorNameForTerm ?? {}).map(Number),
  );

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
          <div className="flex gap-4 mb-4 text-left">
            <div className="flex-[2]">
              <label className="block mb-1 text-sm font-bold">
                Instructor Name
              </label>
              <Select
                value={{
                  label: selectedInstructorName,
                  value: selectedInstructorName,
                }}
                onChange={(newSelectedInstructorName) => {
                  if (
                    newSelectedInstructorName !== null &&
                    newSelectedInstructorName.value !== selectedInstructorName
                  ) {
                    setSelectedInstructorName(newSelectedInstructorName.value);
                    setSelectedTerm("");
                  }
                }}
                options={instructorNames.map((instructorName) => ({
                  value: instructorName,
                  label: instructorName,
                }))}
                styles={{
                  control(base, props) {
                    return {
                      ...base,
                      boxShadow: "none",
                      borderWidth: "2px",
                      borderColor: props.isFocused
                        ? `rgb(${UCLA_BLUE_RGB})`
                        : "none",
                      ":hover": {
                        borderColor: `rgb(${UCLA_BLUE_RGB})`,
                      },
                    };
                  },
                  option(base, props) {
                    return {
                      ...base,
                      color: props.isFocused ? "white" : "black",
                      background: props.isFocused
                        ? `rgb(${UCLA_BLUE_RGB})`
                        : "white",
                    };
                  },
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-bold">Term</label>
              <Select
                value={{
                  label: getTermLongName(selectedTerm),
                  value: selectedTerm,
                }}
                onChange={(newSelectedTerm) => {
                  if (newSelectedTerm !== null) {
                    setSelectedTerm(newSelectedTerm.value);
                  }
                }}
                options={instructorTerms.map((instructorTerm) => ({
                  value: instructorTerm,
                  label: getTermLongName(instructorTerm),
                }))}
                styles={{
                  control(base, props) {
                    return {
                      ...base,
                      boxShadow: "none",
                      borderWidth: "2px",
                      borderColor: props.isFocused
                        ? `rgb(${UCLA_BLUE_RGB})`
                        : "none",
                      ":hover": {
                        borderColor: `rgb(${UCLA_BLUE_RGB})`,
                      },
                    };
                  },
                  option(base, props) {
                    return {
                      ...base,
                      color:
                        props.isFocused || props.isSelected ? "white" : "black",
                      background:
                        props.isFocused || props.isSelected
                          ? `rgb(${UCLA_BLUE_RGB})`
                          : "white",
                    };
                  },
                }}
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
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => {
                      const decimal =
                        Number(value) / totalGradeCountForInstructorNameForTerm;
                      return `${(decimal * 100).toFixed(1)}%`;
                    },
                  },
                  min: 0,
                  max: totalGradeCountForInstructorNameForTerm,
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
