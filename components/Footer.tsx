import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-white/10 text-center text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
        <p className="mt-2 text-xs">Built with React, Tailwind & Gemini API</p>
      </div>
    </footer>
  );
};

export default Footer;
