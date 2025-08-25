"use client"
import React, { useState } from "react"; 
import QuestionsFilter from "@/app/components/utils/QuestionsFilter";
import QuestionList from "@/app/components/user-dashboard-layout/question-bank/QuestionList";

const QuestionBank = () => { 

  return (
    <>
      <QuestionsFilter parentName={"Question bank"}/> 
      <QuestionList/>
    </>
  );
};

export default QuestionBank;
