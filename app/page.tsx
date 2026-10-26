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
    <main className="min-h-screen font-sans antialiased selection:bg-[#C7AA70] selection:text-black bg-[#0B132B] text-white">
      
      {/* SECTION 1: DARK NAVY - Navigation & Hero */}
      <div className="bg-[#0B132B] text-white">
        
        {/* NAVIGATION HEADER */}
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-[#0B132B]/95 backdrop-blur-md">
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
            <div className="hidden md:flex items-center space-x-12 text-xs font-semibold uppercase tracking-widest text-[#F5F2E9]/80">
              <a href="#home" className="hover:text-[#C7AA70] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#C7AA70] transition-colors">About</a>
              <a href="#services" className="hover:text-[#C7AA70] transition-colors">Services</a>
              <a href="#contact" className="hover:text-[#C7AA70] transition-colors">Contact</a>
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
            <div className="md:hidden bg-[#1C2541] border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-widest">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Contact</a>
            </div>
          )}
        </nav>

        {/* HERO SECTION */}
        <section id="home" className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center pt-32 pb-12 sm:pt-40 sm:pb-20 px-5 sm:px-6 overflow-hidden border-b border-slate-800">
          
          {/* Background Image & Gradient Overlays */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 mix-blend-overlay"
              style={{ backgroundImage: `url('/background.png')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/95 sm:via-[#0B132B]/90 to-[#0B132B]/80 sm:to-[#0B132B]/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]/70"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-12">
            <div className="inline-block px-3 py-1 bg-[#1C2541]/80 border border-[#C7AA70]/40 text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 rounded-sm shadow-sm">
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
                href="#services" 
                className="inline-flex items-center space-x-3 px-6 py-3.5 bg-transparent border border-[#C7AA70] text-[#F5F2E9] hover:bg-[#C7AA70] hover:text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg"
              >
                <span>Our Services</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: DARK NAVY - About & Global Perspective */}
      <section id="about" className="py-16 sm:py-28 bg-[#0B132B] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            
            {/* Image Container - Bigger Image */}
<div className="relative flex items-center justify-center">
  <img
    src="/second.png"
    alt="Global Perspective Globe"
    className="w-full h-auto max-h-[800px] lg:scale-125 object-contain"
  />
</div>

            {/* Right Side Text */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-3 font-semibold">
                Global Perspective
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2E9] mb-6 tracking-tight leading-tight">
                Local Insight. <br />
                <span className="italic text-slate-400">Global Perspective.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
                With deep expertise in Washington and the Middle East and North Africa, and a broader international outlook, we provide tailored guidance to help clients navigate complex political and media environments, manage reputational challenges, and advance their strategic objectives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="p-5 sm:p-6 border border-slate-800 bg-[#1C2541] rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-white mb-2">United States Practice</h3>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    Navigating federal regulatory dynamics, policy impact assessment, and tier-1 US media positioning for institutional entities.
                  </p>
                </div>

                <div className="p-5 sm:p-6 border border-slate-800 bg-[#1C2541] rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-white mb-2">Middle East Practice</h3>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    Strategic counsel aligned with regional economic transformation, stakeholder engagement, and complex public affairs.
                  </p>
                </div>
              </div>

              <a 
                href="#contact" 
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C7AA70] hover:text-white transition-colors font-semibold"
              >
                <span>Contact Leadership</span>
                <span>→</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: DARK NAVY - Core Services */}
      <section id="services" className="py-16 sm:py-28 bg-[#0B132B] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
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
                className="relative p-6 sm:p-10 bg-[#1C2541] border border-slate-800 hover:border-[#C7AA70] transition-all duration-300 flex flex-col justify-between group shadow-md overflow-hidden rounded-sm min-h-[340px] sm:min-h-[380px]"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-115 transition-all duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2541] via-[#1C2541]/90 to-[#1C2541]/75 pointer-events-none"></div>

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
        </div>
      </section>

      {/* SECTION 4: DARK NAVY - Contact Section */}
      <section id="contact" className="py-16 sm:py-28 bg-[#0B132B] text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-2 font-semibold">
              Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2E9] mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
              Select the capabilities you require below to start a confidential discussion with our leadership.
            </p>
          </div>

          <div className="border border-slate-800 p-6 sm:p-10 bg-[#1C2541] shadow-2xl rounded-sm">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-[#C7AA70]/20 border border-[#C7AA70] text-[#C7AA70] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-[#F5F2E9] mb-2">Message Received</h3>
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C7AA70] mb-3 font-semibold">
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
                            ? 'bg-[#C7AA70] border-[#C7AA70] text-black font-semibold'
                            : 'bg-[#0B132B] border-slate-800 text-slate-300 hover:border-slate-600'
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
                      className="w-full bg-[#0B132B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
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
                      className="w-full bg-[#0B132B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
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
                    className="w-full bg-[#0B132B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C7AA70] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#b5985e] transition-colors shadow-lg rounded-sm"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#060A17] text-xs text-slate-500 border-t border-slate-800">
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