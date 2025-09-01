import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 pt-16 md:pt-20 px-4 sm:px-6 lg:ml-[320px] transition-all duration-300'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard