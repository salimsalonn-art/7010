'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Hero Content State
  const [content, setContent] = useState({
    badge: "Washington-Based. Globally Connected.",
    headingLine1: "Navigating Complexity.",
    headingLine2: "Shaping Conversations.",
    headingItalic: "Advancing Interests.",
    description: "7010 Advisory is a Washington, DC-based boutique advisory firm specializing in strategic communications, geopolitical risk, and reputation management."
  });

  // Load Saved Content from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('home_content_7010');
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
    localStorage.setItem('home_content_7010', JSON.stringify(content));
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen font-sans antialiased selection:bg-[#C7AA70] selection:text-black bg-[#0A1128] text-white relative">
      
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

          {/* Centered Navigation Links */}
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
          {/* Badge Tag */}
          {isEditing ? (
            <input 
              type="text"
              value={content.badge}
              onChange={(e) => setContent({...content, badge: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] p-2 mb-4 sm:mb-6 w-full max-w-md rounded-sm block"
            />
          ) : (
            <div className="inline-block px-3 py-1 bg-[#121F42]/80 border border-[#C7AA70]/40 text-[#C7AA70] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 rounded-sm shadow-sm">
              {content.badge}
            </div>
          )}
          
          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] text-[#F5F2E9] mb-6 sm:mb-8 tracking-tight max-w-4xl">
            {isEditing ? (
              <div className="space-y-2">
                <input 
                  type="text"
                  value={content.headingLine1}
                  onChange={(e) => setContent({...content, headingLine1: e.target.value})}
                  className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-2xl sm:text-5xl rounded-sm"
                />
                <input 
                  type="text"
                  value={content.headingLine2}
                  onChange={(e) => setContent({...content, headingLine2: e.target.value})}
                  className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] p-2 w-full text-2xl sm:text-5xl rounded-sm"
                />
                <input 
                  type="text"
                  value={content.headingItalic}
                  onChange={(e) => setContent({...content, headingItalic: e.target.value})}
                  className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] italic p-2 w-full text-2xl sm:text-5xl rounded-sm"
                />
              </div>
            ) : (
              <>
                {content.headingLine1} <br />
                {content.headingLine2} <br />
                <span className="text-[#C7AA70] italic">{content.headingItalic}</span>
              </>
            )}
          </h1>

          {/* Description Paragraph */}
          {isEditing ? (
            <textarea 
              rows={4}
              value={content.description}
              onChange={(e) => setContent({...content, description: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9]/90 text-sm sm:text-lg p-3 w-full max-w-2xl rounded-sm mb-8 block"
            />
          ) : (
            <p className="text-[#F5F2E9]/90 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
              {content.description}
            </p>
          )}

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