import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <SectionWrapper id="projects">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Featured Projects</h2>
        <p className="text-slate-400">A selection of my recent work</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      className="group relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 h-full flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 20px 30px -10px rgba(99, 102, 241, 0.3)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
           <button className="p-3 bg-white text-black rounded-full hover:bg-indigo-400 hover:text-white transition-all hover:scale-110 transform translate-y-4 group-hover:translate-y-0 duration-300">
             <ExternalLink size={20} />
           </button>
           <button className="p-3 bg-white text-black rounded-full hover:bg-indigo-400 hover:text-white transition-all hover:scale-110 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
             <Github size={20} />
           </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-md border border-indigo-500/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Projects;