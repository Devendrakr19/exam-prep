"use client"
import React from 'react'

const UploadDoc = ({setActiveTab}) => {
  return (
    <div>UploadDoc <button className='border_btn' onClick={()=> setActiveTab(null)}>Cancel</button></div>
  )
}

export default UploadDoc