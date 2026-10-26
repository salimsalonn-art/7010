'use client';

import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Content State
  const [content, setContent] = useState({
    tag: "Inquiry",
    title: "Get in Touch",
    description: "Select the capabilities you require below to start a confidential discussion with our leadership."
  });

  // Load Saved Content from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('contact_content_7010');
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
    localStorage.setItem('contact_content_7010', JSON.stringify(content));
    setIsEditing(false);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const servicesList = [
    { title: "Strategic Communications" },
    { title: "Geopolitical Risk & Strategic Advisory" },
    { title: "Media Relations & Executive Positioning" },
    { title: "Crisis Communications & Reputation Management" }
  ];

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

      {/* CONTACT CONTENT SECTION */}
      <section className="py-32 sm:py-40 max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          {/* Tag */}
          {isEditing ? (
            <input 
              type="text"
              value={content.tag}
              onChange={(e) => setContent({...content, tag: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#C7AA70] text-xs font-mono uppercase tracking-widest p-2 mb-2 w-full max-w-xs mx-auto block rounded-sm text-center"
            />
          ) : (
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7AA70] block mb-2 font-semibold">
              {content.tag}
            </span>
          )}

          {/* Title */}
          {isEditing ? (
            <input 
              type="text"
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-[#F5F2E9] font-serif text-3xl sm:text-5xl mb-4 p-2 w-full rounded-sm text-center"
            />
          ) : (
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2E9] mb-4 tracking-tight">
              {content.title}
            </h2>
          )}

          {/* Subtitle Description */}
          {isEditing ? (
            <textarea 
              rows={3}
              value={content.description}
              onChange={(e) => setContent({...content, description: e.target.value})}
              className="bg-[#121F42] border border-[#C7AA70] text-slate-400 text-xs sm:text-sm p-2 w-full rounded-sm text-center max-w-lg mx-auto block"
            />
          ) : (
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
              {content.description}
            </p>
          )}
        </div>

        <div className="border border-slate-800 p-6 sm:p-10 bg-[#121F42] shadow-2xl rounded-sm">
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
                          : 'bg-[#0A1128] border-slate-800 text-slate-300 hover:border-slate-600'
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
                    className="w-full bg-[#0A1128] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
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
                    className="w-full bg-[#0A1128] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
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
                  className="w-full bg-[#0A1128] border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-[#C7AA70] transition-colors placeholder:text-slate-600 rounded-sm"
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
      </section>
    </main>
  );
}