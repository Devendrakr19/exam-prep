"use client";
import React, { useState } from "react";

const Questions = () => {
  const questionData = [
    {
      question: "What is the answer to then mock question",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "What is the answer to then mock question3",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "What is the answer to then mock question 5",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "What is the answer to then mock question 7",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "What is the answer to then mock question 8",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "What is the answer to then mock question7",
      options: ["option 1", "option 2", "option 3", "option 4"],
    },
  ];

  const [answers, setAnswers] = useState([]); 

  const handleChecked = (question, option) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((ans) => ans.question === question);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].answer = option;
        return updated;
      } else {
        return [...prev, { question, answer: option }];
      }
    });
  };

  return (
    <>
      <div className="mt-[20px] px-[30px] pb-[20px] max-h-[530px] overflow-auto">
        {questionData.map((item, qindex) => (
          <div
            key={qindex}
            className="border-[1px] border-[#d1d5db] rounded mt-[10px] p-[10px]"
          >
            <h1 className="font-medium">
              Q{qindex + 1}
              {". "}
              {item?.question}
            </h1>
            <div className="flex items-center flex-wrap gap-[10px] mt-[10px]">
              {item.options.map((op, optindex) => (
                <div
                  key={`${qindex}-${optindex}`}
                  className={`border-[1px] w-[49.5%] p-[10px] rounded flex items-center gap-[5px] cursor-pointer ${
                    answers.find(
                      (ans) =>
                        ans.question === item.question && ans.answer === op
                    )
                      ? "border-[#0066ff]"
                      : "border-[#d1d5db]"
                  }`}
                  onClick={() => handleChecked(item.question, op)}
                >
                  <input
                    type="radio"
                    name={`question-${qindex}`}
                    value={op}
                    checked={
                      answers.find(
                        (ans) =>
                          ans.question === item.question && ans.answer === op
                      )
                        ? true
                        : false
                    }
                    readOnly
                  />
                  <span>{op}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
        <div className="flex justify-end gap-[15px] mt-[15px] px-[30px]">
          <button type="button" className="border_btn !px-[30px]" onClick={() => setAnswers([])}>Cancle</button>
          <button className="site_btn !px-[30px]">Submit</button>
        </div>
    </>
  );
};

export default Questions;
