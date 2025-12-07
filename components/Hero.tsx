import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;
  const MotionImg = motion.img as any;

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-4 overflow-hidden pt-20 md:pt-0">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 mb-4 border border-indigo-500/30 rounded-full bg-indigo-500/10 backdrop-blur-sm">
                <span className="text-indigo-300 text-sm font-medium tracking-wide uppercase">
                    {PERSONAL_INFO.role}
                </span>
            </div>
          </MotionDiv>

          <MotionH1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6"
          >
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {PERSONAL_INFO.name.split(' ')[0]}
            </span>
          </MotionH1>

          <MotionP
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed mb-8"
          >
            {PERSONAL_INFO.tagline}
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center md:justify-start"
          >
            <SocialLink href={PERSONAL_INFO.socials.github} icon={<Github size={20} />} label="GitHub" />
            <SocialLink href={PERSONAL_INFO.socials.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href={`mailto:${PERSONAL_INFO.email}`} icon={<Mail size={20} />} label="Email" />
          </MotionDiv>
        </div>

        {/* Profile Image */}
        <div className="relative order-1 md:order-2 flex justify-center">
            <MotionDiv
                 initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                 className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] animate-float"
            >
                {/* Image Glow/Backlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2rem] rotate-6 opacity-30 blur-lg animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2rem] rotate-6 opacity-20"></div>
                
                {/* Actual Image */}
                <img 
                    src={PERSONAL_INFO.profileImage} 
                    alt={PERSONAL_INFO.name}
                    className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl border-2 border-white/10 z-10"
                />
                
                {/* Floating Badge */}
                <MotionDiv 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -right-6 z-20 bg-slate-800/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-white font-medium text-sm">Open to work</span>
                    </div>
                </MotionDiv>
            </MotionDiv>
        </div>
      </div>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-slate-500 hover:text-white transition-colors z-20"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown size={32} />
      </MotionDiv>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:scale-110 text-slate-300 hover:text-white group relative"
    aria-label={label}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
      {label}
    </span>
  </a>
);

export default Hero;