"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import React, { useEffect, useState } from "react";
import { MdOutlineStopScreenShare } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmPopup from "@/app/components/utils/ConfirmPopup";
import toast from "react-hot-toast";
// import { SiMinutemailer } from "react-icons/si";

const Users = () => {
  const { getAllUser, allUsersList, allUserLoading, blockUnblockUser, blockUnblockLoading } = manualQuestionStore();
  const [open, setOpen] = useState(false);
  const [getdeleteId, setGetDeleteId] = useState(null);

  useEffect(() => {
    getAllUser();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setGetDeleteId(null);
  };
  const handleOpen = (id) => {
    setGetDeleteId(id);
    setOpen(true);
  };

  const handleBlockUser = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await blockUnblockUser(id, newStatus);
      toast.success(`User is ${newStatus ? "blocked" : "unblocked"}`);
      getAllUser();
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

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
                    <div className="flex items-center gap-[10px] relative group">
                      <span className="absolute top-[-25px] bg-[black] text-[white] rounded px-[10px] hidden group-hover:block">
                        {item?.blocked === true ? "Active" : "Block"}
                      </span>
                      <span
                        className="site_btn"
                        onClick={() => !blockUnblockLoading && handleBlockUser(item?._id, item?.blocked)}
                      >
                        {blockUnblockLoading ? (
                          "Loading..."
                        ) : item?.blocked === true ? (
                          <MdOutlineStopScreenShare className="text-[24px]" />
                        ) : (
                          <FaLaptopCode className="text-[24px]" />
                        )}
                      </span>
                      {/* <span className="site_btn"><SiMinutemailer className="text-[24px]"/></span>  */}
                      <span className="border_btn">
                        <MdDeleteOutline
                          className="text-[24px] text-[red]"
                          onClick={() => handleOpen(item?._id)}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {open && (
        <ConfirmPopup
          open={open}
          onClose={handleClose}
          getdeleteId={getdeleteId}
          component="users"
        />
      )}
    </>
  );
};

export default Users;
