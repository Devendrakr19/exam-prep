"use client";
import Link from "next/link";
import React, { useState } from "react";
import authStore from "../store/authStore";

const Signup = () => {
  const { signup, loading } = authStore();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpasword: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs((prev)=> ({...prev, [name]: value }));
  }

  const handleSubmit = (e) =>{ 
    e.preventDefault();
    const {confirmpasword, ...formData} = inputs;
    console.log(formData); 
  }

  return (
    <>
      <div className="bg-[#0f172a] h-[100vh] flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-[#1e293b] p-[15px] w-[25%] rounded shadow-xl text-[#fff]">
          <h1 className="text-center text-[22px] font-medium">Signup</h1>
          <div className="flex flex-col">
            <label>Full Name:</label>
            <input
              type="text"
              value={inputs?.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="outline-[#9d9e9f] border-[1px] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Email:</label>
            <input
              type="email"
              value={inputs?.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Phone No.:</label>
            <input
              type="text"
              value={inputs?.mobile}
              name="mobile"
              onChange={handleChange}
              placeholder="+91"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Password:</label>
            <input
              type="password"
              value={inputs?.password}
              name="password"
              onChange={handleChange}
              placeholder="******"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={inputs.confirmpasword}
              name="confirmpasword"
              onChange={handleChange}
              placeholder="******"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex justify-center mt-[20px]">
            <button type="submit" className="site_btn !px-[40px]">
              Submit
            </button>
          </div>
          <p className="text-center text-[14px] mt-[5px]">
            Already have account{" "}
            <Link href="/login" className="text-[#0177ff] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
