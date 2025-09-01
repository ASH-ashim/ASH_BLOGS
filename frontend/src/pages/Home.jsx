import RecentBlogs from '@/components/RecentBlogs'
import Hero from '../components/Hero'
import { Button } from '../components/ui/button'
import React from 'react'
import PopularAuthors from '@/components/PopularAuthors'

const Home = () => {
    return (
    <div className='pt-15'>
        <Hero />
        <RecentBlogs />
        <PopularAuthors />
    </div>
    )
}

export default Home