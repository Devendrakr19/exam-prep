import UserDashboardNavbar from '@/app/components/UserDashboardNavbar'
import React from 'react'

const UserDashboardLayout = ({children}) => {
  return (
    <>
      <UserDashboardNavbar/>
      <div className="bg-[#0f172a] min-h-[calc(100vh-68px)]">
      {children}
      </div>
    </>
  )
}

export default UserDashboardLayout