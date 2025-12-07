import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PERSONAL_INFO, SKILLS } from '../constants';
import { Code2, Palette, Terminal, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            About <span className="text-indigo-400">Me</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {PERSONAL_INFO.bio}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Feature icon={<Code2 className="text-blue-400" />} title="Clean Code" />
            <Feature icon={<Palette className="text-purple-400" />} title="Pixel Perfect" />
            <Feature icon={<Zap className="text-yellow-400" />} title="Performance" />
            <Feature icon={<Terminal className="text-green-400" />} title="Full Stack" />
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-6">Technical Arsenal</h3>
          <div className="space-y-4">
            {SKILLS.slice(0, 6).map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 text-sm">{skill.name}</span>
                  <span className="text-indigo-400 text-xs">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const Feature: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    {icon}
    <span className="font-medium text-slate-200">{title}</span>
  </div>
);

export default About;
