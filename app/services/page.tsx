'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DEFAULT_SERVICES = [
  {
    title: "Strategic Communications",
    description: "Develop and deliver tailored communications strategies that shape narratives, build credibility, and drive engagement.",
    icon: "megaphone"
  },
  {
    title: "Crisis Communications",
    description: "Prepare for, manage, and respond to high-stakes situations with speed, precision, and strategic clarity.",
    icon: "shield"
  },
  {
    title: "Geopolitical Advisory",
    description: "Assess political and security developments, identify risks and opportunities, and provide actionable insights for decision-makers.",
    icon: "globe"
  },
  {
    title: "Executive Positioning",
    description: "Define and elevate leadership profiles through targeted media engagement, thought leadership, and high-impact platforms.",
    icon: "award"
  },
  {
    title: "Market Entry & Business Advisory",
    description: "Support market assessment, stakeholder mapping, and introductions to help organizations evaluate and pursue opportunities in new or priority markets.",
    icon: "compass"
  },
  {
    title: "Media Engagement & Training",
    description: "Prepare leaders and teams for high-visibility media, investor, and policy engagements through practical, scenario-based training.",
    icon: "microphone"
  }
];

const DEFAULT_HEADER = {
  tag: "OUR SERVICES",
  titleLine1: "Strategic Counsel.",
  titleLine2: "Real-World Impact.",
  subtitle: "Targeted advisory and communications support that helps organizations anticipate risk, navigate change, and advance their objectives in complex environments."
};

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Page Content
  const [headerContent, setHeaderContent] = useState(DEFAULT_HEADER);
  const [servicesList, setServicesList] = useState(DEFAULT_SERVICES);

  // Load saved page content from Firestore
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'site_content', 'services_page');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.headerContent) {
            setHeaderContent({
              tag: data.headerContent.tag || DEFAULT_HEADER.tag,
              titleLine1: data.headerContent.titleLine1 || DEFAULT_HEADER.titleLine1,
              titleLine2: data.headerContent.titleLine2 || DEFAULT_HEADER.titleLine2,
              subtitle: data.headerContent.subtitle || DEFAULT_HEADER.subtitle
            });
          }

          if (Array.isArray(data.servicesList)) {
            const merged = DEFAULT_SERVICES.map((service, index) => ({
              ...service,
              title: data.servicesList[index]?.title || service.title,
              description: data.servicesList[index]?.description || service.description,
              // Keep icons controlled by the code so they always match their service.
              icon: service.icon
            }));
            setServicesList(merged);
          }
        }
      } catch (err) {
        console.error("Error fetching services page content:", err);
      }
    };

    fetchContent();
  }, []);

  // Handle edit-mode login
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
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

  // Save edits to Firestore
  const handleSave = async () => {
    try {
      const docRef = doc(db, 'site_content', 'services_page');
      await setDoc(docRef, { headerContent, servicesList });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving services page content:", err);
    }
  };

  // Update an individual service field
  const updateServiceField = (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setServicesList(current =>
      current.map((service, serviceIndex) =>
        serviceIndex === index
          ? { ...service, [field]: value }
          : service
      )
    );
  };

  // Service icons
  const renderIcon = (iconType: string) => {
    const commonProps = {
      className: "w-7 h-7 text-[#C7AA70]",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      viewBox: "0 0 24 24",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const
    };

    switch (iconType) {
      case 'megaphone':
        return (
          <svg {...commonProps}>
            <path d="M3 11v2a2 2 0 002 2h2l3 4v-5.2c4.1-.3 7.2-1.8 10-4.3V5.5C17.2 3 13.1 2 9 2H5a2 2 0 00-2 2v2" />
            <path d="M19 8a3 3 0 010 6M7 15l1.5 5" />
          </svg>
        );

      case 'shield':
        return (
          <svg {...commonProps}>
            <path d="M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );

      case 'globe':
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
          </svg>
        );

      case 'award':
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="8" r="5" />
            <path d="M8.5 12l-1 9 4.5-2.5 4.5 2.5-1-9" />
            <path d="M12 5.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2L12 5.5z" />
          </svg>
        );

      case 'compass':
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M15.8 8.2l-2.4 5.2-5.2 2.4 2.4-5.2 5.2-2.4z" />
          </svg>
        );

      case 'microphone':
        return (
          <svg {...commonProps}>
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen font-sans antialiased bg-[#0A1128] text-white relative overflow-hidden">

      {/* DISCREET EDIT TOGGLE */}
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
            <p className="text-slate-400 text-xs mb-6 font-mono">
              Enter credentials to unlock text editing.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Username
                </label>
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
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#0A1128] border border-slate-700 p-2.5 text-sm text-white focus:outline-none focus:border-[#C7AA70]"
                  placeholder="••••••••"
                />
              </div>

              {authError && (
                <p className="text-red-400 text-xs font-mono">{authError}</p>
              )}

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C7AA70] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#b5985e] transition-colors"
                >
                  Unlock
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError('');
                  }}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-0 -ml-2 sm:-ml-3">
            <div className="relative h-16 sm:h-20 w-52 sm:w-64 flex items-center justify-start">
              <img
                src="/logo.png"
                alt="7010 Advisory Logo"
                className="h-full w-full object-contain object-left"
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
            aria-label="Toggle navigation menu"
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

      {/* SERVICES HERO & CONTENT SECTION */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 max-w-7xl mx-auto px-5 sm:px-6">

        {/* Globe Background Asset */}
        <div className="absolute top-0 right-[-90px] sm:right-[-5%] lg:right-[-2%] w-[260px] h-[260px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] pointer-events-none z-0 opacity-15 sm:opacity-50 overflow-hidden">
          <img
            src="/globe.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain object-top-right mix-blend-screen"
          />
        </div>

        {/* Header Content */}
        <div className="relative z-10 max-w-3xl mb-12 sm:mb-20">
          {/* Section Tag */}
          {isEditing ? (
            <input
              type="text"
              value={headerContent.tag}
              onChange={(e) => setHeaderContent({ ...headerContent, tag: e.target.value })}
              className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] p-2 mb-4 w-full max-w-xs rounded-sm block"
            />
          ) : (
            <div className="inline-block px-3 py-1 bg-[#121F42]/80 border border-[#C7AA70]/40 text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-4 rounded-sm shadow-sm">
              {headerContent.tag}
            </div>
          )}

          {/* Section Title */}
          <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-[#F5F2E9] mb-6 tracking-tight leading-[1.1]">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={headerContent.titleLine1}
                  onChange={(e) => setHeaderContent({ ...headerContent, titleLine1: e.target.value })}
                  className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-2xl sm:text-4xl rounded-sm"
                />
                <input
                  type="text"
                  value={headerContent.titleLine2}
                  onChange={(e) => setHeaderContent({ ...headerContent, titleLine2: e.target.value })}
                  className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] italic p-2 w-full text-2xl sm:text-4xl rounded-sm"
                />
              </div>
            ) : (
              <>
                {headerContent.titleLine1}
                <br />
                <span className="text-[#C7AA70] italic">{headerContent.titleLine2}</span>
              </>
            )}
          </h1>

          {/* Section Subtitle */}
          {isEditing ? (
            <textarea
              rows={3}
              value={headerContent.subtitle}
              onChange={(e) => setHeaderContent({ ...headerContent, subtitle: e.target.value })}
              className="bg-[#121F42] border border-[#C7AA70] text-slate-300 text-sm sm:text-base p-3 w-full rounded-sm"
            />
          ) : (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              {headerContent.subtitle}
            </p>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="relative p-5 sm:p-8 bg-[#121F42] border border-[#C7AA70]/20 hover:border-[#C7AA70]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg rounded-md sm:rounded-sm min-h-0 sm:min-h-[280px] border-l-2 sm:border-l"
            >
              <div>
                {/* Service Icon */}
                <div className="mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-[#C7AA70]/30 bg-[#0A1128]/60 rounded-sm group-hover:border-[#C7AA70]/70 transition-colors duration-300">
                    {renderIcon(service.icon)}
                  </div>
                </div>

                {/* Editable Card Title */}
                {isEditing ? (
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateServiceField(index, 'title', e.target.value)}
                    className="bg-[#0A1128] border border-[#C7AA70] text-white font-serif text-lg sm:text-xl p-2 w-full rounded-sm mb-3"
                  />
                ) : (
                  <h3 className="font-serif text-lg sm:text-xl text-[#F5F2E9] font-normal tracking-tight mb-3">
                    {service.title}
                  </h3>
                )}

                {/* Editable Card Description */}
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={service.description}
                    onChange={(e) => updateServiceField(index, 'description', e.target.value)}
                    className="bg-[#0A1128] border border-[#C7AA70] text-slate-300 text-xs sm:text-sm p-2 w-full rounded-sm"
                  />
                ) : (
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="relative z-10 mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-transparent border border-[#C7AA70] text-[#F5F2E9] hover:bg-[#C7AA70] hover:text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg"
          >
            <span>Discuss Your Needs</span>
            <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
