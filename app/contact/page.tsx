'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState('General Inquiry');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Content State
  const [content, setContent] = useState({
    title: "Get in Touch",
    description: "Whether you're navigating complex challenges, evaluating new opportunities, or seeking independent strategic counsel, we welcome the opportunity to connect."
  });


  // Load Saved Content from Firebase Firestore on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'site_content', 'contact_page');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent((prevContent) => ({
            ...prevContent,
            ...docSnap.data(),
          }));
        }
      } catch (err) {
        console.error('Error fetching contact page content:', err);
      } finally {
        setContentLoading(false);
      }
    };

    fetchContent();
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

  // Save Edits directly to Firebase Cloud Database
  const handleSave = async () => {
    try {
      const docRef = doc(db, 'site_content', 'contact_page');
      await setDoc(docRef, content);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving contact page content:", err);
    }
  };

 const servicesList = [
  "General Inquiry",
  "Strategic Communications",
  "Geopolitical Risk & Strategic Advisory",
  "Media Relations & Executive Positioning",
  "Crisis Communications & Reputation Management"
];

 return (
  <>
    {contentLoading ? (
      <main className="min-h-screen bg-[#0A1128]" />
    ) : (
      <main className="min-h-screen font-sans antialiased bg-[#0A1128] text-white relative overflow-hidden flex flex-col justify-between">
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
            <a href="/services" className="hover:text-[#C7AA70] transition-colors">Services</a>
            <a href="/contact" className="text-[#C7AA70]">Contact</a>
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
            <a href="/services" onClick={() => setMobileMenuOpen(false)} className="block text-[#F5F2E9] hover:text-[#C7AA70]">Services</a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#C7AA70]">Contact</a>
          </div>
        )}
      </nav>

      {/* CONTACT HERO & FORM SECTION */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 max-w-7xl mx-auto px-5 sm:px-6 w-full flex-grow">
        
        {/* Globe Background Asset at Top Right */}
        <div className="absolute top-4 right-[-25px] sm:top-0 sm:right-[-5%] lg:right-[-5%] w-[280px] h-[280px] sm:w-[650px] sm:h-[650px] lg:w-[750px] lg:h-[750px] pointer-events-none z-0 opacity-[0.82] sm:opacity-80 overflow-hidden">
          <img 
            src="/globe.png" 
            alt="Globe Background" 
            className="w-full h-full object-contain object-top-right mix-blend-screen"
          />
        </div>

        {/* Header Content */}
        <div className="relative z-10 text-center mb-12 sm:mb-16">
          {isEditing ? (
            <input 
              type="text"
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] font-serif text-3xl sm:text-5xl mb-3 p-2 w-full max-w-md mx-auto block rounded-sm text-center"
            />
          ) : (
            <h1 className="font-serif text-4xl sm:text-6xl text-[#F5F2E9] mb-3 tracking-tight">
              {content.title}
            </h1>
          )}

          <div className="w-12 h-0.5 bg-[#C7AA70] mx-auto mb-6"></div>

          {isEditing ? (
            <textarea 
              rows={3}
              value={content.description}
              onChange={(e) => setContent({...content, description: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-slate-300 text-xs sm:text-sm p-3 w-full max-w-xl mx-auto block rounded-sm text-center"
            />
          ) : (
           <p
  className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-bold leading-relaxed"
  style={{
    WebkitTextStroke: '0.4px #000000',
    paintOrder: 'stroke fill',
  }}
>
  {content.description}
</p>
          )}
        </div>

        {/* Contact Form Container */}
        <div className="relative z-10 border border-slate-800 p-6 sm:p-12 bg-[#121F42]/95 backdrop-blur-sm shadow-2xl rounded-sm">
          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-[#C7AA70]/20 border border-[#C7AA70] text-[#C7AA70] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
                ✓
              </div>
              <h3 className="font-serif text-2xl text-[#F5F2E9] mb-2">Message Received</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto font-light">
                Thank you for reaching out. A partner from 7010 Advisory will respond shortly.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                
                const response = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  body: formData
                });

                if (response.ok) {
                  setFormSubmitted(true);
                }
              }} 
              className="space-y-6"
            >
              <input type="hidden" name="access_key" value="535b5f06-63bd-4115-a97d-b4c2be99c128" />
              <input type="hidden" name="Selected Service" value={selectedService} />

              {/* INQUIRY TYPE SELECTOR */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-[#C7AA70] mb-2 font-semibold">
                  Inquiry Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#0A1128] border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors rounded-sm"
                >
                  {servicesList.map((service, idx) => (
                    <option key={idx} value={service} className="bg-[#0A1128] text-white">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* FULL NAME & ORGANIZATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 mb-2 font-semibold">
                    Full Name <span className="text-[#C7AA70]">*</span>
                  </label>
                  <input required type="text" name="Full Name" placeholder="Jane Doe" className="w-full bg-[#0A1128] border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 mb-2 font-semibold">
                    Organization
                  </label>
                  <input type="text" name="Organization" placeholder="Company / Sovereign Entity" className="w-full bg-[#0A1128] border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm" />
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 mb-2 font-semibold">
                  Email Address <span className="text-[#C7AA70]">*</span>
                </label>
                <input required type="email" name="Email" placeholder="name@organization.com" className="w-full bg-[#0A1128] border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm" />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 mb-2 font-semibold">
                  Message <span className="text-[#C7AA70]">*</span>
                </label>
                <textarea required rows={5} name="Message" placeholder="How can we help?" className="w-full bg-[#0A1128] border border-slate-800 p-3.5 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm resize-none" />
              </div>

              <button type="submit" className="w-full py-4 bg-[#C7AA70] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#b5985e] transition-colors shadow-lg rounded-sm">
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#060B1A] border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="7010 Advisory Logo" 
              className="h-8 w-auto object-contain rounded"
            />
          </div>
          
          <div className="flex items-center space-x-6 uppercase tracking-widest text-[11px] font-semibold text-slate-400">
            <a href="/services" className="hover:text-[#C7AA70] transition-colors">Strategic Communications</a>
            <span>|</span>
            <a
  href="/services"
  className="text-[9px] sm:text-[11px] tracking-[0.08em] leading-tight max-w-[130px] text-center hover:text-[#C7AA70] transition-colors"
>
  Geopolitical Risk Analysis
</a>
            <span>|</span>
            <a href="/services" className="hover:text-[#C7AA70] transition-colors">Business Advisory</a>
          </div>

          <div className="text-slate-500 text-[11px]">© 2026 7010 Advisory. All rights reserved.</div>
        </div>
      </footer>
      </main>
    )}
  </>
  );
}