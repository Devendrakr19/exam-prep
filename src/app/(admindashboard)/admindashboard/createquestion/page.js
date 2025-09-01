"use client"
import SingleQuestion from "@/app/components/create-question/SingleQuestion";
import UploadDoc from "@/app/components/create-question/UploadDoc";
import React, { useState } from "react";
import { LuFilePen } from "react-icons/lu";
import { LuFileDown } from "react-icons/lu";
const CreateQuestion = () => {
  const [activeTab, setActiveTab] = useState(null);

  const createOption = [
    { icon: <LuFilePen className="text-[56px]" />, title: "Create Manually" },
    { icon: <LuFileDown className="text-[56px]" />, title: "Upload PDF/Excel" },
  ];

  const handleTab = (index) => {
    setActiveTab(index)
  }
  return (
    <>
    {activeTab === null && (
      <div className="flex justify-center items-center gap-[20px] h-[80vh]">
        {createOption.map((item, index) => (
          <div
            key={index}
            className={`border-[1px] border-[#b3aeae] shadow cursor-pointer rounded p-[10px] w-[220px] h-[200px] flex justify-center items-center flex-col gap-[15px] transition-all delay-75 ${
              item?.title ? "hover:bg-[#059669] hover:text-[#fff]" : ""
            }`}
            onClick={() => handleTab(index)}
          >
            {item?.icon}
            <h1 className="text-[22px] font-bold">{item?.title}</h1>
          </div>
        ))}
      </div>
    )}

      {activeTab === 0 && (
        <SingleQuestion setActiveTab={setActiveTab}/>
      )}

      {activeTab === 1 && (
        <UploadDoc setActiveTab={setActiveTab}/>
      )}

    </>
  );
};

export default CreateQuestion;
