import axios from 'axios'; 
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"; 

const PopularAuthors = () => {
    const [popularUser, setPopularUser] = useState([]);

    const getAllUsers = async () => {
        try {
            const res = await axios.get(`https://ash-blogs.onrender.com/api/v1/user/all-users`)
            if (res.data.success) {
                setPopularUser(res.data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='py-8 sm:py-12'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6'>
                <div className='flex flex-col space-y-4 items-center'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                        Popular Authors
                    </h1>
                    <hr className='w-20 sm:w-24 border-2 border-red-700 rounded-full' />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 my-8 sm:my-10'>
                    {popularUser?.slice(0, 3)?.map((user) => (
                        <div key={user._id} className='flex flex-col gap-2 items-center'>
                            {user.photoUrl ? (
                                <img 
                                    src={user.photoUrl} 
                                    className='rounded-full border-2 border-gray-200 dark:border-gray-700 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover transition-transform duration-300 hover:scale-105' 
                                    alt={`${user.firstName} ${user.lastName}`} 
                                />
                            ) : (
                                <FaUser className='h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 text-gray-500 dark:text-gray-400' />
                            )}
                            <p className='font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 mt-2'>
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularAuthors
