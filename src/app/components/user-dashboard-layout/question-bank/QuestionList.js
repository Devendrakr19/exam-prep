"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import React, { useEffect } from "react";
import { FaDownload } from "react-icons/fa";

const QuestionList = () => {
  const { allQuestionData, allQuestionLoading } = manualQuestionStore();

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
  const data = [
    {
      subject: "Mathematics",
      level: "Easy",
      question: "What is 2+2?",
      optionOne: 3,
      optionTwo: 2,
      optionThree: 4,
      optionFour: 5,
      answer: 4,
    },
  ];

  return (
    <>
      <div className="px-[30px] pt-[20px] pb-[20px]">
        <table className="table-auto border-collapse border border-gray-400 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Subject</th>
              <th className="border border-gray-400 px-4 py-2">Level</th>
              <th className="border border-gray-400 px-4 py-2">Question</th>
              <th className="border border-gray-400 px-4 py-2">Option A</th>
              <th className="border border-gray-400 px-4 py-2">Option B</th>
              <th className="border border-gray-400 px-4 py-2">Option C</th>
              <th className="border border-gray-400 px-4 py-2">Option D</th>
              <th className="border border-gray-400 px-4 py-2">Answer</th>
            </tr>
          </thead>
          <tbody>
            {true ? (
              <tr className="h-[450px]">
                <td className="text-[white] text-center" colSpan={8}>
                  Loading...
                </td>
              </tr>
            ) : allQuestionData?.data?.length === 0 ? (
              <tr className="h-[450px]">
                <td className="text-[white] text-center" colSpan={8}>
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
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-[15px]">
          <button className="site_btn flex items-center gap-[10px]">
            {" "}
            <FaDownload />
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionList;
