"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import authStore from "../store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { login, loading, error } = authStore();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.role === "admin") {
          router.replace("/admindashboard");
        } else {
          router.replace("/dashboard");
        }
      }
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || inputs.email.trim() === "") {
      setEmailError("Email is Required");
      return;
    }
    if (!inputs.password || inputs.password.trim() === "") {
      setPasswordError("Password is Required");
      return;
    }
    try {
      let user = await login(inputs);
      if (user && !user.error) {
        toast.success("Login successful!");
        if (user.role === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(error);
      }
    } catch (er) {
      console.log("error", er);
      toast.error(er);
    }
  };

  return (
    <>
      <div className="bg-[#0f172a] h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] p-[15px] w-[25%] rounded shadow-xl text-[#fff]"
        >
          <h1 className="text-center text-[22px] font-medium">Login</h1>

          <div className="flex flex-col mt-[5px]">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {emailError && (
              <p className="text-[red] text-[12px] mt-[3px]">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col mt-[5px] relative">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="******"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {passwordError && (
              <p className="text-[red] text-[12px] mt-[3px]">{passwordError}</p>
            )}
            <span
              className="absolute top-[35px] right-[10px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOutline className="text-[20px]" />
              ) : (
                <FaRegEyeSlash className="text-[20px]" />
              )}
            </span>
          </div>
          {/* <div className="flex justify-end">
            <span className="text-[14px] cursor-pointer">Forgot password</span>
          </div> */}
          <div className="flex justify-center mt-[20px]">
            <button type="submit" className="site_btn !px-[40px]">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <p className="text-center text-[14px] mt-[5px] text-[#0177ff] underline">
            {" "}
            <Link href="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
