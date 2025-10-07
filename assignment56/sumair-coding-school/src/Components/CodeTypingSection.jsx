import React, { useState, useEffect } from 'react';

const CodeTypingSection = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const codeSnippets = [
    {
      language: 'JavaScript',
      code: `function buildYourFuture() {
  const skills = ['React', 'Node.js', 'Python'];
  return skills.map(skill => 
    master(skill)
  );
}`,
      color: '#f7df1e'
    },
    {
      language: 'Python',
      code: `def learn_coding():
    passion = True
    while passion:
        practice()
        build_projects()
        get_hired()`,
      color: '#3776ab'
    },
    {
      language: 'React',
      code: `const YourCareer = () => {
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    learnWithUs();
    setSuccess(true);
  }, []);
  
  return <BrightFuture />;
}`,
      color: '#61dafb'
    }
  ];

  const [snippetIndex, setSnippetIndex] = useState(0);
  const currentSnippet = codeSnippets[snippetIndex];
  const fullCode = currentSnippet.code;

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 50;
    
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < fullCode.length) {
        setDisplayedCode(fullCode.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (!isDeleting && currentIndex === fullCode.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedCode(fullCode.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setSnippetIndex((snippetIndex + 1) % codeSnippets.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullCode, snippetIndex]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#000000] via-[#144B3F] to-[#050505] flex flex-col justify-center items-center py-4 px-6">
      {/* Heading */}
      <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-light leading-[1.2] text-center text-white mb-4 max-w-5xl">
        we do whatever it takes to help you{' '}
        <span className="text-[#3ef0c9] font-normal">understand the concepts.</span>
      </h2>

      {/* Code Editor Container */}
      <div className="w-full max-w-4xl mt-16 relative">
        {/* Browser-like header */}
        <div className="bg-[#1e1e1e] rounded-t-xl px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="ml-4 text-gray-400 text-sm font-mono flex items-center space-x-2">
            <span 
              className="px-3 py-1 rounded transition-colors duration-300"
              style={{ 
                backgroundColor: `${currentSnippet.color}20`,
                color: currentSnippet.color 
              }}
            >
              {currentSnippet.language}
            </span>
          </div>
        </div>

        {/* Code Display Area */}
        <div className="bg-[#1e1e1e] rounded-b-xl p-6 min-h-[400px] relative overflow-hidden shadow-2xl">
          {/* Line numbers */}
          <div className="absolute left-0 top-0 p-6 text-gray-600 font-mono text-sm select-none">
            {displayedCode.split('\n').map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Code content */}
          <pre className="ml-12 text-[#d4d4d4] font-mono text-base leading-6 whitespace-pre-wrap">
            <code>
              {displayedCode}
              <span className="inline-block w-2 h-5 bg-[#3ef0c9] animate-pulse ml-1"></span>
            </code>
          </pre>

          {/* Decorative gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none"></div>
        </div>

        {/* Floating badges */}
        <div className="absolute -right-8 top-1/4 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold text-lg rotate-6 shadow-xl animate-bounce-slow hidden lg:block">
          Learn by Doing! 💻
        </div>

        <div className="absolute -left-8 bottom-1/4 bg-[#3ef0c9] text-black px-6 py-3 rounded-lg font-semibold text-lg -rotate-6 shadow-xl animate-bounce-slow hidden lg:block">
          Real Projects 🚀
        </div>
      </div>

      {/* Bottom features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full">
        <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-gray-800 hover:border-[#3ef0c9] transition-all duration-300">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-white text-xl font-semibold mb-2">Hands-on Learning</h3>
          <p className="text-gray-400">Write real code from day one</p>
        </div>

        <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-gray-800 hover:border-[#3ef0c9] transition-all duration-300">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-white text-xl font-semibold mb-2">Project-Based</h3>
          <p className="text-gray-400">Build portfolio-worthy projects</p>
        </div>

        <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-gray-800 hover:border-[#3ef0c9] transition-all duration-300">
          <div className="text-4xl mb-3">👨‍💻</div>
          <h3 className="text-white text-xl font-semibold mb-2">Expert Mentors</h3>
          <p className="text-gray-400">Learn from industry professionals</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-10px) rotate(6deg);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .animate-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CodeTypingSection;