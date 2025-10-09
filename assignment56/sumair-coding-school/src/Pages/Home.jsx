import React from 'react'
import HeroSection from '../Components/HeroSection'
import CodeTypingSection from '../Components/CodeTypingSection'
import CourseCard from '../Components/CourseCard'
import ProjectShowcase from '../Components/ProjectShowcase'

const Home = () => {
  return (
    <>
    <div className="bg-black">
    <HeroSection />
  <CodeTypingSection />
  <CourseCard />
  <ProjectShowcase />
</div>
    </>
  )
}

export default Home
