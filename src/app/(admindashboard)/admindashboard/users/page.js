import React from "react";

const Users = () => {
  
  const userData =[
    {user_name:"Devendra", email:"dev@gmail.com", mobile_number:9608950496, test_score:86, created:"13/06/2025", status:"Active"},
    {user_name:"Devendra", email:"dev@gmail.com", mobile_number:9608950496, test_score:75, created:"13/06/2025", status:"Block"},
    {user_name:"Devendra", email:"dev@gmail.com", mobile_number:9608950496, test_score:66, created:"13/06/2025", status:"Active"},
    {user_name:"Devendra", email:"dev@gmail.com", mobile_number:9608950496, test_score:55, created:"13/06/2025", status:"Block"},
    {user_name:"Devendra", email:"dev@gmail.com", mobile_number:9608950496, test_score:16, created:"13/06/2025", status:"Active"},
  ]
  return (
    <>
      <div className="px-[30px] pt-[20px] pb-[20px]">
        <table className="table-auto border-collapse border border-gray-400 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">User Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Mobile Number</th>
              <th className="border border-gray-400 px-4 py-2">Test Score</th>
              <th className="border border-gray-400 px-4 py-2">Created</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Action</th> 
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr
                key={index}
                className="even:bg-[#00000062] text-[#e1e1e1] hover:bg-[#00000062]"
              >
                <td className="border border-gray-400 px-4 py-2">
                  {item?.user_name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item?.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item?.mobile_number}
                </td>
                <td className={`border border-gray-400 px-4 py-2 ${item?.test_score >= 75 ? "text-[green]": item?.test_score >= 50 ? "text-[orange]":"text-[red]"}`}>
                  {item?.test_score}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item?.created}
                </td>
                <td className="border border-gray-400 px-4 py-2" style={{color: item?.status === "Active" ? "green":"red"}}>
                  {item?.status}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                <div className="flex items-center gap-[10px]">
                  <span className="site_btn">Block</span>
                  <span className="border_btn">Send mail</span>
                </div>                  
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    </>
  );
};

export default Users;
