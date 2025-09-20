"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import React, { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const QuestionList = () => {
  const getUser = JSON.parse(localStorage.getItem("user"));

  const { getAllQusetions, allQuestionData, allQuestionLoading } =
    manualQuestionStore();

  useEffect(() => {
    getAllQusetions({
      category: "",
      subject: "",
      topic: "",
      level: "",
      page: 1,
      limit: 10,
    });
  }, []);

  const handleDownload = () => {
    if (!allQuestionData?.data?.length) return;

    // Prepare data
    const exportData = allQuestionData.data.map((q) => ({
      Subject: q.subject,
      Topic: q.topic,
      Level: q.level,
      Question: q.question,
      OptionA: q.options[0],
      OptionB: q.options[1],
      OptionC: q.options[2],
      OptionD: q.options[3],
      Answer: q.answer,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
 
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
 
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "questions.xlsx");
  };

  return (
    <>
      <div className="px-[30px] pt-[20px] pb-[20px]">
        <table className="table-auto border-collapse border border-gray-400 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Subject</th>
              <th className="border border-gray-400 px-4 py-2">Topic</th>
              <th className="border border-gray-400 px-4 py-2">Level</th>
              <th className="border border-gray-400 px-4 py-2">Question</th>
              <th className="border border-gray-400 px-4 py-2">Option A</th>
              <th className="border border-gray-400 px-4 py-2">Option B</th>
              <th className="border border-gray-400 px-4 py-2">Option C</th>
              <th className="border border-gray-400 px-4 py-2">Option D</th>
              <th className="border border-gray-400 px-4 py-2">Answer</th>
              {getUser.role !== "user" && (
                <th className="border border-gray-400 px-4 py-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {allQuestionLoading ? (
              <tr className="h-[420px]">
                <td className="text-[white] text-center" colSpan={10}>
                  Loading...
                </td>
              </tr>
            ) : allQuestionData?.length === 0 ||
              allQuestionData?.data?.length === 0 ? (
              <tr className="h-[420px]">
                <td className="text-[white] text-center" colSpan={10}>
                  No Data
                </td>
              </tr>
            ) : (
              allQuestionData?.data?.map((item, index) => (
                <tr
                  key={index}
                  className="even:bg-[#00000062] text-[#f5f3f3] hover:bg-[#00000062]"
                >
                  <td className="border border-gray-400 px-4 py-2">
                    {item.subject}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.topic}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.level}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.question}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.options[0]}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.options[1]}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.options[2]}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.options[3]}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.answer}
                  </td>
                  {getUser.role !== "user" && (
                    <td className="border border-gray-400 px-4 py-2">
                      <div className="flex items-center gap-[5px]">
                        <span className="site_btn">
                          <CiEdit className="text-[24px]" />
                        </span>
                        <span className="border_btn">
                          <MdDeleteOutline className="text-[24px] text-[red]" />
                        </span>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {getUser.role === "user" && (
          <div className="flex justify-end mt-[20px]">
            <button className="site_btn flex items-center gap-[8px]" onClick={handleDownload}>
              <span>
                <FaDownload />
              </span>
              Download Excel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionList;
