'use client';

import React, { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen font-sans antialiased selection:bg-[#C7AA70] selection:text-black bg-[#0A1128] text-white">
      
      {/* NAVIGATION HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-[#253449]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="relative h-10 sm:h-12 w-36 sm:w-40 flex items-center">
              <img 
                src="/logo.png" 
                alt="7010 Advisory Logo" 
                className="h-full w-auto object-contain rounded-sm"
              />
            </div>
          </a>

          {/* Centered Navigation Links - Updated to route to separate pages */}
          <div className="hidden md:flex items-center space-x-12 text-xs font-semibold uppercase tracking-widest text-[#F5F2E9]/80">
            <a href="/" className="text-[#C7AA70] transition-colors">Home</a>
            <a href="/about" className="hover:text-[#C7AA70] transition-colors">About</a>
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
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="block text-[#C7AA70]">Home</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">About</a>
            <a href="/services" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Services</a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center pt-32 pb-12 sm:pt-40 sm:pb-20 px-5 sm:px-6 overflow-hidden border-b border-slate-800">
        
        {/* Background Image & Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 mix-blend-overlay"
            style={{ backgroundImage: `url('/background.png')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/95 sm:via-[#0A1128]/90 to-[#0A1128]/80 sm:to-[#0A1128]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-[#0A1128]/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-12">
          <div className="inline-block px-3 py-1 bg-[#121F42]/80 border border-[#C7AA70]/40 text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 rounded-sm shadow-sm">
            Washington-Based. Globally Connected.
          </div>
          
          <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] text-[#F5F2E9] mb-6 sm:mb-8 tracking-tight max-w-4xl">
            Navigating Complexity. <br />
            Shaping Conversations. <br />
            <span className="text-[#C7AA70] italic">Advancing Interests.</span>
          </h1>

          <p className="text-[#F5F2E9]/90 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
            7010 Advisory is a Washington, DC-based boutique advisory firm specializing in strategic communications, geopolitical risk, and reputation management.
          </p>

          <div>
            <a 
              href="/services" 
              className="inline-flex items-center space-x-3 px-6 py-3.5 bg-transparent border border-[#C7AA70] text-[#F5F2E9] hover:bg-[#C7AA70] hover:text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg"
            >
              <span>Our Services</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#060B1A] text-xs text-slate-500 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="7010 Advisory Logo" 
              className="h-8 w-auto object-contain rounded"
            />
          </div>
          <div>© 2026 7010 Advisory. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}