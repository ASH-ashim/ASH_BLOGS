import { ChartBarBigIcon, Pencil, SquareUser } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";

import { HiBars3CenterLeft } from "react-icons/hi2";

import { X, Menu } from 'lucide-react'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-md bg-gray-200 mt-10 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                    {isOpen ? <RxCross1 size={24} /> : <HiBars3CenterLeft size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div 
                className={`
                    fixed top-0 mt-8  left-0 h-screen w-64 md:w-[300px] 
                    bg-white dark:bg-gray-800 border-r-2 border-gray-300 dark:border-gray-600
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:block
                    z-40 p-6 pt-20 mr-2 md:pt-10
                `}
            >
                <div className='text-center space-y-2 px-3'>
                    <NavLink 
                        className={({isActive}) => `
                            text-xl md:text-2xl 
                            ${isActive ? 'bg-gray-800 dark:bg-gray-900 text-gray-200' : 'bg-transparent text-gray-800 dark:text-gray-200'} 
                            flex items-center gap-2 p-4 rounded-2xl cursor-pointer w-full
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        `}
                        to="/dashboard/profile"
                        onClick={() => setIsOpen(false)}
                    >
                        <SquareUser size={24} />
                        <span className='font-extrabold'>Profile</span>
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => `
                            text-xl md:text-2xl 
                            ${isActive ? 'bg-gray-800 dark:bg-gray-900 text-gray-200' : 'bg-transparent text-gray-800 dark:text-gray-200'} 
                            flex items-center gap-2 p-4 rounded-2xl cursor-pointer w-full
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        `}
                        to="/dashboard/your-blog"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChartBarBigIcon size={24} />
                        <span className='font-extrabold'>Your Blogs</span>
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => `
                            text-xl md:text-2xl 
                            ${isActive ? 'bg-gray-800 dark:bg-gray-900 text-gray-200' : 'bg-transparent text-gray-800 dark:text-gray-200'} 
                            flex items-center gap-2 p-4 rounded-2xl cursor-pointer w-full
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        `}
                        to="/dashboard/write-blog"
                        onClick={() => setIsOpen(false)}
                    >
                        <Pencil size={24} />
                        <span className='font-extrabold'>Create Blog</span>
                    </NavLink>
                </div>
            </div>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    )
}

export default Sidebar