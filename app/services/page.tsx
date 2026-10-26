'use client';

import React, { useState, useEffect } from 'react';

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Page Content State
  const [headerContent, setHeaderContent] = useState({
    tag: "Capabilities",
    title: "Our Core Services",
    subtitle: "Rigorous analysis and discrete execution tailored for high-stakes environments across North America and the Middle East."
  });

  const [servicesList, setServicesList] = useState([
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
  ]);

  // Load Saved Content from LocalStorage on mount
  useEffect(() => {
    const savedHeader = localStorage.getItem('services_header_7010');
    const savedServices = localStorage.getItem('services_list_7010');
    if (savedHeader) setHeaderContent(JSON.parse(savedHeader));
    if (savedServices) setServicesList(JSON.parse(savedServices));
  }, []);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'admin' && passwordInput === '7010') {
      setIsEditing(true);
      setShowAuthModal(false);
      setAuthError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setAuthError('Invalid credentials');
    }
  };

  // Save Edits to LocalStorage
  const handleSave = () => {
    localStorage.setItem('services_header_7010', JSON.stringify(headerContent));
    localStorage.setItem('services_list_7010', JSON.stringify(servicesList));
    setIsEditing(false);
  };

  // Update Individual Service Text
  const updateServiceField = (index: number, field: string, value: string) => {
    const updated = [...servicesList];
    updated[index] = { ...updated[index], [field]: value };
    setServicesList(updated);
  };

  // Update Individual Bullet Point Text
  const updateBulletPoint = (serviceIndex: number, bulletIndex: number, value: string) => {
    const updated = [...servicesList];
    updated[serviceIndex].bullets[bulletIndex] = value;
    setServicesList(updated);
  };

  return (
    <main className="min-h-screen font-sans antialiased bg-[#0A1128] text-white relative">
      
      {/* DISCREET EDIT TOGGLE (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isEditing ? (
          <button 
            onClick={() => setShowAuthModal(true)}
            className="opacity-20 hover:opacity-100 transition-opacity bg-[#121F42] border border-slate-700 text-[#C7AA70] text-[10px] uppercase font-mono px-3 py-1.5 rounded shadow-lg"
            title="Unlock Edit Mode"
          >
            [ Edit Mode ]
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-[#121F42] border border-[#C7AA70] p-2 rounded shadow-2xl">
            <button 
              onClick={handleSave}
              className="bg-[#C7AA70] text-black text-xs font-semibold uppercase px-3 py-1 rounded hover:bg-[#b5985e] transition-colors"
            >
              Save & Lock
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-slate-400 text-xs px-2 py-1 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121F42] border border-slate-700 p-6 sm:p-8 rounded-sm max-w-sm w-full shadow-2xl">
            <h3 className="font-serif text-xl text-[#F5F2E9] mb-1">Client Edit Login</h3>
            <p className="text-slate-400 text-xs mb-6 font-mono">Enter credentials to unlock text editing.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Username</label>
                <input 
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#0A1128] border border-slate-700 p-2.5 text-sm text-white focus:outline-none focus:border-[#C7AA70]"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Password</label>
                <input 
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#0A1128] border border-slate-700 p-2.5 text-sm text-white focus:outline-none focus:border-[#C7AA70]"
                  placeholder="••••••••"
                />
              </div>

              {authError && <p className="text-red-400 text-xs font-mono">{authError}</p>}

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C7AA70] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#b5985e] transition-colors"
                >
                  Unlock
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAuthModal(false); setAuthError(''); }}
                  className="w-full py-2.5 bg-transparent border border-slate-700 text-slate-300 font-semibold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NAVIGATION HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-[#253449]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="relative h-16 sm:h-20 w-52 sm:w-64 flex items-center">
              <img
                src="/logo.png"
                alt="7010 Advisory Logo"
                className="h-full w-full object-contain"
              />
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
          {/* Section Tag */}
          {isEditing ? (
            <input 
              type="text"
              value={headerContent.tag}
              onChange={(e) => setHeaderContent({...headerContent, tag: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-xs font-mono uppercase tracking-widest p-2 mb-2 w-full rounded-sm"
            />
          ) : (
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-2 font-semibold">
              {headerContent.tag}
            </span>
          )}

          {/* Section Title */}
          {isEditing ? (
            <input 
              type="text"
              value={headerContent.title}
              onChange={(e) => setHeaderContent({...headerContent, title: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] font-serif text-3xl sm:text-5xl mb-4 p-2 w-full rounded-sm"
            />
          ) : (
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2E9] mb-4 sm:mb-6 tracking-tight">
              {headerContent.title}
            </h2>
          )}

          {/* Section Subtitle */}
          {isEditing ? (
            <textarea 
              rows={3}
              value={headerContent.subtitle}
              onChange={(e) => setHeaderContent({...headerContent, subtitle: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-slate-300 text-sm p-2 w-full rounded-sm"
            />
          ) : (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {headerContent.subtitle}
            </p>
          )}
        </div>

        {/* Services Cards Grid */}
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

              <div className="relative z-10 space-y-3">
                {/* Editable Card Title */}
                {isEditing ? (
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateServiceField(index, 'title', e.target.value)}
                    className="bg-[#0A1128] border border-[#C7AA70] text-white font-serif text-xl sm:text-2xl p-2 w-full rounded-sm"
                  />
                ) : (
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-tight">
                    {service.title}
                  </h3>
                )}

                <div className="h-0.5 w-10 bg-[#C7AA70] my-4"></div>

                {/* Editable Card Description */}
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={service.description}
                    onChange={(e) => updateServiceField(index, 'description', e.target.value)}
                    className="bg-[#0A1128] border border-[#C7AA70] text-slate-300 text-xs sm:text-sm p-2 w-full rounded-sm"
                  />
                ) : (
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                )}
              </div>

              {/* Editable Bullets List */}
              <div className="relative z-10 border-t border-slate-800 pt-5 mt-6">
                <ul className="space-y-2.5">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-[#C7AA70] rounded-full shrink-0"></span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => updateBulletPoint(index, idx, e.target.value)}
                          className="bg-[#0A1128] border border-[#C7AA70] text-slate-200 text-xs p-1 w-full rounded-sm"
                        />
                      ) : (
                        <span className="tracking-wide">{bullet}</span>
                      )}
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