"use client";
import React, { useState } from "react";
import { practiceData } from "../utils/FormFields";

const PracticePapers = () => {
  const [activeTab, setActiveTab] = useState("IT & Computer Science");

  const handleTab = (groupName) => {
    setActiveTab(groupName);
  };

  const data = practiceData.find((it, i) => it?.group == activeTab);

  return (
    <>
      <div className="py-[20px] px-[20px]">
        <h1 className="text-center text-[30px] font-bold">
          Practice Previous Year Papers. Get Exam Ready!
        </h1>
        <div className="flex items-center justify-center gap-[20px] mt-[20px]">
          {practiceData.map((g, index) => (
            <button
              key={index}
              className={`px-[10px] py-[3px] rounded cursor-pointer text-[18px] font-medium hover:bg-[#068e8e5a] ${
                activeTab === g?.group ? "bg-[#068e8e5a]" : "bg-[#00000014]"
              }`}
              onClick={() => handleTab(g?.group)}
            >
              {g?.group}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center flex-wrap gap-[10px] mt-[30px]">
          {data?.items.map((item, index) => (
            <div
              key={index}
              className="bg-[#fff] rounded px-[10px] py-[5px]"
            >
              <h1 className=" font-medium">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PracticePapers;
