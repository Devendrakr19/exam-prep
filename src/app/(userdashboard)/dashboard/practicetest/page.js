"use client";
import React, { useState } from "react";
// import { skills } from "../../../components/utils/FormFields";
import Questions from "@/app/components/user-dashboard-layout/practice-test/Questions";
import QuestionsFilter from "@/app/components/utils/QuestionsFilter";

const PreacticeTest = () => {
  // const [selectedCategory, setSelectCategory] = useState("");
  // const [selectedSubject, setSelectedSubject] = useState("");
  // const [selectedTopic, setSelectedTopic] = useState("");
  // const [selectedPage, setSelectedPage] = useState("");
  // const [selectedLevel, setSelectedLevel] = useState("");
  // const getsubject = skills.find((sub, i) => sub?.group == selectedCategory);
  // const getTopic = getsubject?.items.find((tp, i) => tp?.category == selectedSubject);

  // const perPageData = [
  //   { title: 10, value: "10" },
  //   { title: 20, value: "20" },
  //   { title: 30, value: "30" },
  //   { title: 40, value: "40" },
  //   { title: 50, value: "50" },
  //   { title: 100, value: "100" },
  //   { title: 150, value: "150" },
  // ];

  return (
    <>
    <QuestionsFilter parentName="practice test"/>
    <Questions/>

      {/* <div className="flex justify-between items-center px-[30px] pt-[15px]">
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[5px]">
            <label>Category</label>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
              className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px]"
            >
              <option value="">-- Select --</option>
              {skills.map((item, index) => (
                <option key={index} value={item?.group}>
                  {item?.group}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-[5px]">
            <label>Subject</label>
            <select
              name="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px]"
            >
              <option value="">-- Select --</option>
              {getsubject?.items.map((item, index) => (
                <option key={index} value={item?.category}>
                  {" "}
                  {item?.category}
                </option>
              ))}
            </select>
          </div>
          {getTopic?.topics.length > 0 && (
            <div className="flex items-center gap-[5px]">
              <label>Topic</label>
              <select
                name="topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px]"
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
          <div className="flex items-center gap-[5px]">
            <label>Level</label>
            <select
              name="perpage"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px]"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-center gap-[5px]">
            <label>Question per page</label>
            <select
              name="perpage"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[5px]"
            >
              {perPageData.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <button className="site_btn">Get Question</button>
        </div>
      </div> */}
    </>
  );
};

export default PreacticeTest;
