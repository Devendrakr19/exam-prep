"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const UserDashboardNavbar = () => {
  const location = usePathname();

  const dashboardContent = [
        {title:"Question Bank", url:"/dashboard/questionbank"},
        {title:"Practice Test", url:"/dashboard/practicetest"},
        {title:"Score", url:"/dashboard/score"},
        {title:"Profile", url:"/dashboard/profile"},
  ]
    
  return (
    <>
        <div className="flex justify-between items-center px-[20px] py-[14px] bg-[#f3f4f6]">
        <div>
           <Image src="/logo.png" width={60} height={60} alt="logo"/>
        </div>
        <div className="flex items-center gap-[10px] text-[17px] font-medium">
            {dashboardContent.map((item, index) =>(
            <Link key={index} href={item?.url} className={`${location == item?.url ? "site_btn" : "site_btn !bg-[#ffffff] !text-[#4b5563] !border-[1px] !border-[#d1d5db]"}`}>
                 {item?.title}
            </Link>
            ))} 
        </div> 
      </div>
      </>
  )
}

export default UserDashboardNavbar