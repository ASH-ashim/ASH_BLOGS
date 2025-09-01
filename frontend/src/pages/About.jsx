import React from "react"

const About = () => {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-0 mb-10 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600 dark:text-blue-400">ASH Blog</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A place where ideas, stories, and voices come alive.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <img 
            src="about.png"
            alt="About Blog"
            className="w-full h-80 object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          />

          <div className="space-y-5">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to <span className="font-semibold">ASH Blog</span> — your creative space to 
              share thoughts, stories, and experiences with the world. Whether you're a writer, 
              a thinker, or just someone with an idea to express, this is the platform to 
              make your voice heard.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is simple: <span className="font-semibold text-blue-600 dark:text-blue-400">
              empower every storyteller</span>. We believe that every idea matters, and every 
              story has the potential to inspire, connect, and create change.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Thank you for being part of our journey. Together, let’s build a community 
              where creativity thrives and voices are celebrated.
            </p>
          </div>
        </div>

        {/* Highlight Section */}
        <div className="text-center mt-16 bg-gray-100 dark:bg-gray-900 rounded-2xl py-10 px-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌍 Join the Movement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            ASH Blog is more than just a blogging platform. It’s a community where ideas 
            cross borders, inspire minds, and bring people together. Share your voice, 
            connect with others, and shape the conversations of tomorrow.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
