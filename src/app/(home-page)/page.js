"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OurPlatform from "../components/home-page/OurPlatform";
import PracticePapers from "../components/home-page/PracticePapers";
import Footer from "../components/home-page/Footer";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Home = () => {
  const [slide, setSlide] = useState(0);

  const sliderData = [
    {img:"/study.jpg"},
    {img:"/teach.jpg"},
    {img:"/coding.jpg"},
    {img:"/computer.jpg"},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % sliderData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [sliderData.length]);
 
  const handlePrev = () =>{
       setSlide((prev) => prev === 0 ? sliderData.length - 1 : prev - 1);
  }
  
  const handleNext = () => {
    setSlide((prev) => prev === sliderData.length - 1 ? 0 : prev + 1);
  }

  return (
    <div className="bg-[#f3f4f6]">
      <div className="w-full h-[650px] relative">
        <Image src={sliderData[slide].img} fill alt="No img"  className="object-cover"/> 
        <button onClick={handlePrev} className="cursor-pointer absolute top-[250px] text-[80px] text-[white]"><GrFormPrevious/></button>
        <button onClick={handleNext} className="cursor-pointer absolute top-[250px] right-[0px] text-[80px] text-[white]"><MdNavigateNext/></button>
      </div>
      <OurPlatform/>
      <PracticePapers/>
      <Footer/>
    </div>
  );
};

export default Home;
