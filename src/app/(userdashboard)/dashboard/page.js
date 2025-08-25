import { redirect } from 'next/navigation'
import React from 'react'

const UserDashboard = () => {
  return (
     redirect("/dashboard/questionbank")
  )
}

export default UserDashboard