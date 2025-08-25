import React from "react";

const Profile = () => {
  return (
    <>
      <div className="w-[600px] bg-[#afe0c6] p-[20px] ml-[20px] mt-[20px] rounded shadow">
        <div className="flex items-center gap-[10px]">
          <span className="w-[40px] h-[40px] flex justify-center items-center bg-[red] rounded-full text-[white] font-bold">
            DK
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
              placeholder="Enter name"
              className="border-[1px] outline-[#000000] border-[#272828] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
          <div className="flex flex-col w-[50%]">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="border-[1px] outline-[#000000] border-[#272828] px-[10px] py-[6px] rounded mt-[2px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-[15px] mt-[15px]">
          <button className="site_btn">Save Changes</button>
          <button className="border_btn !border-[green]">Log Out</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
