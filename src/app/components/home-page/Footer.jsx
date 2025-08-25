import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
   <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">ExamPrep</h2>
          <p className="text-sm leading-relaxed">
            Practice previous year papers, take mock tests, and improve your
            performance with expert-curated content.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a  className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Exams</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="hover:text-white cursor-pointer">JEE</span></li>
            <li><span className="hover:text-white cursor-pointer">NEET</span></li>
            <li><span className="hover:text-white cursor-pointer">UPSC</span></li>
            <li><span className="hover:text-white cursor-pointer">SSC</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-3">support@examprep.com</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer"><FaFacebook/></span>
            <span className="hover:text-white cursor-pointer"><FaSquareXTwitter/></span>
            <span className="hover:text-white cursor-pointer"><FaLinkedin/></span>
            <span className="hover:text-white cursor-pointer"><IoMdMail/></span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © 2025 ExamPrep. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer