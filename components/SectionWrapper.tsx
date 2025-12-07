import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const MotionDiv = motion.div as any;

  return (
    <section id={id} className={`relative py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      <MotionDiv
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionDiv>
    </section>
  );
};

export default SectionWrapper;