"use client"
import manualQuestionStore from '@/app/store/adminstore/manualQuestionStore';
import React, { useEffect } from 'react'

const Score = () => {  
  const userId = JSON.parse(localStorage.getItem("user"));
  const {getScoreList, scoreData, scoreLoading} = manualQuestionStore();

  useEffect(()=>{
    getScoreList(userId?._id);
  },[userId?._id]) 

  return (
    <div className="w-[60%] mx-auto p-6">
      {/* Overall Performance */}
      <div className="bg-[#ffffff1e] shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[white]">Overall Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-lg font-bold">{scoreData?.overall?.totalTests || 0}</p>
            <p className="text-gray-600">Total Tests</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-lg font-bold">{scoreData?.overall?.totalCorrect || 0}</p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <p className="text-lg font-bold">{scoreData?.overall?.totalWrong || 0}</p>
            <p className="text-gray-600">Wrong Answers</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="text-lg font-bold">{scoreData?.overall?.overallPercentage || 0}%</p>
            <p className="text-gray-600">Overall</p>
          </div>
        </div>
      </div>

      {/* Each Test Result */}
      <div className="space-y-4">
        {scoreData?.results?.map((test, index) => {
          const percentage = ((test.score / test.total) * 100).toFixed(2);
          return (
            <div
              key={test._id || index}
              className="bg-[#ffffff1e] shadow-md rounded-xl p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-[white]">
                  {test?.subject} - {new Date(test.createdAt).toDateString()}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    percentage >= 60
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-lg font-bold">{test?.total}</p>
                  <p className="text-gray-600 text-sm">Total</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="text-lg font-bold">{test?.score}</p>
                  <p className="text-gray-600 text-sm">Correct</p>
                </div>
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-lg font-bold">
                    {test?.total - test?.score}
                  </p>
                  <p className="text-gray-600 text-sm">Wrong</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md hidden md:block">
                  <p className="text-lg font-bold">{percentage}%</p>
                  <p className="text-gray-600 text-sm">Percentage</p>
                </div>
              </div>

              {/* Optional: Expand Answers */}
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-600">
                  View Answers
                </summary>
                <ul className="mt-2 space-y-2">
                  {test.answers.map((ans, i) => (
                    <li
                      key={i}
                      className={`p-3 rounded-md ${
                        ans.isCorrect ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <p className="font-medium">Q.{i + 1} {" "}{ans.question}</p>
                      <p className="text-sm">
                        Your Answer:{" "}
                        <span
                          className={`font-bold ${
                            ans.isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {ans.userAnswer}
                        </span>
                      </p>
                      {!ans.isCorrect && (
                        <p className="text-sm">
                          Correct Answer:{" "}
                          <span className="font-bold text-green-600">
                            {ans.correctAnswer}
                          </span>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Score