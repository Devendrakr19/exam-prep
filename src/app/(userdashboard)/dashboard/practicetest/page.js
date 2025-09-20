"use client";
import React, { useState } from "react";
import Questions from "@/app/components/user-dashboard-layout/practice-test/Questions";
import QuestionsFilter from "@/app/components/utils/QuestionsFilter";
import questionBankStore from "@/app/store/userstore/questionBankStore";

const PreacticeTest = () => {
  const { questionData } = questionBankStore();

  return (
    <>
      {questionData?.length > 0 || questionData?.data?.length > 0 ? (
        ""
      ) : (
        <QuestionsFilter parentName="practice test" />
      )}
      <Questions />
    </>
  );
};

export default PreacticeTest;
