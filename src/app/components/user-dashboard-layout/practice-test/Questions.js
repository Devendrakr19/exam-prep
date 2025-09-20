"use client";
import questionBankStore from "@/app/store/userstore/questionBankStore";
import React, { useState } from "react";

const Questions = () => {
  const { questionData, loading, resetQuestions } = questionBankStore();   
  const [answers, setAnswers] = useState([]);

  const handleChecked = (questionId, option) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((ans) => ans.questionId === questionId);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].answer = option;
        return updated;
      } else {
        return [...prev, { questionId, answer: option }];
      }
    });
  };


  console.log("answer", answers);
  

  return (
    <>
      <div className="pt-[20px] px-[30px] pb-[20px] max-h-[530px] overflow-auto text-[#fff]">
        {loading ? (
          <div className="h-[450px] flex items-center justify-center text-[30px]">
            Loading...
          </div>
        ) : questionData?.length === 0 || questionData?.data?.length === 0 ? (
          <div className="h-[450px] flex items-center justify-center text-[20px]">
            No Data
          </div>
        ) : (
          questionData?.data?.map((item, qindex) => (
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
                          ans.questionId === item._id && ans.answer === op
                      )
                        ? "border-[green]"
                        : "border-[#d1d5db]"
                    }`}
                    onClick={() => handleChecked(item._id, op)}
                  >
                    <input
                      type="radio"
                      name={`question-${qindex}`}
                      value={op}
                      checked={
                        answers.find(
                          (ans) =>
                            ans.questionId === item._id && ans.answer === op
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
          ))
        )}
      </div>
      {questionData?.data?.length > 0 && (
        <div className="flex justify-end gap-[15px] mt-[15px] px-[30px] pb-[20px]">
          <button
            type="button"
            className="border_btn !px-[30px]"
            onClick={() => {setAnswers([]); resetQuestions()}}
          >
            Cancel
          </button>
          <button className="site_btn !px-[30px]">Submit</button>
        </div>
      )}
    </>
  );
};

export default Questions;
