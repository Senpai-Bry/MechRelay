import { useState, useEffect } from 'react';
import { Search, HelpCircle, Camera } from 'lucide-react';
import './App.css';
import WhyMechRelay from "./pages/WhyMechRelay";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import Post from "./pages/Post";

function MechRelayLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#C9A84C" d="M43 4h14l2.5 11a33 33 0 0 1 7.5 3.1l10-5.5 9.9 9.9-5.5 10a33 33 0 0 1 3.1 7.5L96 43v14l-11 2.5a33 33 0 0 1-3.1 7.5l5.5 10-9.9 9.9-10-5.5a33 33 0 0 1-7.5 3.1L57 96H43l-2.5-11a33 33 0 0 1-7.5-3.1l-10 5.5-9.9-9.9 5.5-10a33 33 0 0 1-3.1-7.5L4 57V43l11-2.5a33 33 0 0 1 3.1-7.5l-5.5-10 9.9-9.9 10 5.5a33 33 0 0 1 7.5-3.1L43 4z"/>
      <circle cx="50" cy="50" r="20" fill="#0F1923"/>
      <ellipse cx="47" cy="47" rx="11" ry="9" fill="#F0EDE6"/>
      <polygon points="40,55 44,56 41,60" fill="#F0EDE6"/>
      <ellipse cx="54" cy="54" rx="9" ry="7" fill="#1A2535" stroke="#C9A84C" strokeWidth="1.5"/>
      <polygon points="59,60 56,62 60,65" fill="#C9A84C"/>
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen]                   = useState(false);
  const [fabOpen, setFabOpen]                     = useState(false);
  const [activePage, setActivePage]               = useState('home');
  const [showSearchModal, setShowSearchModal]     = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showUploadModal, setShowUploadModal]     = useState(false);
  const [searchText, setSearchText]               = useState('');
  const [questionText, setQuestionText]           = useState('');
  const [uploadFile, setUploadFile]               = useState(null);
  const [searchError, setSearchError]             = useState('');
  const [questionError, setQuestionError]         = useState('');
  const [uploadError, setUploadError]             = useState('');
  const [searchOpen, setSearchOpen]               = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowQuestionModal(false);
        setShowUploadModal(false);
        setFabOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSearchSubmit = async () => {
    if (!searchText.trim()) { setSearchError('Search cannot be empty.'); return; }
    if (searchText.length < 3) { setSearchError('Search must be at least 3 characters.'); return; }
    try {
      await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchText }),
      });
      setShowSearchModal(false);
      setSearchText('');
    } catch {
      setSearchError('Something went wrong. Try again.');
    }
  };

  const handleQuestionSubmit = async () => {
    if (!questionText.trim()) { setQuestionError('Question cannot be empty.'); return; }
    if (questionText.length < 10) { setQuestionError('Please provide more detail (10+ characters).'); return; }
    try {
      await fetch('http://localhost:5000/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: questionText }),
      });
      setShowQuestionModal(false);
      setQuestionText('');
    } catch {
      setQuestionError('Something went wrong. Try again.');
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) { setUploadError('Please select an image.'); return; }
    const formData = new FormData();
    formData.append('photo', uploadFile);
    try {
      await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
      setShowUploadModal(false);
      setUploadFile(null);
    } catch {
      setUploadError('Upload failed. Try again.');
    }
  };

  const getPageKey = (item) => item.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen flex flex-col bg-garage-bg font-body">

      {/* ── NAVBAR ── */}
      <nav
        className="w-full sticky top-0 z-50 border-b border-garage-border"
        style={{ backgroundColor: '#1A2535' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <MechRelayLogo size={36} />
            <span className="font-condensed font-extrabold text-xl tracking-wide text-garage-text">
              Mech<span className="text-garage-gold">Relay</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'How It Works', 'Community', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage(getPageKey(item)); }}
                className={`text-sm font-medium transition-colors ${
                  activePage === getPageKey(item)
                    ? 'text-garage-text'
                    : 'text-garage-muted hover:text-garage-text'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">

            {/* Expandable Search */}
            <div className={`flex items-center gap-2 border border-garage-border rounded transition-all duration-300 ${searchOpen ? 'w-52 px-3 py-2' : 'w-9 h-9 p-0'}`}
              style={{ backgroundColor: '#0F1923' }}
            >
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="w-full h-full flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-garage-muted" />
              </button>
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  onBlur={() => setSearchOpen(false)}
                  className="w-full bg-transparent outline-none text-sm text-garage-text placeholder:text-garage-muted"
                />
              )}
            </div>

            {/* Post CTA */}
            <button
              onClick={() => setActivePage('post')}
              className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition"
            >
              POST
            </button>

            {/* Login */}
            <button
              onClick={() => setActivePage('login')}
              className="text-sm text-garage-muted hover:text-garage-text transition"
            >
              Login
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-garage-border px-6 py-4 space-y-3" style={{ backgroundColor: '#1A2535' }}>

            {/* Mobile Search */}
            <div className="flex items-center gap-2 border border-garage-border rounded px-3 py-2" style={{ backgroundColor: '#0F1923' }}>
              <Search className="w-4 h-4 text-garage-muted" />
              <input
                type="text"
                placeholder="Search issues, codes, or topics..."
                className="w-full bg-transparent outline-none text-sm text-garage-text placeholder:text-garage-muted"
              />
            </div>

            {/* Mobile Nav Links */}
            {['Home', 'How It Works', 'Community', 'About', 'Post', 'Login'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage(getPageKey(item)); setMenuOpen(false); }}
                className="block text-garage-muted hover:text-garage-text transition py-1 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main>

        {/* HOME PAGE */}
        {activePage === 'home' && (
          <>
            {/* Hero */}
            <section className="relative overflow-hidden py-28 text-center">
              <div className="absolute inset-0 hero-grid pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto px-6">
                <h1
                  className="font-condensed font-extrabold text-garage-text leading-none tracking-tight fade-up fade-up-1"
                  style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
                >
                  The Shop in<br />
                  <span className="text-garage-gold">Your Pocket.</span>
                </h1>
                <p className="mt-5 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto fade-up fade-up-2">
                  Real answers from techs who've done the job. No dead threads,
                  no endless scrolling — just fast, shop-floor knowledge when you need it.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center fade-up fade-up-3">
                  <button
                    onClick={() => setActivePage('post')}
                    className="px-8 py-3 bg-garage-gold text-garage-bg font-condensed font-bold text-base tracking-widest rounded hover:bg-garage-gold-hover transition"
                  >
                    POST A QUESTION
                  </button>
                  <button
                    onClick={() => setActivePage('how-it-works')}
                    className="px-8 py-3 bg-transparent text-garage-text border border-garage-border font-condensed font-semibold text-base tracking-widest rounded hover:bg-garage-surface transition"
                  >
                    SEE HOW IT WORKS
                  </button>
                </div>
              </div>
            </section>

            {/* Value Strip */}
            <div className="border-t border-b border-garage-border">
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-garage-border">
                {[
                  { title: 'Fast Answers',         sub: 'Real techs, real time'    },
                  { title: 'Shop-Floor Knowledge', sub: 'Not textbook theory'      },
                  { title: 'Mechanic to Mechanic', sub: 'No guesswork, no fluff'   },
                  { title: 'Post Photos & Videos', sub: 'Show the problem clearly' },
                ].map((v) => (
                  <div key={v.title} className="px-4 py-5 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#0F1923' }}>
                    <p className="font-condensed font-bold text-xs tracking-wider uppercase text-garage-text whitespace-nowrap">{v.title}</p>
                    <p className="text-xs text-garage-muted mt-1">{v.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PAGE ROUTES */}
        {activePage === 'how-it-works' && <HowItWorks />}
        {activePage === 'community'    && <Community />}
        {activePage === 'about'        && <WhyMechRelay />}
        {activePage === 'post'         && <Post />}

        {/* LOGIN PAGE */}
        {activePage === 'login' && (
          <section className="py-20 flex items-center justify-center px-6">
            <div className="p-8 rounded w-full max-w-md border border-garage-border" style={{ backgroundColor: '#1A2535' }}>
              <h2 className="font-condensed font-extrabold text-2xl tracking-wide text-garage-text mb-6 text-center">
                Sign In to Mech<span className="text-garage-gold">Relay</span>
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              <button className="w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                SIGN IN
              </button>
              <p className="mt-4 text-center text-sm text-garage-muted">
                Don't have an account?{' '}
                <a href="#" className="text-garage-gold hover:underline">Sign up</a>
              </p>
            </div>
          </section>
        )}

        {/* ── MOBILE FAB ── */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <div className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}
            >
              <Search className="w-4 h-4" /><span>Search</span>
            </button>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}
            >
              <HelpCircle className="w-4 h-4" /><span>Ask a Question</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}
            >
              <Camera className="w-4 h-4" /><span>Upload Photo</span>
            </button>
          </div>
          <button
            onClick={() => setFabOpen((prev) => !prev)}
            className="w-14 h-14 rounded bg-garage-gold text-garage-bg shadow-xl flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform"
          >
            {fabOpen ? '×' : '+'}
          </button>
        </div>

        {/* ── SEARCH MODAL ── */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowSearchModal(false)}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Search</h2>
              <input
                type="text"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setSearchError(''); }}
                placeholder="Search issues, codes, or topics..."
                className="w-full px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              {searchError && <p className="text-red-400 text-sm mt-2">{searchError}</p>}
              <button onClick={handleSearchSubmit} className="mt-4 w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                SEARCH
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTION MODAL ── */}
        {showQuestionModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowQuestionModal(false)}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Ask a Question</h2>
              <textarea
                value={questionText}
                onChange={(e) => { setQuestionText(e.target.value); setQuestionError(''); }}
                placeholder="Describe the issue..."
                className="w-full h-32 px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition resize-none text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              {questionError && <p className="text-red-400 text-sm mt-2">{questionError}</p>}
              <button onClick={handleQuestionSubmit} className="mt-4 w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                SUBMIT
              </button>
            </div>
          </div>
        )}

        {/* ── UPLOAD MODAL ── */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowUploadModal(false)}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Upload Photo</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUploadError('');
                  if (!file) return;
                  if (!file.type.startsWith('image/')) { setUploadError('File must be an image.'); setUploadFile(null); return; }
                  if (file.size > 5 * 1024 * 1024) { setUploadError('Image must be under 5MB.'); setUploadFile(null); return; }
                  setUploadFile(file);
                }}
                className="w-full text-garage-muted text-sm"
              />
              {uploadError && <p className="text-red-400 text-sm mt-2">{uploadError}</p>}
              <button onClick={handleUploadSubmit} className="mt-4 w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                UPLOAD
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-garage-border py-8" style={{ backgroundColor: '#1A2535' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-condensed font-extrabold text-lg tracking-wide text-garage-text">
            Mech<span className="text-garage-gold">Relay</span>
          </p>
          <p className="mt-1 text-sm text-garage-muted">
            Empowering mechanics to learn, collaborate, and solve problems — faster, smarter, together.
          </p>
        </div>
      </footer>

    </div>
  );
}