import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { PERSONAL_INFO } from "../constants";
import { Moon, Sun } from "lucide-react";

const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // FIX: Initialize state immediately to match localStorage or system preference
  // This prevents the icon from being wrong for a split second
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  const { scrollY } = useScroll();
  const MotionNav = motion.nav as any;

  // FIX: Single effect to handle DOM updates and localStorage whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionNav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          className="text-xl font-display font-bold text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {PERSONAL_INFO.name.split(" ")[0]}
          <span className="text-indigo-600">.dev</span>
        </div>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8">
            {["About", "Experience", "Projects"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-indigo-600 border border-slate-700 transition-all hover:scale-105"
              aria-label="Toggle Theme"
            >
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={() => scrollTo("footer")}
              className="hidden md:block px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </MotionNav>
  );
};

export default Navbar;
