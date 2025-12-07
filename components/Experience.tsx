import React from 'react';
import SectionWrapper from './SectionWrapper';
import { EXPERIENCE } from '../constants';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <SectionWrapper id="experience" className="bg-slate-900/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Work Experience</h2>
        <p className="text-slate-400">My professional journey in the tech industry</p>
      </div>

      <div className="relative border-l border-slate-700 ml-4 md:ml-1/2 md:-translate-x-px space-y-12">
        {EXPERIENCE.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            
            {/* Timeline Dot */}
            <div className="absolute top-0 left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900"></div>

            <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
              
              {/* Empty side for layout balance */}
              <div className="hidden md:block w-1/2" />

              {/* Content Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors duration-300">
                  <div className="flex items-center gap-2 text-indigo-400 mb-2">
                    <Briefcase size={16} />
                    <span className="text-sm font-mono">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-slate-300 font-medium mb-3">{exp.company}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
