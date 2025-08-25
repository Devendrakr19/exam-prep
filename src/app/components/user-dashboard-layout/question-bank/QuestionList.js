import React from 'react'
import { FaDownload } from "react-icons/fa";

const QuestionList = () => {
   const data = [
    {subject:"Mathematics", level:"Easy", question:"What is 2+2?", optionOne: 3, optionTwo: 2, optionThree: 4, optionFour: 5, answer:4},
    {subject:"Frontend", level:"Easy", question:"What does HTML stand for?", optionOne:"Hyper Trainer Marking Language", optionTwo:"Hyper Text Markup Language", optionThree:"High Text Machine Language", optionFour:"Hyper Text Machine Language", answer:"Hyper Text Markup Language"},
    {subject:"Science", level:"Easy", question:"Which gas do plants release during photosynthesis?", optionOne:"Carbon Dioxide", optionTwo:"Oxygen", optionThree:"Nitrogen", optionFour:"Hydrogen", answer:"Oxygen"},
    {subject:"Geography", level:"Easy", question:"Which is the largest ocean in the world?", optionOne:"Atlantic Ocean", optionTwo:"Indian Ocean", optionThree:"Pacific Ocean", optionFour:"Arctic Ocean", answer:"Pacific Ocean"},
    {subject:"History", level:"Easy", question:"Who was the first President of the United States?", optionOne:"George Washington", optionTwo:"Abraham Lincoln", optionThree:"Thomas Jefferson", optionFour:"John Adams", answer:"George Washington"},
    {subject:"Mathematics", level:"Medium", question:"What is the square root of 81?", optionOne:7, optionTwo:8, optionThree:9, optionFour:10, answer:9},
    {subject:"JavaScript", level:"Easy", question:"Which symbol is used for comments in JavaScript?", optionOne:"//", optionTwo:"<!-- -->", optionThree:"/* */", optionFour:"#", answer:"//"},
    {subject:"React", level:"Easy", question:"What hook is used for managing state in React?", optionOne:"useData", optionTwo:"useState", optionThree:"useEffect", optionFour:"useStore", answer:"useState"},
    {subject:"Science", level:"Medium", question:"What is the chemical symbol for Gold?", optionOne:"Ag", optionTwo:"Au", optionThree:"Go", optionFour:"Gd", answer:"Au"},
    {subject:"English", level:"Easy", question:"Choose the correct synonym of 'Happy'", optionOne:"Sad", optionTwo:"Angry", optionThree:"Joyful", optionFour:"Weak", answer:"Joyful"},
    {subject:"Geography", level:"Medium", question:"Which country has the largest population?", optionOne:"India", optionTwo:"USA", optionThree:"China", optionFour:"Russia", answer:"China"},
    {subject:"History", level:"Medium", question:"In which year did World War II end?", optionOne:1942, optionTwo:1945, optionThree:1948, optionFour:1950, answer:1945},
    {subject:"Mathematics", level:"Hard", question:"What is the derivative of x^2?", optionOne:"2x", optionTwo:"x", optionThree:"x^2", optionFour:"1", answer:"2x"},
    {subject:"Backend", level:"Easy", question:"Which database is a NoSQL database?", optionOne:"MySQL", optionTwo:"PostgreSQL", optionThree:"MongoDB", optionFour:"Oracle", answer:"MongoDB"},
    {subject:"Frontend", level:"Medium", question:"Which CSS property controls text size?", optionOne:"font-style", optionTwo:"text-size", optionThree:"font-size", optionFour:"text-weight", answer:"font-size"},
    {subject:"Science", level:"Hard", question:"What is the speed of light?", optionOne:"3x10^8 m/s", optionTwo:"3x10^6 m/s", optionThree:"1.5x10^8 m/s", optionFour:"1.5x10^6 m/s", answer:"3x10^8 m/s"},
    {subject:"English", level:"Medium", question:"What is the antonym of 'Brave'?", optionOne:"Courageous", optionTwo:"Cowardly", optionThree:"Heroic", optionFour:"Bold", answer:"Cowardly"},
    {subject:"JavaScript", level:"Medium", question:"Which method is used to parse a JSON string?", optionOne:"JSON.parse()", optionTwo:"JSON.stringify()", optionThree:"parse.JSON()", optionFour:"stringify.JSON()", answer:"JSON.parse()"},
    {subject:"React", level:"Medium", question:"Which hook runs after every render by default?", optionOne:"useMemo", optionTwo:"useCallback", optionThree:"useEffect", optionFour:"useLayout", answer:"useEffect"},
    {subject:"General Knowledge", level:"Easy", question:"Which is the smallest planet in our solar system?", optionOne:"Earth", optionTwo:"Mercury", optionThree:"Mars", optionFour:"Venus", answer:"Mercury"},
    {subject:"Mathematics", level:"Medium", question:"If sin(θ) = 1, what is θ?", optionOne:"0°", optionTwo:"90°", optionThree:"180°", optionFour:"270°", answer:"90°"}
    ];

  return (
    <>
     <div className='px-[30px] pt-[20px] pb-[20px]'>
            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">Subject</th>
                    <th className="border border-gray-400 px-4 py-2">Level</th>
                    <th className="border border-gray-400 px-4 py-2">Question</th>
                    <th className="border border-gray-400 px-4 py-2">Option A</th>
                    <th className="border border-gray-400 px-4 py-2">Option B</th>
                    <th className="border border-gray-400 px-4 py-2">Option C</th>
                    <th className="border border-gray-400 px-4 py-2">Option D</th>
                    <th className="border border-gray-400 px-4 py-2">Answer</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr
                    key={index}
                    className="odd:bg-white even:bg-[#e3e3e37b] hover:bg-gray-100"
                    >
                    <td className="border border-gray-400 px-4 py-2">{item.subject}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.level}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.question}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.optionOne}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.optionTwo}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.optionThree}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.optionFour}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.answer}</td>
                    </tr>
                ))}
                </tbody>
            </table> 

            <div className='flex justify-end mt-[15px]'>
                <button className='site_btn flex items-center gap-[10px]'> <FaDownload/>Download PDF</button>
            </div>
        </div>
     </>
  )
}

export default QuestionList