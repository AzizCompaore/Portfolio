import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { PresentationParallax } from './components/PresentationParallax';
import { Specialties } from './components/Specialties';
import { DeveloperLaptopParallax } from './components/DeveloperLaptopParallax';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#141416] selection:bg-[#F9A826] selection:text-[#141416] relative">
      {/* Subtle interactive desktop cursor */}
      <CustomCursor />

      {/* Main Experience */}
      <Navbar />

      <main>
        <PresentationParallax />
        <Specialties />
        <DeveloperLaptopParallax />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
