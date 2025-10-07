import React from 'react'
import HeroSection from '../Components/HeroSection'
import CodeTypingSection from '../Components/CodeTypingSection'
import CourseCard from '../Components/CourseCard'

const Home = () => {
  return (
    <>
    <div className="bg-black">
    <HeroSection />
  <CodeTypingSection />
  <CourseCard />
</div>
    </>
  )
}

export default Home
