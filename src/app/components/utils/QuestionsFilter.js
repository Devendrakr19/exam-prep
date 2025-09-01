"use client";
import React, { useState } from "react";
import { skills } from "../utils/FormFields"

const QuestionsFilter = ({parentName}) => {
  const [selectedCategory, setSelectCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedPage, setSelectedPage] = useState("10");
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const getsubject = skills.find((sub) => sub?.group === selectedCategory);
  const getTopic = getsubject?.items.find((tp) => tp?.category === selectedSubject);

  const perPageData = [
    { title: 10, value: "10" },
    { title: 20, value: "20" },
    { title: 30, value: "30" },
    { title: 40, value: "40" },
    { title: 50, value: "50" },
    { title: 100, value: "100" },
    { title: 150, value: "150" },
  ];

  const handleSubmit = () => {
    const fromData = ({
      category: selectedCategory,
      subject: selectedSubject,
      topic: selectedTopic,
      level: selectedLevel,
      perPage: selectedPage,
    });
    try{
        if(parentName === "Question bank"){
            //Api dispatch
        } else if (parentName === "practice test"){
            //api dispatch
        }
    } catch (error){
       console.log(error);
       
    }

  };

  return (
    <div className="flex justify-between items-center px-[30px] pt-[15px] text-[#fff]">
      <div className="flex items-center gap-[20px] flex-wrap">
        {/* Category */}
        <div className="flex items-center gap-[5px]">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectCategory(e.target.value);
              setSelectedSubject("");
              setSelectedTopic("");
            }}
            className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px] text-[#000] bg-[#ffffffe8]"
          >
            <option value="">-- Select --</option>
            {skills.map((item, index) => (
              <option key={index} value={item?.group}>
                {item?.group}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="flex items-center gap-[5px]">
          <label>Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedTopic("");
            }}
            className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px] text-[#000] bg-[#ffffffe8]"
          >
            <option value="">-- Select --</option>
            {getsubject?.items.map((item, index) => (
              <option key={index} value={item?.category}>
                {item?.category}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        {getTopic?.topics?.length > 0 && (
          <div className="flex items-center gap-[5px]">
            <label>Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px] text-[#000] bg-[#ffffffe8]"
            >
              <option value="">-- Select --</option>
              {getTopic?.topics.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Level */}
        <div className="flex items-center gap-[5px]">
          <label>Level</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px] text-[#000] bg-[#ffffffe8]"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Per page */}
        <div className="flex items-center gap-[5px]">
          <label>Question per page</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px] text-[#000] bg-[#ffffffe8]"
          >
            {perPageData.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="site_btn"
        onClick={handleSubmit}
      >
        {parentName === "Question bank" ? "Search" : "Get Question"}
      </button>
    </div>
  );
};

export default QuestionsFilter;
