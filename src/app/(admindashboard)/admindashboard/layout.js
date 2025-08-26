import AdminDashboardNav from '@/app/components/AdminDashboardNav'
import React from 'react'

const AdminLayout = ({chidren}) => {
  return (
    <>
    <AdminDashboardNav/>
    {chidren}
    </>
  )
}

export default AdminLayout