import React, { useState, useEffect } from "react";

const projects = [
  {
    title: "Form Builder (MVP)",
    image: "/7.png",
    description: "Create, preview and share publish links.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment52/",
  },
  {
    title: "My Todo List",
    image: "/3.png",
    description: "What needs to be done today.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment44/",
  },
  {
    title: "Registration System",
    image: "/6.png",
    description: "Fill the form below to sign up.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment51/",
  },
  {
    title: "Student Attendance Management System",
    image: "/4.png",
    description: "Efficient and Modern Attendance Tracking Solution.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment45/",
  },
  {
    title: "Personal Portfolio",
    image: "/9.png",
    description: "A personal portfolio showcasing my web projects and skills.",
    demoLink: "https://personal-portfolio-eosin-rho.vercel.app/",
  },
  {
    title: "E-Commerce App",
    image: "/5.png",
    description:
      "A full-stack e-commerce web app with cart, checkout, and payment integration.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment48/",
  },
  {
    title: "Personal Blog",
    image: "/10.png",
    description:
      "Discover interesting stories, insights, and adventures in our carefully selected collection.",
    demoLink: "https://dynamic-blog-henna.vercel.app/",
  },
  {
    title: "Shadow Controller",
    image: "/8.png",
    description:
      "A Shadow Controller app with drag-and-drop and progress tracking.",
    demoLink: "https://sumair-khan21.github.io/SMIT-ASSIGNMENT/assignment22/",
  },
  {
    title: "Food Delivery App",
    image: "/11.png",
    description:
      "A complete food ordering experience with cart and payment flow.",
    demoLink: "https://food-tuck-rho.vercel.app/",
  },
];

const ProjectShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const visibleProjects = [...projects, ...projects.slice(0, 3)];

  return (
    <section
      id="projects"
      className="font-poppins h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#000000] via-[#144B3F] to-[#050505] overflow-hidden"
    >
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#b22222] to-[#00E5A0] mb-10">
        Some Cool Projects I’ve Built ⚡
      </h2>

      {/* Carousel */}
      <div className="overflow-hidden w-full max-w-[1400px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 352}px)`,
          }}
        >
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              className="min-w-[320px] mx-4 bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer relative group hover:scale-[1.03] transition-transform duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover opacity-90 group-hover:opacity-30 transition duration-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 text-center p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#000000] via-[#144B3F] to-[#050505] rounded-2xl p-6 max-w-md text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
            <a
              href={selectedProject.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00E5A0] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#00ffb2] transition"
            >
              Visit Project
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase;
