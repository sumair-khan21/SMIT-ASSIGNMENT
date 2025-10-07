import React from 'react'
import "../App.css"
import Cards from './Cards';

const CourseCard = () => {
  const courses = [
  {
    id: 1,
    title: "Data Science and Analytics with GenAI",
    language: "Hinglish",
    price: 6999,
    oldPrice: 12999,
    discountText: "46% OFF",
    discountType: "Limited Time Discount",
    status: "Coming soon",
    image: "/public/card1.png",
    buttonText: "Coming soon",
  },
  {
    id: 2,
    title: " Web + DSA + Aptitude",
    language: "Hinglish",
    price: 5999,
    oldPrice: 11999,
    discountText: "50% OFF",
    discountType: "Early Bird Discount",
    batchType: "Live Batch",
    status: "Job Ready",
    image: "/public/card6.png",
    buttonText: "View Details",
  },
  {
    id: 3,
    title: "DSA Domination Cohort",
    language: "Hinglish",
    price: 6600,
    oldPrice: 7500,
    discountText: "12% OFF",
    discountType: "Limited Time Discount",
    batchType: "Live Batch",
    image: "/public/card3.png",
    buttonText: "View Details",
  },
  {
    id: 4,
    title: "Full Stack Web Development Bootcamp",
    language: "Hinglish",
    price: 6999,
    oldPrice: 13999,
    discountText: "50% OFF",
    discountType: "Early Bird Discount",
    batchType: "Live Batch",
    image: "/public/card4.png",
    buttonText: "View Details",
  },
  {
    id: 5,
    title: "Python + Machine Learning Mastery",
    language: "Hinglish",
    price: 7499,
    oldPrice: 12999,
    discountText: "40% OFF",
    discountType: "Limited Time Discount",
    batchType: "Live Batch",
    image: "/public/card5.png",
    buttonText: "View Details",
  },
  {
    id: 6,
    title: "Frontend Domination: React + Next.js",
    language: "Hinglish",
    price: 5999,
    oldPrice: 10999,
    discountText: "45% OFF",
    discountType: "Early Bird Discount",
    batchType: "Live Batch",
    image: "/public/card7.png",
    buttonText: "View Details",
  },
];

  return (
    <>
   <div className="relative py-20 px-10 flex flex-col items-center text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a1a] to-[#144B3F]  opacity-20 "></div>

  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#b22222] to-[#00E5A0] mb-12 tracking-wide">
    Courses Offered
  </h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center max-w-6xl mx-auto ">
    {courses.map((data, index) => (
      <Cards key={index} data={data} />
    ))}
  </div>
</div>

    </>
  )
}

export default CourseCard
