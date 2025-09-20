"use client";
import AdminDashboardNav from "@/app/components/AdminDashboardNav";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => { 
    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    if (!user || user.role !== "admin") {
      router.replace("/login");  
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <>
      <AdminDashboardNav />
      <div className="bg-[#0f172a] min-h-[calc(100vh-68px)]">{children}</div>
    </>
  );
};

export default AdminLayout;
