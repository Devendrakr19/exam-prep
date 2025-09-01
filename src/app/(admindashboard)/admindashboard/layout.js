import AdminDashboardNav from "@/app/components/AdminDashboardNav";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminDashboardNav />
      <div className="bg-[#0f172a] min-h-[calc(100vh-68px)]">
      {children}
      </div>
    </>
  );
};

export default AdminLayout;
