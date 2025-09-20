"use client";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { skills } from "../utils/FormFields";
import toast from "react-hot-toast";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import { useRouter } from "next/navigation";

const SingleQuestion = ({ setActiveTab }) => {
  const router = useRouter();
  const {createQuestion, loading } = manualQuestionStore();
  const [inputQuestion, setInputQuestion] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      category: "",
      subject: "",
      topic: "",
      level: "easy",
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

  const handleAdd = () => {
    setInputQuestion((prev) => [
      ...prev,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        category: "",
        subject: "",
        topic: "",
        level: "easy",
      },
    ]);
  };

  const handleDelete = (i) => {
    const filterQuestion = inputQuestion.filter((_, index) => index !== i);
    setInputQuestion(filterQuestion);
  };

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
      const optionsSet = new Set(q.options.map(opt => opt.trim()));
    if (optionsSet.size !== q.options.length) {
      newErrors[i].options = "Options must be unique";
      isValid = false;
    }
    });

    setErrors(newErrors);

    if(!isValid){
      return;
    }

    let result = await createQuestion(inputQuestion);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Created successfully!");
      router.push("/admindashboard/allquestion");
    }
  };

  const isLastQuestionValid = () => {
    const last = inputQuestion[inputQuestion.length - 1];

    if (!last.question.trim()) return false;
    if (!last.answer.trim()) return false;
    if (!last.category) return false;
    if (!last.subject) return false;

    return true;
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col p-[20px]">
        <form onSubmit={handleSubmit} className="w-[50%] text-[#fff]">
          <h1 className="text-center text-[22px] font-bold mb-[10px]">
            Create Question
          </h1>
          {inputQuestion.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-[20px] mb-[20px] border-[1px] border-[#dddada] rounded px-[20px] pt-[15px] pb-[25px] bg-[#1e293b]"
            >
              <div className="">
                <div className="flex flex-col">
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
                    <p className="text-red-500 text-sm mt-1">{errors[index].options}</p>
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
                    ?.items.find((sub) => sub.category === item.subject)?.topics
                    ?.length > 0 && (
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
              </div>
              <div className="flex items-center gap-[15px]">
                {inputQuestion.length > 1 && (
                  <button
                    type="button"
                    className="bg-[#ff00001d] px-[5px] py-[5px] rounded text-[red] hover:bg-[red] hover:text-[white] cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDeleteOutline className="text-[26px]" />
                  </button>
                )}
                {index === inputQuestion.length - 1 && (
                  <button
                    type="button"
                    disabled={!isLastQuestionValid()}
                    className={`px-[5px] py-[5px] rounded cursor-pointer ${
                      isLastQuestionValid()
                        ? "bg-[#05966819] text-[#059669] hover:bg-[#059669] hover:text-[white]"
                        : "bg-[#8080802c] text-gray-500"
                    }`}
                    style={{
                      cursor: isLastQuestionValid() ? "" : "not-allowed",
                    }}
                    onClick={handleAdd}
                  >
                    <IoMdAdd className="text-[26px]" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="mt-[20px] flex justify-end items-center gap-[15px]">
            <button
              type="button"
              className="border_btn"
              onClick={() => setActiveTab(null)}
            >
              Cancel
            </button>
            <button type="submit" className="site_btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleQuestion;
