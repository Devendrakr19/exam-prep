"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  // console.log("user", user);
  useEffect(() => {
    const checkUser = () => {
      const storedUser =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user"))
          : null;
      setUser(storedUser);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-[20px] py-[18px] bg-[#f3f4f6]">
        <div>
          <Image src="/logo.png" width={60} height={60} alt="logo" />
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
          {user ? (
            <Link
              href={user?.role === "admin" ? "/admindashboard" : "/dashboard"}
            >
              <button className="site_btn cursor-pointer">Dashboard</button>
            </Link>
          ) : (
            <Link href="/signup">
              <button className="site_btn cursor-pointer">Signup</button>
            </Link>
          )}
          {/* <Link href="/signup">
          <button className="site_btn cursor-pointer">Signup</button>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
