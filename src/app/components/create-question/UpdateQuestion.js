"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { skills } from "../utils/FormFields";
import toast from "react-hot-toast";

const UpdateQuestion = ({ editOpen, editClose, getEditId }) => {
  const router = useRouter();
  const { updateQuestion, getAllQusetions, updateLoading } =
    manualQuestionStore();
  const [inputQuestion, setInputQuestion] = useState([
    {
      question: getEditId ? getEditId?.question : "",
      options:
        getEditId?.options?.length === 4 ? getEditId.options : ["", "", "", ""],
      answer: getEditId ? getEditId?.answer : "",
      category: getEditId ? getEditId?.category : "",
      subject: getEditId ? getEditId?.subject : "",
      topic: getEditId ? getEditId?.topic : "",
      level: getEditId ? getEditId?.level : "easy",
    },
  ]);

  const [errors, setErrors] = useState(
    inputQuestion.map(() => ({
      question: "",
      answer: "",
      category: "",
      subject: "",
    }))
  );

  const handleChange = (index, field, value, optIndex = null) => {
    const updated = [...inputQuestion];

    if (field === "question") {
      updated[index].question = value;
    } else if (field === "answer") {
      updated[index].answer = value;
    } else if (field === "options") {
      updated[index].options[optIndex] = value;
    } else {
      updated[index][field] = value;
    }
    setInputQuestion(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = inputQuestion.map(() => ({
      question: "",
      answer: "",
      category: "",
      subject: "",
    }));

    let isValid = true;

    inputQuestion.forEach((q, i) => {
      if (!q.question.trim()) {
        newErrors[i].question = "Question is required";
        isValid = false;
      }
      if (!q.answer.trim()) {
        newErrors[i].answer = "Answer is required";
        isValid = false;
      }
      if (!q.category) {
        newErrors[i].category = "Category is required";
        isValid = false;
      }
      if (!q.subject) {
        newErrors[i].subject = "Subject is required";
        isValid = false;
      }
      if (q.answer && !q.options.includes(q.answer)) {
        newErrors[i].answer = "Answer must match one of the options";
        isValid = false;
      }
      const optionsSet = new Set(q.options.map((opt) => opt.trim()));
      if (optionsSet.size !== q.options.length) {
        newErrors[i].options = "Options must be unique";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) {
      return;
    }
    const formData = {
      _id: getEditId?._id,
      ...inputQuestion[0],
    }; 
    
    let result = await updateQuestion(formData);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Updated successfully!");
      editClose();
      getAllQusetions({
        category: "",
        subject: "",
        topic: "",
        level: "",
        page: 1,
        limit: 10,
      });
    }
  };

  useEffect(() => {
    if (editOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editOpen]);

  return (
    <>
      <div className="absolute top-[0px] bg-[#ffffff0c] backdrop-blur-[2px] w-[100%] h-[100vh] z-[999] flex justify-center items-center">
        <div className="bg-[#1e293b] w-[60%] px-[25px] py-[25px] rounded relative shadow-2xl text-[white]">
          <span
            className="absolute top-[5px] right-[5px] text-[26px] cursor-pointer"
            onClick={editClose}
          >
            <IoCloseOutline />
          </span>
          <form onSubmit={handleSubmit} className=" ">
            <h1 className="text-center text-[22px] font-bold mb-[10px]">
              Update Question
            </h1>
            {inputQuestion.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-[20px] mb-[20px] border-[1px] border-[#dddada] rounded px-[20px] pt-[15px] pb-[25px]"
              >
                <div className="">
                  <div className="flex flex-wrap gap-[10px]">
                    <div className="flex flex-col w-[49%]">
                      <label>
                        Category <span className="text-[red]">*</span>
                      </label>
                      <select
                        value={item.category}
                        onChange={(e) =>
                          handleChange(index, "category", e.target.value)
                        }
                        className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[8px] bg-[#ffffff00]"
                      >
                        <option value="" className="text-[black]">
                          -- Select --
                        </option>
                        {skills.map((skill, idx) => (
                          <option
                            key={idx}
                            value={skill?.group}
                            className="text-[black]"
                          >
                            {skill?.group}
                          </option>
                        ))}
                      </select>
                      {errors[index]?.category && (
                        <p className="text-red-500 text-sm">
                          {errors[index].category}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-[49%]">
                      <label>
                        Subject <span className="text-[red]">*</span>
                      </label>
                      <select
                        value={item.subject}
                        onChange={(e) =>
                          handleChange(index, "subject", e.target.value)
                        }
                        className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[8px] bg-[#ffffff00]"
                      >
                        <option value="" className="text-[black]">
                          -- Select --
                        </option>
                        {skills
                          .find((s) => s.group === item.category)
                          ?.items.map((sub, idx) => (
                            <option
                              key={idx}
                              value={sub.category}
                              className="text-[black]"
                            >
                              {sub.category}
                            </option>
                          ))}
                      </select>
                      {errors[index]?.subject && (
                        <p className="text-red-500 text-sm">
                          {errors[index].subject}
                        </p>
                      )}
                    </div>

                    {/* Topic */}
                    {skills
                      .find((s) => s.group === item.category)
                      ?.items.find((sub) => sub.category === item.subject)
                      ?.topics?.length > 0 && (
                      <div className="flex flex-col w-[49%]">
                        <label>Topic</label>
                        <select
                          value={item.topic}
                          onChange={(e) =>
                            handleChange(index, "topic", e.target.value)
                          }
                          className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[8px]  bg-[#ffffff00]"
                        >
                          <option value="" className="text-[black]">
                            -- Select --
                          </option>
                          {skills
                            .find((s) => s.group === item.category)
                            ?.items.find((sub) => sub.category === item.subject)
                            ?.topics.map((tp, idx) => (
                              <option
                                key={idx}
                                value={tp}
                                className="text-[black]"
                              >
                                {tp}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {/* Level */}
                    <div className="flex flex-col w-[49%]">
                      <label>Level</label>
                      <select
                        value={item.level}
                        onChange={(e) =>
                          handleChange(index, "level", e.target.value)
                        }
                        className="border-[1px] border-[#d1d5db] rounded px-[10px] py-[8px] bg-[#ffffff00]"
                      >
                        <option value="easy" className="text-[black]">
                          Easy
                        </option>
                        <option value="medium" className="text-[black]">
                          Medium
                        </option>
                        <option value="hard" className="text-[black]">
                          Hard
                        </option>
                      </select>
                      {errors[index]?.level && (
                        <p className="text-red-500 text-sm">
                          {errors[index].level}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col  mt-[10px]">
                    <label
                      htmlFor="question"
                      className="text-[16px] font-semibold"
                    >
                      Q{index + 1}). Enter Your Question{" "}
                      <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        handleChange(index, "question", e.target.value)
                      }
                      className="border-[1px] border-[#717070] outline-[#504e4e] border-shad rounded px-[10px] py-[7px]"
                    />
                    {errors[index]?.question && (
                      <p className="text-red-500 text-sm">
                        {errors[index].question}
                      </p>
                    )}
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
                          value={item.options[optIndex]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "options",
                              e.target.value,
                              optIndex
                            )
                          }
                          className="border-[1px] border-[#b9b5b5] outline-[#504e4e] rounded px-[10px] py-[7px]"
                        />
                      </div>
                    ))}
                    {errors[index]?.options && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[index].options}
                      </p>
                    )}
                    <div className="flex flex-col w-[100%]">
                      <label
                        htmlFor="optionD"
                        className="text-[16px] font-semibold"
                      >
                        Answer<span className="text-[red]">*</span>
                      </label>
                      <input
                        type="text"
                        value={item.answer}
                        onChange={(e) =>
                          handleChange(index, "answer", e.target.value)
                        }
                        className="border-[1px] border-[#b9b5b5] outline-[#504e4e] rounded px-[10px] py-[7px]"
                      />
                      {errors[index]?.answer && (
                        <p className="text-red-500 text-sm">
                          {errors[index].answer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-[20px] flex justify-end items-center gap-[15px]">
              <button
                type="button"
                className="border_btn"
                onClick={() => {setInputQuestion([]); editClose()}}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="site_btn"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateQuestion;
