import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const MotionNav = motion.nav as any;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionNav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-xl font-display font-bold text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {PERSONAL_INFO.name.split(' ')[0]}<span className="text-indigo-500">.dev</span>
        </div>

        <ul className="hidden md:flex gap-8">
          {['About', 'Experience', 'Projects'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button
           onClick={() => scrollTo('footer')}
           className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          Contact Me
        </button>
      </div>
    </MotionNav>
  );
};

export default Navbar;