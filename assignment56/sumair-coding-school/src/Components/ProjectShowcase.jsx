import React from "react";

const projects = [
  {
    title: "Portfolio Website",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    demoLink: "#",
  },
  {
    title: "E-Commerce App",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    demoLink: "#",
  },
  {
    title: "Chat Application",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    demoLink: "#",
  },
  {
    title: "Weather Dashboard",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    demoLink: "#",
  },
  {
    title: "Task Manager",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    demoLink: "#",
  },
];

const ProjectShowcase = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Some Cool Projects I’ve Built ⚡
      </h2>

      <div className="overflow-x-auto px-10 scrollbar-hide">
        <div className="flex space-x-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="min-w-[300px] sm:min-w-[350px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
