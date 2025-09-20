"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import React, { useEffect } from "react";
import { MdOutlineStopScreenShare } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";


const Users = () => {
  const { getAllUser, allUsersList, allUserLoading } = manualQuestionStore(); 

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="px-[30px] pt-[20px] pb-[20px]">
        <table className="table-auto border-collapse border border-gray-400 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">User Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">
                Mobile Number
              </th>
              <th className="border border-gray-400 px-4 py-2">Test Score</th>
              <th className="border border-gray-400 px-4 py-2">Created</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUserLoading ? (
              <tr className="h-[420px]">
                <td className="text-[white] text-center" colSpan={10}>
                  Loading...
                </td>
              </tr>
            ) : allUsersList?.length === 0 ||
              allUsersList?.users?.length === 0 ? (
              <tr className="h-[420px]">
                <td className="text-[white] text-center" colSpan={10}>
                  No Data
                </td>
              </tr>
            ) : (
              allUsersList?.users?.map((item, index) => (
                <tr
                  key={index}
                  className="even:bg-[#00000062] text-[#e1e1e1] hover:bg-[#00000062]"
                >
                  <td className="border border-gray-400 px-4 py-2">
                    {item?.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item?.email || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item?.mobile || "N/A"}
                  </td>
                  <td
                    className={`border border-gray-400 px-4 py-2 ${
                      item?.test_score >= 75
                        ? "text-[green]"
                        : item?.test_score >= 50
                        ? "text-[orange]"
                        : "text-[red]"
                    }`}
                  >
                    {item?.test_score || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item?.created || "N/A"}
                  </td>
                  <td
                    className="border border-gray-400 px-4 py-2"
                    style={{ color: item?.blocked === true ? "red" : "green" }}
                  >
                    {item?.blocked === true ? "Blocked" : "Active"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <div className="flex items-center gap-[10px]">
                      <span className="site_btn">{item?.blocked === true ? <MdOutlineStopScreenShare className="text-[24px]"/> : <FaLaptopCode className="text-[24px]"/> }</span>
                      <span className="site_btn"><SiMinutemailer className="text-[24px]"/></span> 
                      <span className="border_btn"><MdDeleteOutline className="text-[24px] text-[red]"/></span> 
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
