"use client";
import manualQuestionStore from "@/app/store/adminstore/manualQuestionStore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

const ConfirmPopup = ({ open, onClose, getdeleteId, component=null }) => {
  const { getAllQusetions, deleteQuestion, deleteLoading, deleteUser, deleteUserLoading, getAllUser } = manualQuestionStore();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handlDdelete = async () =>{
    if(component === "users"){
      await deleteUser(getdeleteId); 
      toast.success("Deleted successfully!"); 
      onClose();
      getAllUser();
    } else {
      await deleteQuestion(getdeleteId);
      toast.success("Deleted successfully!");
      onClose();
      getAllQusetions({
      category: "",
      subject: "",
      topic: "",
      level: "",
      page: 1,
      limit: 10,
     });
    }
  }

  return (
    <>
      <div className="absolute top-[0px] bg-[#ffffff0c] backdrop-blur-[2px] w-[100%] h-[100vh] z-[999] flex justify-center items-center">
        <div className="bg-[white] w-[30%] px-[25px] py-[25px] rounded relative">
          <span className="absolute top-[5px] right-[5px] text-[26px] cursor-pointer" onClick={onClose}><IoCloseOutline/></span>
          <h2 className="text-xl font-semibold text-center">
            Are you sure you want to delete this {component === "users" ? "user?" : "question?"}
          </h2>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlDdelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              disabled={deleteLoading || deleteUserLoading}
            >
              {deleteLoading || deleteUserLoading ? "Proccessing..." : "Confirm Delete"}
            </button>
          </div> 
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
