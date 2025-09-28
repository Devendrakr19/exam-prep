"use client";
import questionBankStore from "@/app/store/userstore/questionBankStore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { usePathname } from "next/navigation";

const Questions = () => {
  const pathname = usePathname();
  const { questionData, loading, resetQuestions, submitTest, submitTestLoading, submitedData, resetTest} = questionBankStore();

  const [answers, setAnswers] = useState([]);
  const [isSubmited, setIsSubmited] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (submitedData?.details) {
      setIsSubmited(submitedData.details);
    }
  }, [submitedData]);

  const handleChecked = (questionId, option) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex(
        (ans) => ans.questionId === questionId
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].answer = option;
        return updated;
      } else {
        return [...prev, { questionId, answer: option }];
      }
    });
  };

  const handleSumit = async () => {
    const formData = {
      answers: answers,
    };
    const res = await submitTest(formData);
    if (res?.success == true) {
      toast.success("Test submited!");
    } else {
      toast.error("submit failded");
    }
  };

  const resultRef = useRef();

  const handledownload = async () => {
    setDownloading(true);
    setTimeout(async () => {
      const input = resultRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: "#111",
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("test_result.pdf");
      setDownloading(false);
    }, 500);
  };

  useEffect(() => {
    setAnswers([]);
    setIsSubmited([]);
    setDownloading(false);
    resetQuestions();
    resetTest();
  }, [pathname]);

  return (
    <>
      {isSubmited.length === 0 && (
        <>
          <div className="pt-[20px] px-[30px] pb-[20px] max-h-[530px] overflow-auto text-[#fff]">
            {loading ? (
              <div className="h-[450px] flex items-center justify-center text-[30px]">
                Loading...
              </div>
            ) : questionData?.length === 0 ||
              questionData?.data?.length === 0 ? (
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
                onClick={() => {
                  setAnswers([]);
                  resetQuestions();
                }}
              >
                Cancel
              </button>
              <button
                className="site_btn !px-[30px]"
                onClick={handleSumit}
                disabled={submitTestLoading}
              >
                {submitTestLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </>
      )}

      {isSubmited.length > 0 && (
        <div className="text-[white] px-[30px]">
          <div ref={resultRef}>
            <h1 className="text-center text-[22px] font-bold pt-[15px]">
              {" "}
              Test Result
            </h1>
            <span>
              Score : {submitedData?.correct} / {submitedData?.total} (
              {((submitedData?.correct / submitedData?.total) * 100).toFixed(2)}
              %)
            </span>
            {isSubmited?.map((item, qindex) => (
              <div key={qindex} className="mt-[10px] p-[10px]">
                <h1 className="font-medium">
                  Q{qindex + 1}
                  {". "}
                  {item?.question}
                </h1>
                <div className="flex items-center flex-wrap gap-[10px] mt-[10px]">
                  {item.options.map((op, optindex) => (
                    <div
                      key={`${qindex}-${optindex}`}
                      className={`w-[49.5%] p-[10px] flex items-center gap-[5px] cursor-pointer`}
                    >
                      {(op === item?.yourAnswer && item?.isCorrect === true) ||
                      (op === item?.correctAnswer &&
                        item?.isCorrect === false) ? (
                        <div className="flex items-center gap-[8px]">
                          <FaCheck className="text-[green]" />
                          <span>{op}</span>{" "}
                        </div>
                      ) : op === item?.yourAnswer &&
                        item?.isCorrect === false ? (
                        <div className="flex items-center gap-[8px]">
                          <IoMdClose className="text-[#ff0000]" />
                          <span>{op}</span>
                        </div>
                      ) : (
                        <span>{op}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-[15px] mt-[15px] px-[30px] pb-[20px]">
            <button
              type="button"
              className="border_btn !px-[30px]"
              onClick={() => {
                setAnswers([]);
                setIsSubmited([]);
                resetQuestions();
                resetTest();
              }}
            >
              Back
            </button>
            <button
              className="site_btn !px-[30px]"
              onClick={handledownload}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
