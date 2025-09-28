"use client"
import authStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const {logout} = authStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const profileData = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Successfully logged out");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  function getInitials(fullName) {
    if (!fullName) return "";

    const names = fullName.trim().split(" ");
    const firstInitial = names[0]?.[0]?.toUpperCase() || "";
    const lastInitial = names[1]?.[0]?.toUpperCase() || "";

    return firstInitial + lastInitial;
  } 



  return (
    <>
      <div className="pl-[20px] pt-[20px] ">
        <div className="w-[600px] bg-[#1e293b] p-[20px] rounded shadow text-[#fff] ">
          <div className="flex items-center gap-[10px]">
            <span className="w-[40px] h-[40px] flex justify-center items-center bg-[red] rounded-full font-bold">
              {getInitials(profileData?.name)}
            </span>
            <div className="flex flex-col">
              <span className="font-bold">Profile</span>
              <span className="text-[14px] leading-[20px]">
                Update your name and email
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[10px] mt-[20px]">
            <div className="flex flex-col w-[50%]">
              <label>Name</label>
              <input
                type="text"
                value={profileData?.name || ""}
                readOnly
                placeholder="Enter name"
                className="border-[1px] outline-[#000000] border-[#d0d3d3] px-[10px] py-[6px] rounded mt-[2px]"
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <label>Email:</label>
              <input
                type="email"
                value={profileData?.email || ""}
                readOnly
                placeholder="Enter Email"
                className="border-[1px] outline-[#000000] border-[#d0d3d3] px-[10px] py-[6px] rounded mt-[2px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            {/* <button className="site_btn">Save Changes</button> */}
            <button className="border_btn" onClick={handleLogout}>{loading ? "Loging out..." : "Log Out"}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
