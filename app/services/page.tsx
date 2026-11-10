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

// Service icons - matching the reference design
const renderIcon = (iconType: string) => {
  const commonProps = {
    className: "w-12 h-12 text-[#C7AA70]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    viewBox: "0 0 48 48",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (iconType) {
    // 1. Strategic Communications - Megaphone
    case 'megaphone':
      return (
        <svg {...commonProps}>
          <path d="M5 19h7l27-12v30L12 25H5z" />
          <path d="M12 25l4 15h7l-5-13" />
          <path d="M5 19v6" />
        </svg>
      );

    // 2. Crisis Communications - Shield
    case 'shield':
      return (
        <svg {...commonProps}>
          <path d="M24 3L5 10v12c0 12 8 19 19 23 11-4 19-11 19-23V10L24 3z" />
        </svg>
      );

    // 3. Geopolitical Advisory - Globe
    case 'globe':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="21" />
          <path d="M3 24h42" />
          <path d="M24 3c-8 7-12 14-12 21s4 14 12 21" />
          <path d="M24 3c8 7 12 14 12 21s-4 14-12 21" />
          <path d="M7 12h34M7 36h34" />
        </svg>
      );

    // 4. Executive Positioning - Three People
    case 'award':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="11" r="6" />
          <circle cx="10" cy="17" r="5" />
          <circle cx="38" cy="17" r="5" />
          <path d="M9 40v-5c0-7 5-11 15-11s15 4 15 11v5H9z" />
          <path d="M3 39v-5c0-5 3-9 8-10" />
          <path d="M45 39v-5c0-5-3-9-8-10" />
        </svg>
      );

    // 5. Market Entry & Business Advisory - Presentation Chart
    case 'compass':
      return (
        <svg {...commonProps}>
          <path d="M5 5h38v28H5z" />
          <path d="M24 33v7M16 43h16" />
          <path d="M11 25l9-9 7 5 11-10" />
          <path d="M31 11h7v7" />
          <path d="M12 33l-4 7" />
        </svg>
      );

    // 6. Media Engagement & Training - Speech Bubbles
    case 'microphone':
      return (
        <svg {...commonProps}>
          <path d="M5 20c0-9 8-15 18-15s18 6 18 15-8 15-18 15c-3 0-6-.5-8-2L5 36l3-8c-2-2-3-5-3-8z" />
          <path d="M28 27c2 7 8 11 15 11 1 0 2 0 3-.3l-2-6c2-2 3-4 3-7 0-7-6-12-14-12" />
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
        <div className="absolute top-4 right-[-25px] sm:top-0 sm:right-[-5%] lg:right-[-2%] w-[280px] h-[280px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] pointer-events-none z-0 opacity-[0.82] sm:opacity-80 overflow-hidden">
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
                 <div className="flex items-center justify-start">
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
