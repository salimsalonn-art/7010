'use client';

import React, { useState } from 'react';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen font-sans antialiased bg-[#0A1128] text-white">
      {/* NAVIGATION HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-[#253449]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="relative h-10 sm:h-12 w-36 sm:w-40 flex items-center">
              <img src="/logo.png" alt="7010 Advisory Logo" className="h-full w-auto object-contain rounded-sm" />
            </div>
          </a>
          <div className="hidden md:flex items-center space-x-12 text-xs font-semibold uppercase tracking-widest text-[#F5F2E9]/80">
            <a href="/" className="hover:text-[#C7AA70] transition-colors">Home</a>
            <a href="/about" className="text-[#C7AA70]">About</a>
            <a href="/services" className="hover:text-[#C7AA70] transition-colors">Services</a>
            <a href="/contact" className="hover:text-[#C7AA70] transition-colors">Contact</a>
          </div>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F2E9] focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121F42] border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-widest">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Home</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-[#C7AA70]">About</a>
            <a href="/services" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Services</a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Contact</a>
          </div>
        )}
      </nav>

      {/* ABOUT CONTENT SECTION */}
      <section className="py-32 sm:py-40 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative flex items-center justify-center">
            <img
              src="/second.png"
              alt="Global Perspective Globe"
              className="w-full h-auto max-h-[800px] lg:scale-125 object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-4 font-semibold">
              Global Perspective
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F2E9] mb-6 tracking-tight leading-[1.15]">
              Local Insight. <br />
              <span className="italic text-slate-400">Global Perspective.</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-xl">
              With deep expertise in Washington and the Middle East and North Africa, and a broader international outlook, we provide tailored guidance to help clients navigate complex political and media environments, manage reputational challenges, and advance their strategic objectives.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}