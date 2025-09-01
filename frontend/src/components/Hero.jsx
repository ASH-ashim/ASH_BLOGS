import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
    return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] my-8 sm:my-12 lg:my-16">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
            Explore Latest News & Tech Trends
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 opacity-80 font-semibold text-gray-700 dark:text-gray-300">
            Stay one step ahead with every read. Simple words, meaningful ideas,
            lasting impact
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link to="/blogs">
                <Button className="text-base sm:text-lg w-full sm:w-auto">
                Get Started
                </Button>
            </Link>
            <Link to="/about">
                <Button
                variant="outline"
                className="text-base sm:text-lg w-full sm:w-auto border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900"
                >
                Learn More
                </Button>
            </Link>
            </div>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
            src="heeo.png"
            alt="Hero"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-cover"
            />
        </div>
        </div>
    </div>
   );
};

export default Hero;
