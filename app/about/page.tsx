
'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Content
  const [content, setContent] = useState({
    tag: 'THE 7010 APPROACH',
    titleLine1: 'Local Insight.',
    titleLine2: 'Global Perspective.',
    description:
      '7010 Advisory is an independent communications and advisory firm working with organizations operating across the United States and international markets. Combining deep media experience, geopolitical insight, and an understanding of the intersection between business and policy, the firm helps clients anticipate challenges, communicate effectively, and pursue new opportunities.'
  });

  // Load Saved Content from Firebase
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'site_content', 'about_page');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent({
            ...content,
            ...docSnap.data()
          });
        }
      } catch (err) {
        console.error('Error fetching about page content:', err);
      }
    };

    fetchContent();
  }, []);

  // Login Authentication
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

  // Save Content to Firebase
  const handleSave = async () => {
    try {
      const docRef = doc(db, 'site_content', 'about_page');
      await setDoc(docRef, content);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving about page content:', err);
    }
  };

  return (
    <main className="min-h-screen font-sans antialiased bg-[#0A1128] text-white relative">

      {/* DISCREET EDIT MODE */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isEditing ? (
          <button
            onClick={() => setShowAuthModal(true)}
            className="opacity-10 hover:opacity-100 transition-opacity duration-300 bg-[#121F42] border border-slate-700 text-[#C7AA70] text-[10px] uppercase font-mono px-3 py-1.5 rounded shadow-lg"
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

            <h3 className="font-serif text-xl text-[#F5F2E9] mb-1">
              Client Edit Login
            </h3>

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
                  placeholder="••••"
                />
              </div>

              {authError && (
                <p className="text-red-400 text-xs font-mono">
                  {authError}
                </p>
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

          {/* LOGO */}
          <a href="/" className="flex items-center space-x-0 -ml-2 sm:-ml-3">
            <div className="relative h-16 sm:h-20 w-52 sm:w-64 flex items-center justify-start">
              <img
                src="/logo.png"
                alt="7010 Advisory Logo"
                className="h-full w-full object-contain object-left"
              />
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-12 text-xs font-semibold uppercase tracking-widest text-[#F5F2E9]/80">

            <a href="/" className="hover:text-[#C7AA70] transition-colors">
              Home
            </a>

            <a href="/about" className="text-[#C7AA70]">
              About
            </a>

            <a href="/services" className="hover:text-[#C7AA70] transition-colors">
              Services
            </a>

            <a href="/contact" className="hover:text-[#C7AA70] transition-colors">
              Contact
            </a>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F2E9] focus:outline-none p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121F42] border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-widest">

            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#F5F2E9] hover:text-[#C7AA70]"
            >
              Home
            </a>

            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#C7AA70]"
            >
              About
            </a>

            <a
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#F5F2E9] hover:text-[#C7AA70]"
            >
              Services
            </a>

            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#F5F2E9] hover:text-[#C7AA70]"
            >
              Contact
            </a>

          </div>
        )}

      </nav>

      {/* ABOUT HERO SECTION */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center pt-32 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-6 overflow-hidden border-b border-slate-800">

        {/* BACKGROUND IMAGE */}
<div className="absolute inset-0 z-0">

  <div
    className="absolute inset-0 bg-no-repeat
    bg-[length:80%_100%]
    bg-[position:60%_center]
    sm:bg-cover bg-center"
    style={{
      backgroundImage: "url('/right.png')",
      
    }}
  />

  {/* DARK LEFT GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/95 sm:via-[#061426]/85 to-[#061426]/10" />

  {/* BOTTOM FADE */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/40 via-transparent to-[#061426]/10" />

</div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* TAG */}
          <div className="flex items-center gap-6 mb-8 sm:mb-10">

            {isEditing ? (
              <input
                type="text"
                value={content.tag}
                onChange={(e) =>
                  setContent({ ...content, tag: e.target.value })
                }
                className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-xs font-mono uppercase tracking-widest p-2 w-full max-w-xs rounded-sm"
              />
            ) : (
              <span className="text-[#C7AA70] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap">
                {content.tag}
              </span>
            )}

            <div className="h-[2px] bg-[#C7AA70] w-20 sm:w-40 lg:w-60" />

          </div>

          {/* HEADING */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-normal leading-[1.1] tracking-tight text-[#F5F2E9] mb-8 max-w-5xl">

            {isEditing ? (
              <div className="space-y-3">

                <input
                  type="text"
                  value={content.titleLine1}
                  onChange={(e) =>
                    setContent({ ...content, titleLine1: e.target.value })
                  }
                  className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-3xl sm:text-5xl rounded-sm"
                />

                <input
                  type="text"
                  value={content.titleLine2}
                  onChange={(e) =>
                    setContent({ ...content, titleLine2: e.target.value })
                  }
                  className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] italic p-2 w-full text-3xl sm:text-5xl rounded-sm"
                />

              </div>
            ) : (
              <>
                <span className="block">
                  {content.titleLine1}
                </span>

                <span className="block italic text-[#E8BC72]">
                  {content.titleLine2}
                </span>
              </>
            )}

          </h1>

          {/* DESCRIPTION */}
          {isEditing ? (
            <textarea
              rows={6}
              value={content.description}
              onChange={(e) =>
                setContent({ ...content, description: e.target.value })
              }
              className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] text-sm sm:text-lg p-3 w-full max-w-3xl rounded-sm"
            />
          ) : (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              {content.description}
            </p>
          )}

        </div>

      </section>

    </main>
  );
}
