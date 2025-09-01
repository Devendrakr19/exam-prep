"use client";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const SingleQuestion = ({ setActiveTab }) => {
  const [inputQuestion, setInputQuestion] = useState([
    {
      question: "",
      option: ["", "", "", ""],
      answer: "",
    },
  ]);

  const handleAdd = () => {
    setInputQuestion((prev) => [
      ...prev,
      {
        question: "",
        option: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const handleDelete = (i) => {
    const filterQuestion = inputQuestion.filter((_, index) => index !== i);
    setInputQuestion(filterQuestion)
  }

  const handleChange = (index, field, value, optIndex = null) => {
    const   updated = [...inputQuestion];

    if (field === "question") {
      updated[index].question = value;
    } else if (field === "answer") {
      updated[index].answer = value;
    } else if (field === "option") {
      updated[index].option[optIndex] = value;
    }
    setInputQuestion(updated);
  }

//   console.log("inputQuestion", inputQuestion);

  return (
    <>
      <div className="flex justify-center items-center flex-col p-[20px]">
        <form className="w-[50%] text-[#fff]">
          <h1 className="text-center text-[22px] font-bold mb-[10px]">Create Question</h1>
            {inputQuestion.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-[20px] mb-[20px] border-[1px] border-[#dddada] rounded px-[20px] pt-[15px] pb-[25px] bg-[#1e293b]">
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="question"
                    className="text-[16px] font-semibold"
                  >
                    Q{index + 1}). Enter Your Question
                  </label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e)=> handleChange(index, "question", e.target.value)}
                    className="border-[1px] border-[#717070] outline-[#504e4e] border-shad rounded px-[10px] py-[7px]"
                  />
                </div>
                <div className="flex flex-wrap gap-[10px] mt-[10px]">
                {["A", "B", "C", "D"].map((label, optIndex) => (
                  <div key={label} className="flex flex-col w-[49%]">
                    <label
                      htmlFor="optionA"
                      className="text-[16px] font-semibold"
                    >
                      Option {label}
                    </label>
                    <input
                      type="text"
                      value={item.option[optIndex]}
                      onChange={(e) => handleChange(index, "option", e.target.value, optIndex)}
                      className="border-[1px] border-[#b9b5b5] outline-[#504e4e] rounded px-[10px] py-[7px]"
                    />
                  </div>
                ))} 
                  <div className="flex flex-col w-[100%]">
                    <label
                      htmlFor="optionD"
                      className="text-[16px] font-semibold"
                    >
                      Answer
                    </label>
                    <input
                      type="text"
                      value={item.answer}
                      onChange={(e)=> handleChange(index, "answer", e.target.value)}
                      className="border-[1px] border-[#b9b5b5] outline-[#504e4e] rounded px-[10px] py-[7px]"
                    />
                  </div>
                </div>
              </div>
            <div className="flex items-center gap-[15px]">
            {inputQuestion.length > 1 && (
              <button type="button" className="bg-[#ff00001d] px-[5px] py-[5px] rounded text-[red] hover:bg-[red] hover:text-[white] cursor-pointer" onClick={() => handleDelete(index)}>
                <MdDeleteOutline className="text-[26px]"/>
              </button>
            )}
            {index === inputQuestion.length - 1  && (
              <button type="button" className="bg-[#05966819] px-[5px] py-[5px] rounded text-[#059669] hover:bg-[#059669] hover:text-[white] cursor-pointer" onClick={handleAdd}>
                <IoMdAdd className="text-[26px]"/>
              </button>
            )}
            </div>
          </div>
            ))}
          <div className="mt-[20px] flex justify-end items-center gap-[15px]">
            <button className="border_btn" onClick={() => setActiveTab(null)}>
              Cancel
            </button>
            <button type="button" className="site_btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleQuestion;
