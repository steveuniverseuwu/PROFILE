import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-slate-950 min-h-screen relative selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Background gradients for overall ambiance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <div id="footer">
          <Footer />
        </div>
      </div>

      <AIChat />
    </main>
  );
}

export default App;
