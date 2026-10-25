'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

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
    <main className="min-h-screen bg-[#060911] text-white font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* NAVIGATION HEADER */}
      <nav className="border-b border-slate-800/80 bg-[#060911]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-3">
            <div className="relative h-10 sm:h-12 w-36 sm:w-40 flex items-center">
              <img 
                src="/logo.png" 
                alt="7010 Advisory Logo" 
                className="h-full w-auto object-contain rounded-sm"
              />
            </div>
          </a>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center space-x-12 text-xs font-semibold uppercase tracking-widest text-slate-300">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 focus:outline-none p-2"
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
          <div className="md:hidden bg-[#0A0F1D] border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-widest">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-[#D4AF37]">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-[#D4AF37]">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-[#D4AF37]">Services</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-[#D4AF37]">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION WITH MOBILE-OPTIMIZED BACKGROUND */}
      <section id="home" className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center py-12 sm:py-20 px-5 sm:px-6 overflow-hidden border-b border-slate-800/80">
        
        {/* Background Image & Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center sm:bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/background.png')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060911] via-[#060911]/95 sm:via-[#060911]/90 to-[#060911]/80 sm:to-[#060911]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-[#060911]/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-12">
          <div className="inline-block px-2.5 py-1 bg-black/50 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 rounded-sm">
            Washington-Based. Globally Connected.
          </div>
          
          <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] text-white mb-6 sm:mb-8 tracking-tight max-w-4xl">
            Navigating Complexity. <br />
            Shaping Conversations. <br />
            <span className="text-[#D4AF37] italic">Advancing Interests.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
            7010 Advisory is a Washington, DC-based boutique advisory firm specializing in strategic communications, geopolitical risk, and reputation management.
          </p>

          <div>
            <a 
              href="#services" 
              className="inline-flex items-center space-x-3 px-6 py-3.5 bg-transparent border border-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg"
            >
              <span>Our Services</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT / GLOBAL PERSPECTIVE SECTION WITH second.png */}
      <section id="about" className="py-16 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          
          {/* Mobile-Optimized Image Container */}
          <div className="relative rounded-sm overflow-hidden border border-slate-800 bg-[#0A0F1D] shadow-2xl group min-h-[260px] sm:min-h-[440px] w-full flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/second.png')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>

          {/* Right Side: Text & Practice Desks */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-3 font-semibold">
              Global Perspective
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6 tracking-tight leading-tight">
              Local Insight. <br />
              <span className="italic text-slate-400">Global Perspective.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
              With deep expertise in Washington and the Middle East and North Africa, and a broader international outlook, we provide tailored guidance to help clients navigate complex political and media environments, manage reputational challenges, and advance their strategic objectives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="p-5 sm:p-6 border border-slate-800 bg-[#0A0F1D] rounded-sm">
                <h3 className="font-serif text-lg text-white mb-2">United States Practice</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Navigating federal regulatory dynamics, policy impact assessment, and tier-1 US media positioning for institutional entities.
                </p>
              </div>

              <div className="p-5 sm:p-6 border border-slate-800 bg-[#0A0F1D] rounded-sm">
                <h3 className="font-serif text-lg text-white mb-2">Middle East Practice</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Strategic counsel aligned with regional economic transformation, stakeholder engagement, and complex public affairs.
                </p>
              </div>
            </div>

            <a 
              href="#contact" 
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors"
            >
              <span>Contact Leadership</span>
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6 border-b border-slate-800/80">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2 font-semibold">
            Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-4 sm:mb-6 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Rigorous analysis and discrete execution tailored for high-stakes environments across North America and the Middle East.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="relative p-6 sm:p-10 bg-[#0A0F1D] border border-slate-800 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl overflow-hidden rounded-sm min-h-[340px] sm:min-h-[380px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-30 transition-all duration-500 pointer-events-none"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/90 to-[#0A0F1D]/70 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-3 font-normal tracking-tight">
                  {service.title}
                </h3>
                <div className="h-0.5 w-10 bg-[#D4AF37] mb-5"></div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 border-t border-slate-800/80 pt-5">
                <ul className="space-y-2.5">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0"></span>
                      <span className="tracking-wide">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 sm:py-28 max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2 font-semibold">
            Inquiry
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
            Select the capabilities you require below to start a confidential discussion with our leadership.
          </p>
        </div>

        <div className="border border-slate-800 p-6 sm:p-10 bg-[#0A0F1D] shadow-2xl rounded-sm">
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                ✓
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Message Received</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto font-light">
                Thank you for reaching out. A partner from 7010 Advisory will respond shortly.
              </p>
            </div>
          ) : (
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST"
              onSubmit={() => setFormSubmitted(true)} 
              className="space-y-6"
            >
              <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
              <input type="hidden" name="Selected Services" value={selectedServices.join(', ')} />

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-3 font-semibold">
                  Select Required Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesList.map((s) => (
                    <button
                      type="button"
                      key={s.title}
                      onClick={() => toggleService(s.title)}
                      className={`p-3 text-left text-xs font-medium border transition-all flex items-center justify-between rounded-sm ${
                        selectedServices.includes(s.title)
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-semibold'
                          : 'bg-[#060911] border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span>{s.title}</span>
                      <span>{selectedServices.includes(s.title) ? '✓' : '+'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="Full Name"
                    placeholder="Jane Doe"
                    className="w-full bg-[#060911] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                    Organization
                  </label>
                  <input
                    required
                    type="text"
                    name="Organization"
                    placeholder="Company / Sovereign Entity"
                    className="w-full bg-[#060911] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  Corporate Email
                </label>
                <input
                  required
                  type="email"
                  name="Email"
                  placeholder="name@organization.com"
                  className="w-full bg-[#060911] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600 rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#c29f2f] transition-colors shadow-lg rounded-sm"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#04060B] text-xs text-slate-500 border-t border-slate-900">
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