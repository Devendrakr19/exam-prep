"use client";
import Link from "next/link";
import React, { useState } from "react";
import authStore from "../store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Signup = () => {
  const { signup, loading } = authStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPaswordError, setConfirmPasswordError] = useState("");

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpasword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setInputs((prev) => ({ ...prev, [name]: onlyNums }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "name") setNameError("");
    if (name === "email") setEmailError("");
    if (name === "mobile") setMobileError("");
    if (name === "password") setPasswordError("");
    if (name === "confirmpasword") setConfirmPasswordError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (!inputs.name || inputs.name.trim() === "") {
      setNameError("Full Name is Required");
      isValid = false;
    }
    if (!inputs.email || inputs.email.trim() === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (!inputs.mobile || inputs.mobile.trim() === "") {
      setMobileError("Mobile is Required");
      isValid = false;
    }
    if (!inputs.password || inputs.password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    } else if (inputs.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!inputs.confirmpasword || inputs.confirmpasword.trim() === "") {
      setConfirmPasswordError("Confirm Password is Required");
      isValid = false;
    }
    if (
      inputs.password &&
      inputs.confirmpasword &&
      inputs.password !== inputs.confirmpasword
    ) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { confirmpasword, ...formData } = inputs;
    await signup(formData).then(() => {
      toast.success("Successfully sinup!");
    });
    router.push("/login");
  };

  return (
    <>
      <div className="bg-[#0f172a] h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] p-[15px] w-[25%] rounded shadow-xl text-[#fff]"
        >
          <h1 className="text-center text-[22px] font-medium">Signup</h1>
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              value={inputs?.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="outline-[#9d9e9f] border-[1px] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {nameError && (
              <p className="text-[red] text-[12px] mt-[3px]">{nameError}</p>
            )}
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Email</label>
            <input
              type="email"
              value={inputs?.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {emailError && (
              <p className="text-[red] text-[12px] mt-[3px]">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col mt-[5px]">
            <label>Phone No.</label>
            <input
              type="text"
              value={inputs?.mobile}
              name="mobile"
              onChange={handleChange}
              placeholder="+91"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {mobileError && (
              <p className="text-[red] text-[12px] mt-[3px]">{mobileError}</p>
            )}
          </div>
          <div className="flex flex-col mt-[5px] relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={inputs?.password}
              name="password"
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
          <div className="flex flex-col mt-[5px] relative">
            <label>Confirm Password</label>
            <input
              type={showConPassword ? "text" : "password"}
              value={inputs.confirmpasword}
              name="confirmpasword"
              onChange={handleChange}
              placeholder="******"
              className="border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]"
            />
            {confirmPaswordError && (
              <p className="text-[red] text-[12px] mt-[3px]">
                {confirmPaswordError}
              </p>
            )}
            <span
              className="absolute top-[35px] right-[10px] cursor-pointer"
              onClick={() => setShowConPassword(!showConPassword)}
            >
              {showConPassword ? (
                <IoEyeOutline className="text-[20px]" />
              ) : (
                <FaRegEyeSlash className="text-[20px]" />
              )}
            </span>
          </div>
          <div className="flex justify-center mt-[20px]">
            <button
              type="submit"
              className="site_btn !px-[40px]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
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
