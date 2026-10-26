'use client';

import React, { useState } from 'react';

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const servicesList = [
    {
      title: "Strategic Communications",
      image: "/sc.png",
      description: "Data-driven media positioning, messaging architecture, and strategic advisory targeting high-impact publications and digital platforms.",
      bullets: [
        "Messaging Architecture",
        "Media Positioning",
        "Stakeholder Engagement",
        "Campaign Strategy"
      ]
    },
    {
      title: "Geopolitical Risk & Strategic Advisory",
      image: "/gr.png",
      description: "In-depth strategic forecasting and risk evaluation for sovereign and institutional capital navigating volatile global markets.",
      bullets: [
        "Strategic Forecasting",
        "Scenario Planning",
        "Risk Evaluation & Mitigation",
        "Cross-Border Alignment"
      ]
    },
    {
      title: "Media Relations & Executive Positioning",
      image: "/ec.png",
      description: "Tailored brand elevation, high-tier media outreach, and executive profiling for leaders, institutions, and public figures.",
      bullets: [
        "Executive Profiling",
        "Tier-1 Media Outreach",
        "Media Training",
        "Personal Branding"
      ]
    },
    {
      title: "Crisis Communications & Reputation Management",
      image: "/pr.png",
      description: "Comprehensive crisis mitigation strategies, reputation defense, and rapid-response messaging for high-stakes environments.",
      bullets: [
        "Crisis Mitigation",
        "Reputation Defense",
        "Rapid Response Messaging",
        "Issue Management"
      ]
    }
  ];

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
            <a href="/about" className="hover:text-[#C7AA70] transition-colors">About</a>
            <a href="/services" className="text-[#C7AA70]">Services</a>
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
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">About</a>
            <a href="/services" onClick={() => setMobileMenuOpen(false)} className="block text-[#C7AA70]">Services</a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Contact</a>
          </div>
        )}
      </nav>

      {/* SERVICES CONTENT SECTION */}
      <section className="py-32 sm:py-40 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-2 font-semibold">
            Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2E9] mb-4 sm:mb-6 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Rigorous analysis and discrete execution tailored for high-stakes environments across North America and the Middle East.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="relative p-6 sm:p-10 bg-[#121F42] border border-slate-800 hover:border-[#C7AA70] transition-all duration-300 flex flex-col justify-between group shadow-md overflow-hidden rounded-sm min-h-[340px] sm:min-h-[380px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-115 transition-all duration-500 pointer-events-none"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121F42] via-[#121F42]/90 to-[#121F42]/75 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-3 font-normal tracking-tight">
                  {service.title}
                </h3>
                <div className="h-0.5 w-10 bg-[#C7AA70] mb-5"></div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 border-t border-slate-800 pt-5">
                <ul className="space-y-2.5">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-[#C7AA70] rounded-full shrink-0"></span>
                      <span className="tracking-wide">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}