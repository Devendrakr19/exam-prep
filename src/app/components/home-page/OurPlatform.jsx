import React from "react";
import { GiSpellBook } from "react-icons/gi";
import { FaPencil } from "react-icons/fa6";
import { FcBarChart } from "react-icons/fc";
import { IoShieldCheckmark } from "react-icons/io5";
import { RiDownloadCloudFill } from "react-icons/ri";

const OurPlatform = () => {
  const platformData = [
    {
      img: <GiSpellBook className="text-[90px] text-[#0553c7]"/>,
      heading: "Previous Year Questions",
      description:
        "Get access to a vast collection of previous year exam papers from the last 10 years. Practice real questions and understand the exam pattern to boost your confidence.",
    },
    {
      img: <FaPencil className="text-[90px] text-[#058b7e]"/>,
      heading: "Practice Mode",
      description:
        "Attempt topic-wise quizzes, timed mock tests, and practice sessions with instant answers and detailed explanations to strengthen your preparation step by step.",
    },
    {
      img: <FcBarChart className="text-[90px]"/>,
      heading: "Performance Tracking",
      description:
        "Track your progress with smart analytics. Identify your strengths, focus on weak areas, and measure your improvement with personalized performance reports.",
    },
    {
      img: <IoShieldCheckmark className="text-[90px] text-[#db880c]"/>,
      heading: "Expert Verified Content",
      description:
        "All study material and questions are reviewed by subject experts to ensure accuracy, relevance, and alignment with the latest exam trends and syllabus.",
    },
    {
      img: <RiDownloadCloudFill className="text-[90px] text-[#058b1b]"/>,
      heading: "Downloadable PDFs",
      description:
        "Download question banks, solutions, and notes in PDF format. Study anytime, anywhere—even without an internet connection.",
    },
  ];

  return (
    <>
      <div className="py-[20px] px-[20px]">
        <h1 className="text-center text-[40px] font-bold">
          Why Choose Our Platform
        </h1>
        <div className="flex items-center gap-[20px] mt-[20px]">
          {platformData.map((item, index) => (
            <div
              key={index}
              className="border-[1px] border-[#d1d5db] w-[280px] h-[280px] flex items-center flex-col rounded p-[10px] gap-[6px] bg-[#ffffff]"
            >
              {item?.img}
              <h1 className="text-[20px] font-medium">{item?.heading}</h1>
              <p className="text-[15px] text-center">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurPlatform;
