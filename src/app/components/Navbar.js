import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-[20px] py-[18px] bg-[#f3f4f6]">
        <div>
           <Image src="/logo.png" width={60} height={60} alt="logo"/>
        </div>
        <div className="flex items-center gap-[60px] text-[17px] font-medium">
          <Link href="/" className="hover:text-[#825a05]">
            <span>Home</span>
          </Link>
          <Link href="/about" className="hover:text-[#825a05]">
            <span>About</span>
          </Link>
          <Link href="/contact" className="hover:text-[#825a05]">
            <span>Contact</span>
          </Link>
          <Link href="/help" className="hover:text-[#825a05]">
            <span>Help</span>
          </Link>
        </div>
        <div>
          <Link href="/signup">
          <button className="site_btn cursor-pointer">Signup</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
