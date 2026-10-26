'use client';

import React, { useState, useEffect } from 'react';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Content State
  const [content, setContent] = useState({
    tag: "Global Perspective",
    titleLine1: "Local Insight.",
    titleLine2: "Global Perspective.",
    description: "With deep expertise in Washington and the Middle East and North Africa, and a broader international outlook, we provide tailored guidance to help clients navigate complex political and media environments, manage reputational challenges, and advance their strategic objectives."
  });

  // Load Saved Content from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('about_content_7010');
    if (saved) setContent(JSON.parse(saved));
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
    localStorage.setItem('about_content_7010', JSON.stringify(content));
    setIsEditing(false);
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
                  placeholder="••••"
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
            {/* Tag */}
            {isEditing ? (
              <input 
                type="text"
                value={content.tag}
                onChange={(e) => setContent({...content, tag: e.target.value})}
                className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-xs font-mono uppercase tracking-widest p-2 mb-4 w-full rounded-sm"
              />
            ) : (
              <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-4 font-semibold">
                {content.tag}
              </span>
            )}

            {/* Title */}
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F2E9] mb-6 tracking-tight leading-[1.15]">
              {isEditing ? (
                <div className="space-y-2">
                  <input 
                    type="text"
                    value={content.titleLine1}
                    onChange={(e) => setContent({...content, titleLine1: e.target.value})}
                    className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-2xl sm:text-4xl rounded-sm"
                  />
                  <input 
                    type="text"
                    value={content.titleLine2}
                    onChange={(e) => setContent({...content, titleLine2: e.target.value})}
                    className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-2xl sm:text-4xl rounded-sm"
                  />
                </div>
              ) : (
                <>
                  {content.titleLine1} <br />
                  <span className="italic text-slate-400">{content.titleLine2}</span>
                </>
              )}
            </h2>

            {/* Paragraph Description */}
            {isEditing ? (
              <textarea 
                rows={5}
                value={content.description}
                onChange={(e) => setContent({...content, description: e.target.value})}
                className="bg-[#121F42] border border-[#C7AA70] text-slate-300 text-sm sm:text-base p-3 w-full rounded-sm"
              />
            ) : (
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-xl">
                {content.description}
              </p>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}