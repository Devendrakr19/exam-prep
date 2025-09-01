import AdminDashboardNav from "@/app/components/AdminDashboardNav";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminDashboardNav />
      {children}
    </>
  );
};

export default AdminLayout;
