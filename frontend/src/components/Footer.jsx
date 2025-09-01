import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-6 md:py-8">
        
        {/* Top Section */}
        <div className="md:flex md:justify-between md:items-start">
          <div className="mb-6 md:mb-0 flex items-center gap-3">
            {/* Logo wrapper to keep it visible */}
            <div className="bg-gray-200 dark:bg-white rounded-full p-1 sm:p-2 flex items-center justify-center">
              <img 
                src="./logo.png"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain" 
                alt="Logo" 
              />
            </div>
            <span className="self-center text-xl sm:text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
              ASH
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:mt-0 mt-4">
            <div>
              <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow Me
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 flex gap-3 sm:gap-4 font-medium">
                <li>
                  <a href="https://github.com/ASH-ashim" className="hover:text-black dark:hover:text-white transition-colors">
                    <FaGithub className="w-5 h-5 sm:w-7 sm:h-7" />
                  </a>
                </li>
                <li> 
                  <a href="https://x.com/AshimBHATT15146" className="hover:text-black dark:hover:text-white transition-colors">
                    <FaXTwitter className="w-5 h-5 sm:w-7 sm:h-7" />
                  </a>
                </li>
                <li> 
                  <a href="https://www.linkedin.com/in/ashimdev23/" className="hover:text-black dark:hover:text-white transition-colors">
                    <FaLinkedinIn className="w-5 h-5 sm:w-7 sm:h-7" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 sm:my-6 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-semibold">Ashim Bhattarai</span>. 
            All Rights Reserved.
          </span>
          
          <div className="flex justify-center items-center gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            Made with <FaHeart className="text-red-500 animate-pulse w-3 h-3 sm:w-4 sm:h-4" /> 
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer