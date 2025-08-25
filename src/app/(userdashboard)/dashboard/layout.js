import UserDashboardNavbar from '@/app/components/UserDashboardNavbar'
import React from 'react'

const UserDashboardLayout = ({children}) => {
  return (
    <>
      <UserDashboardNavbar/>
      {children}
    </>
  )
}

export default UserDashboardLayout