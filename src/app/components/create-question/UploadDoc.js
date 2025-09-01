"use client";
import React, { useRef, useState } from "react";
import { LuFileDown } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const UploadDoc = ({ setActiveTab }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const inputFileRef = useRef();
//   console.log("uploadedFile", uploadedFile);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handelDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setUploadedFile(file);
  };

  const handelDrag = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div
          className={`w-[80%] h-[200px] bg-[#1e293b] border-[1px] text-[#fff] border-[#bdbaba] rounded mt-[20px] flex justify-center items-center flex-col cursor-pointer`}
          onClick={() => {
            if (!uploadedFile) inputFileRef.current.click();
          }}
          onDragOver={(e) => {if(!uploadedFile) handelDrag(e)}}
          onDrop={(e) => {if(!uploadedFile) handelDrop(e)}}
          style={{ cursor: uploadedFile !== null ? "not-allowed" : "" }}
        >
          <LuFileDown className="text-[60px] mb-[10px]" />
          <h1>Upload File</h1>
          <p>Drag & Drop PDF/Excel</p>
          <input
            ref={inputFileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            // accept=".pdf, .xls, .xlsx"
            disabled={!!uploadedFile}
          />
        </div>
        <div className="w-[80%]">
          {uploadedFile && (
            <>
              <div className="mt-[20px] border-[1px] border-[#bdbaba] text-[#fff] bg-[#1e293b] p-[8px] rounded flex justify-between items-center">
                <span>{uploadedFile?.name}</span>
                <button
                  type="button"
                  className="bg-[#ff00001d] px-[4px] py-[4px] rounded text-[red] hover:bg-[red] hover:text-[white] cursor-pointer"
                  onClick={() => setUploadedFile(null)}
                >
                  <MdDeleteOutline className="text-[24px]" />
                </button>
              </div>
              <div className="flex items-center justify-end gap-[10px] mt-[15px]">
                <button
                  className="border_btn"
                  onClick={() => setActiveTab(null)}
                >
                  Cancel
                </button>
                <button className="site_btn">Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadDoc;
