import QuestionList from '@/app/components/user-dashboard-layout/question-bank/QuestionList'
import QuestionsFilter from '@/app/components/utils/QuestionsFilter'
import React from 'react'

const AllQuestion = () => {
  return (
    <>
      <QuestionsFilter parentName={"Question bank"}/> 
      <QuestionList/>
    </>
  )
}

export default AllQuestion