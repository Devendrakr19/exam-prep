import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <>
    <div className='bg-[#f3f4f6] h-[100vh] flex justify-center items-center'>
      <form className='bg-[#fff] p-[15px] w-[25%] rounded shadow-xl'>
        <h1 className='text-center text-[22px] font-medium'>Login</h1>
    
        <div className='flex flex-col mt-[5px]'>
          <label>Email:</label>
          <input type='email' placeholder='Enter Email' className='border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]'/>
        </div> 
        <div className='flex flex-col mt-[5px]'>
          <label>Password:</label>
          <input type='password' placeholder='******' className='border-[1px] outline-[#9d9e9f] border-[#d1d5db] px-[10px] py-[6px] rounded mt-[2px]'/>
        </div>
        <div className='flex justify-end'>
          <span className='text-[14px] cursor-pointer'>Forgot password</span>
        </div>
        <div className='flex justify-center mt-[20px]'>
          <button type='button'  className='site_btn !px-[40px]'>
            <Link href="/dashboard">
            Submit
            </Link>
          </button>
        </div>
          <p className='text-center text-[14px] mt-[5px] text-[#0177ff] underline'> <Link href="/signup">Signup</Link></p>
      </form>
    </div>
    </>
  )
}

export default Login