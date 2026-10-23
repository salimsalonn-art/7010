'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const servicesList = [
    {
      title: "Public Relations",
      image: "/pr.png",
      description: "Comprehensive public relations campaigns and crisis mitigation strategies for local and international markets.",
      bullets: [
        "PR Campaigns Advisory",
        "Stakeholder Management",
        "Content Copywriting",
        "Messaging Development",
        "Crisis Management"
      ]
    },
    {
      title: "Strategic Communications",
      image: "/sc.png",
      description: "Data-driven media positioning, training, and strategic advisory targeting high-impact publications and digital platforms.",
      bullets: [
        "Media Relations",
        "Media Training",
        "Media Analysis",
        "Social Media Content Advisory",
        "Social Media Strategy Advisory"
      ]
    },
    {
      title: "Executive Counsel",
      image: "/ec.png",
      description: "Tailored brand elevation and communication audits for high-net-worth leaders, executives, and public figures.",
      bullets: [
        "Personal Branding & Profiling",
        "Executive Content Copywriting",
        "Vendor Oversight",
        "Communication Plans Audit"
      ]
    },
    {
      title: "Geopolitical Risk Analysis",
      image: "/gr.png",
      description: "In-depth strategic forecasting and risk evaluation for sovereign and institutional capital across volatile global markets.",
      bullets: [
        "Strategic Forecasting",
        "Scenario Planning",
        "Risk Evaluation & Mitigation"
      ]
    },
    {
      title: "Government Affairs",
      image: "/ga.png",
      description: "Policy advisory and government relations helping clients navigate regulatory environments and advocacy challenges.",
      bullets: [
        "Public Policy Advisory",
        "Government Relations",
        "Informed Decision Making",
        "Advocacy Advisory"
      ]
    },
    {
      title: "Market Entry & Expansion",
      image: "/me.png",
      description: "End-to-end strategic advisory for entities establishing and scaling operations across the USA and GCC markets.",
      bullets: [
        "Cross-Border Market Strategy",
        "Regulatory & Partner Alignment",
        "Localization & Brand Expansion"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#0A0D14] selection:text-white">
      {/* SECTION 1: WHITE - Navigation Header */}
      <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3">
            <div className="relative h-10 w-36 flex items-center">
              <img 
                src="/logo.png" 
                alt="7010 Advisory Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-widest text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#services" className="hover:text-slate-900 transition-colors">Our Services</a>
            <a href="#desks" className="hover:text-slate-900 transition-colors">USA & GCC Desks</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>

          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-[#0A0D14] hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-wider transition-all shadow-md"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* SECTION 1 CONTINUED: WHITE - Hero Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-200">
        <div className="max-w-4xl">
          <div className="inline-block px-3.5 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-widest mb-6 font-semibold">
            Your Trusted Strategic Advisory Firm
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.12] text-slate-900 mb-8 tracking-tight">
            Navigating Power. <br className="hidden sm:inline" />
            <span className="italic font-serif text-slate-500">Shaping Perception.</span>
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl font-light">
            We are committed to helping you adapt, navigate, and expand across the USA and GCC. In times of uncertainty, we leverage our experience and cross-border network to serve your mission.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-[#0A0D14] hover:bg-slate-800 text-white font-semibold text-sm tracking-wide text-center transition-all shadow-md"
            >
              Get in Touch
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 bg-white border border-slate-300 hover:border-slate-900 text-slate-900 font-semibold text-sm tracking-wide text-center transition-all"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: BLACK - Our Services */}
      <section id="services" className="py-24 bg-[#05070B] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2 font-semibold">
              Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mb-6 tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-400 text-base leading-relaxed font-light">
              We excel in the complex domains of media relations, public policy, government affairs, and geopolitical risk analysis. Our tailored solutions ensure your voice is not only heard but also remembered across USA and GCC markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <div 
                key={index} 
                className="relative p-8 bg-[#0E121B] border border-slate-800/90 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group shadow-2xl overflow-hidden min-h-[420px] rounded-md"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-120 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0E121B] via-[#0E121B]/85 to-[#0E121B]/60 pointer-events-none"></div>

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl text-white mb-3 font-normal tracking-tight">
                    {service.title}
                  </h3>
                  <div className="h-0.5 w-10 bg-[#D4AF37] mb-5"></div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 border-t border-slate-800/80 pt-5">
                  <ul className="space-y-3">
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
        </div>
      </section>

      {/* SECTION 3: WHITE - Bilateral Operations */}
      <section id="desks" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
              Regional Reach
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">Bilateral Operations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-slate-200 bg-[#F8FAFC] hover:border-slate-400 transition-all">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2 font-semibold"></span>
              <h3 className="font-serif text-2xl text-slate-900 mb-4">United States Practice</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Nationwide policy impact assessment, cross-border investment screening, federal regulatory risk analysis, and tier-1 US media relations for global entities.
              </p>
            </div>

            <div className="p-8 border border-slate-200 bg-[#F8FAFC] hover:border-slate-400 transition-all">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2 font-semibold"></span>
              <h3 className="font-serif text-2xl text-slate-900 mb-4">GCC & Gulf Practice</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Strategic communications aligned with Saudi Vision 2030, UAE economic transformations, sovereign fund communications, and regional public affairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BLACK - Contact Section ("Get in Touch") */}
      <section id="contact" className="py-24 bg-[#05070B] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2 font-semibold">
              Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto font-light">
              Select the capabilities you require below to start a confidential discussion with our leadership.
            </p>
          </div>

          <div className="border border-slate-800 p-8 sm:p-10 bg-[#0E121B] shadow-2xl rounded-md">
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
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-6">
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
                            : 'bg-[#05070B] border-slate-800 text-slate-300 hover:border-slate-600'
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
                      placeholder="Jane Doe"
                      className="w-full bg-[#05070B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                      Organization
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Company / Sovereign Entity"
                      className="w-full bg-[#05070B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600"
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
                    placeholder="name@organization.com"
                    className="w-full bg-[#05070B] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#c29f2f] transition-colors shadow-lg"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black text-xs text-slate-500 border-t border-slate-900">
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