import { useState, useEffect } from 'react';
import { Search, HelpCircle, Camera } from 'lucide-react';
import './App.css';
import WhyMechRelay from "./pages/WhyMechRelay";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import Post from "./pages/Post";

const API = 'http://localhost:5000/api';

const SEED_POSTS = [
  {
    id: 'seed-1',
    user: 'GarageKing_88',
    question: 'My 2017 F-150 is throwing a P0420 code. Already replaced the O2 sensors but the light keeps coming back. Anyone dealt with this before?',
    tag: 'Engine',
    time: 'Mar 3',
    replies: [
      { id: 'r1', user: 'TorqueWrench_T', time: 'Mar 3', text: 'P0420 is almost always the catalytic converter itself, not the O2 sensors. Replacing sensors rarely fixes it. Check if the cat is glowing red hot — dead giveaway.' },
      { id: 'r2', user: 'ShopFloor_Sal', time: 'Mar 4', text: 'Also worth checking for exhaust leaks before the rear O2 sensor. A small leak can trick the ECU into thinking the cat is failing when it\'s fine.' },
    ],
    reply_count: 2,
  },
  {
    id: 'seed-2',
    user: 'TorqueWrench_T',
    question: 'Brake pedal goes almost to the floor before it grabs on my 2019 Silverado. Pads and rotors are new. Could this be the master cylinder?',
    tag: 'Brakes',
    time: 'Mar 4',
    replies: [
      { id: 'r3', user: 'GarageKing_88', time: 'Mar 4', text: 'Did you bench bleed the master cylinder before installing? If not, air in the master is your problem. Also double check all calipers are fully seated.' },
    ],
    reply_count: 1,
  },
  {
    id: 'seed-3',
    user: 'ShopFloor_Sal',
    question: "AC blows cold for about 10 minutes then starts blowing warm. 2020 Camry. Compressor cycles off and doesn't come back on. Low on refrigerant or something else?",
    tag: 'AC',
    time: 'Mar 5',
    replies: [
      { id: 'r4', user: 'TorqueWrench_T', time: 'Mar 5', text: 'Classic symptom of low refrigerant causing the low pressure cutoff switch to kick in. Hook up a gauge set and check your pressures first.' },
      { id: 'r5', user: 'GarageKing_88', time: 'Mar 5', text: 'Could also be the AC relay getting heat soaked. Try swapping it with an identical relay from the fuse box and see if the problem goes away.' },
      { id: 'r6', user: 'MechDave_99', time: 'Mar 5', text: 'Had the exact same issue on a Camry last month. Turned out to be a failing expansion valve. Low refrigerant is more likely though — start there.' },
    ],
    reply_count: 3,
  },
];

function MechRelayLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="46" rx="9" fill="#0F1923"/>
      <path d="M23 5.5 L24.6 5.5 L25.8 8.8 C27.1 9.1 28.3 9.7 29.4 10.4 L32.7 8.8 L35.2 11.3 L33.6 14.6 C34.3 15.7 34.9 16.9 35.2 18.2 L38.5 19.4 L38.5 22.6 L35.2 23.8 C34.9 25.1 34.3 26.3 33.6 27.4 L35.2 30.7 L32.7 33.2 L29.4 31.6 C28.3 32.3 27.1 32.9 25.8 33.2 L24.6 36.5 L21.4 36.5 L20.2 33.2 C18.9 32.9 17.7 32.3 16.6 31.6 L13.3 33.2 L10.8 30.7 L12.4 27.4 C11.7 26.3 11.1 25.1 10.8 23.8 L7.5 22.6 L7.5 19.4 L10.8 18.2 C11.1 16.9 11.7 15.7 12.4 14.6 L10.8 11.3 L13.3 8.8 L16.6 10.4 C17.7 9.7 18.9 9.1 20.2 8.8 Z" fill="#C9A84C"/>
      <rect x="15" y="16" width="16" height="11" rx="2.5" fill="#0F1923"/>
      <polygon points="16.5,27 19,30.5 21.5,27" fill="#0F1923"/>
      <circle cx="19" cy="21.5" r="1.2" fill="#C9A84C"/>
      <circle cx="23" cy="21.5" r="1.2" fill="#C9A84C"/>
      <circle cx="27" cy="21.5" r="1.2" fill="#C9A84C"/>
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen]                   = useState(false);
  const [fabOpen, setFabOpen]                     = useState(false);
  const [activePage, setActivePage]               = useState('home');
  const [activePostId, setActivePostId]           = useState(null);
  const [posts, setPosts]                         = useState(SEED_POSTS);
  const [postsLoading, setPostsLoading]           = useState(false);
  const [showSearchModal, setShowSearchModal]     = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showUploadModal, setShowUploadModal]     = useState(false);
  const [searchText, setSearchText]               = useState('');
  const [searchResults, setSearchResults]         = useState(null);
  const [questionText, setQuestionText]           = useState('');
  const [uploadFile, setUploadFile]               = useState(null);
  const [searchError, setSearchError]             = useState('');
  const [questionError, setQuestionError]         = useState('');
  const [uploadError, setUploadError]             = useState('');
  const [searchOpen, setSearchOpen]               = useState(false);

  // ── Auth state ────────────────────────────────────
  const [currentUser, setCurrentUser]             = useState(() => {
    const saved = localStorage.getItem('mr_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode]                   = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail]                 = useState('');
  const [authPassword, setAuthPassword]           = useState('');
  const [authUsername, setAuthUsername]           = useState('');
  const [authError, setAuthError]                 = useState('');
  const [authLoading, setAuthLoading]             = useState(false);

  const handleLogin = async () => {
    if (!authEmail || !authPassword) { setAuthError('Please fill in all fields.'); return; }
    setAuthLoading(true);
    setAuthError('');
    try {
      const res  = await fetch(`${API}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.error); return; }
      const user = { username: data.username, token: data.token };
      setCurrentUser(user);
      localStorage.setItem('mr_user', JSON.stringify(user));
      navigateTo('home');
    } catch {
      setAuthError('Something went wrong. Try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!authUsername || !authEmail || !authPassword) { setAuthError('Please fill in all fields.'); return; }
    setAuthLoading(true);
    setAuthError('');
    try {
      const res  = await fetch(`${API}/auth/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: authUsername, email: authEmail, password: authPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.error); return; }
      const user = { username: data.username, token: data.token };
      setCurrentUser(user);
      localStorage.setItem('mr_user', JSON.stringify(user));
      navigateTo('home');
    } catch {
      setAuthError('Something went wrong. Try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mr_user');
  };

  // ── Load posts from API and merge with seed posts ──
  const fetchPosts = async () => {
    setPostsLoading(true);
    try {
      const res  = await fetch(`${API}/posts`);
      const data = await res.json();
      const apiPosts = data.map(p => ({ ...p, replies: [] }));
      setPosts([...apiPosts, ...SEED_POSTS]);
    } catch (err) {
      console.error('Failed to load posts:', err);
      setPosts(SEED_POSTS);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ── When a thread is opened, load full post with replies ──
  const handleSetActivePostId = async (id) => {
    if (!id) { setActivePostId(null); return; }
    if (String(id).startsWith('seed-')) {
      setActivePostId(id);
      return;
    }
    try {
      const res  = await fetch(`${API}/posts/${id}`);
      const data = await res.json();
      setPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      setActivePostId(id);
    } catch (err) {
      console.error('Failed to load post:', err);
      setActivePostId(id);
    }
  };

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

  // ── New post submitted from Post page ────────────
  const handleNewPost = async (newPost) => {
    try {
      const res  = await fetch(`${API}/posts`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          user:     currentUser ? currentUser.username : newPost.user,
          question: newPost.question,
          tag:      newPost.tag,
        }),
      });
      const saved = await res.json();
      setPosts(prev => [{ ...saved, replies: [] }, ...prev]);
    } catch (err) {
      console.error('Failed to save post:', err);
      setPosts(prev => [newPost, ...prev]);
    }
    setActivePage('community');
  };

  // ── Add reply ────────────────────────────────────
  const handleAddReply = async (postId, reply) => {
    if (String(postId).startsWith('seed-')) {
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, replies: [...(p.replies || []), { ...reply, id: `local-${Date.now()}` }], reply_count: (p.reply_count || 0) + 1 }
            : p
        )
      );
      return;
    }
    try {
      const res  = await fetch(`${API}/posts/${postId}/replies`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          user: currentUser ? currentUser.username : reply.user,
          text: reply.text,
        }),
      });
      const saved = await res.json();
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, replies: [...(p.replies || []), saved], reply_count: (p.reply_count || 0) + 1 }
            : p
        )
      );
    } catch (err) {
      console.error('Failed to save reply:', err);
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, replies: [...(p.replies || []), reply] }
            : p
        )
      );
    }
  };

  // ── FAB Search ───────────────────────────────────
  const handleSearchSubmit = async () => {
    if (!searchText.trim())        { setSearchError('Search cannot be empty.'); return; }
    if (searchText.length < 3)     { setSearchError('Search must be at least 3 characters.'); return; }
    try {
      const res  = await fetch(`${API}/search`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query: searchText }),
      });
      const data = await res.json();
      setSearchResults(data.results);
      setSearchError('');
    } catch {
      setSearchError('Something went wrong. Try again.');
    }
  };

  // ── FAB Question ─────────────────────────────────
  const handleQuestionSubmit = async () => {
    if (!questionText.trim())      { setQuestionError('Question cannot be empty.'); return; }
    if (questionText.length < 10)  { setQuestionError('Please provide more detail (10+ characters).'); return; }
    try {
      const res  = await fetch(`${API}/posts`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ user: currentUser ? currentUser.username : 'Anonymous', question: questionText, tag: 'Other' }),
      });
      const saved = await res.json();
      setPosts(prev => [{ ...saved, replies: [] }, ...prev]);
      setShowQuestionModal(false);
      setQuestionText('');
      navigateTo('community');
    } catch {
      setQuestionError('Something went wrong. Try again.');
    }
  };

  // ── FAB Upload ───────────────────────────────────
  const handleUploadSubmit = async () => {
    if (!uploadFile) { setUploadError('Please select an image.'); return; }
    const formData = new FormData();
    formData.append('photo', uploadFile);
    try {
      await fetch(`${API}/upload`, { method: 'POST', body: formData });
      setShowUploadModal(false);
      setUploadFile(null);
    } catch {
      setUploadError('Upload failed. Try again.');
    }
  };

  const getPageKey = (item) => item.toLowerCase().replace(/\s+/g, '-');

  const navigateTo = (page) => {
    setActivePage(page);
    setActivePostId(null);
    setMenuOpen(false);
    setAuthError('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthUsername('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-garage-bg font-body">

      {/* ── NAVBAR ── */}
      <nav
        className="w-full sticky top-0 z-50 border-b border-garage-border"
        style={{ backgroundColor: '#1A2535' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer">
            <MechRelayLogo size={48} />
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
                onClick={(e) => { e.preventDefault(); navigateTo(getPageKey(item)); }}
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
            <div
              className={`flex items-center gap-2 border border-garage-border rounded transition-all duration-300 ${searchOpen ? 'w-52 px-3 py-2' : 'w-9 h-9 p-0'}`}
              style={{ backgroundColor: '#0F1923' }}
            >
              <button onClick={() => setSearchOpen((prev) => !prev)} className="w-full h-full flex items-center justify-center">
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
            <button
              onClick={() => navigateTo('post')}
              className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition"
            >
              POST
            </button>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-garage-gold font-condensed font-bold">@{currentUser.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-garage-muted hover:text-garage-text transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="text-sm text-garage-muted hover:text-garage-text transition"
              >
                Login
              </button>
            )}
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
            <div className="flex items-center gap-2 border border-garage-border rounded px-3 py-2" style={{ backgroundColor: '#0F1923' }}>
              <Search className="w-4 h-4 text-garage-muted" />
              <input
                type="text"
                placeholder="Search issues, codes, or topics..."
                className="w-full bg-transparent outline-none text-sm text-garage-text placeholder:text-garage-muted"
              />
            </div>
            {['Home', 'How It Works', 'Community', 'About', 'Post'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo(getPageKey(item)); }}
                className="block text-garage-muted hover:text-garage-text transition py-1 text-sm font-medium"
              >
                {item}
              </a>
            ))}
            {currentUser ? (
              <>
                <p className="text-garage-gold text-sm font-condensed font-bold">@{currentUser.username}</p>
                <button onClick={handleLogout} className="block text-garage-muted hover:text-garage-text transition py-1 text-sm font-medium">Logout</button>
              </>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="block text-garage-muted hover:text-garage-text transition py-1 text-sm font-medium">Login</a>
            )}
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1">

        {/* HOME */}
        {activePage === 'home' && (
          <>
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
                    onClick={() => navigateTo('post')}
                    className="px-8 py-3 bg-garage-gold text-garage-bg font-condensed font-bold text-base tracking-widest rounded hover:bg-garage-gold-hover transition"
                  >
                    POST A QUESTION
                  </button>
                  <button
                    onClick={() => navigateTo('how-it-works')}
                    className="px-8 py-3 bg-transparent text-garage-text border border-garage-border font-condensed font-semibold text-base tracking-widest rounded hover:bg-garage-surface transition"
                  >
                    SEE HOW IT WORKS
                  </button>
                </div>
              </div>
            </section>

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
        {activePage === 'about'        && <WhyMechRelay />}

        {activePage === 'community' && (
          <Community
            posts={posts}
            loading={postsLoading}
            activePostId={activePostId}
            setActivePostId={handleSetActivePostId}
            onNewPost={() => navigateTo('post')}
            onAddReply={handleAddReply}
          />
        )}

        {activePage === 'post' && (
          <Post onSubmit={handleNewPost} />
        )}

        {/* ── LOGIN / REGISTER PAGE ── */}
        {activePage === 'login' && (
          <section className="py-20 flex items-center justify-center px-6">
            <div className="p-8 rounded w-full max-w-md border border-garage-border" style={{ backgroundColor: '#1A2535' }}>

              {/* Tab switcher */}
              <div className="flex mb-6 border border-garage-border rounded overflow-hidden">
                <button
                  onClick={() => { setAuthMode('login'); setAuthError(''); }}
                  className={`flex-1 py-2 text-sm font-condensed font-bold tracking-widest transition ${authMode === 'login' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setAuthError(''); }}
                  className={`flex-1 py-2 text-sm font-condensed font-bold tracking-widest transition ${authMode === 'register' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              <h2 className="font-condensed font-extrabold text-2xl tracking-wide text-garage-text mb-6 text-center">
                {authMode === 'login' ? <>Sign In to Mech<span className="text-garage-gold">Relay</span></> : <>Join Mech<span className="text-garage-gold">Relay</span></>}
              </h2>

              {/* Username field (register only) */}
              {authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Username"
                  value={authUsername}
                  onChange={(e) => { setAuthUsername(e.target.value); setAuthError(''); }}
                  className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                  style={{ backgroundColor: '#0F1923' }}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => { setAuthEmail(e.target.value); setAuthError(''); }}
                className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={(e) => { setAuthPassword(e.target.value); setAuthError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && (authMode === 'login' ? handleLogin() : handleRegister())}
                className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />

              {authError && <p className="text-red-400 text-sm mb-3">{authError}</p>}

              <button
                onClick={authMode === 'login' ? handleLogin : handleRegister}
                disabled={authLoading}
                className="w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition disabled:opacity-50"
              >
                {authLoading ? 'LOADING...' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>

              <p className="mt-4 text-center text-sm text-garage-muted">
                {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }}
                  className="text-garage-gold hover:underline"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </section>
        )}

        {/* ── MOBILE FAB ── */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <div className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button
              onClick={() => { setShowSearchModal(true); setFabOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}
            >
              <Search className="w-4 h-4" /><span>Search</span>
            </button>
            <button
              onClick={() => { setShowQuestionModal(true); setFabOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}
            >
              <HelpCircle className="w-4 h-4" /><span>Ask a Question</span>
            </button>
            <button
              onClick={() => { setShowUploadModal(true); setFabOpen(false); }}
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
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => { setShowSearchModal(false); setSearchResults(null); setSearchText(''); }}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Search</h2>
              <input
                type="text"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setSearchError(''); setSearchResults(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search issues, codes, or topics..."
                className="w-full px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}
              />
              {searchError && <p className="text-red-400 text-sm mt-2">{searchError}</p>}
              <button onClick={handleSearchSubmit} className="mt-4 w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                SEARCH
              </button>
              {searchResults !== null && (
                <div className="mt-4">
                  {searchResults.length === 0 ? (
                    <p className="text-garage-muted text-sm text-center py-3">No results found.</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {searchResults.map(post => (
                        <div
                          key={post.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setSearchResults(null);
                            setSearchText('');
                            handleSetActivePostId(post.id);
                            navigateTo('community');
                          }}
                          className="p-3 rounded border border-garage-border cursor-pointer hover:border-garage-gold transition text-sm"
                          style={{ backgroundColor: '#0F1923' }}
                        >
                          <span className="text-xs text-garage-gold font-condensed font-bold uppercase tracking-wider">{post.tag}</span>
                          <p className="text-garage-text mt-1 line-clamp-2">{post.question}</p>
                          <p className="text-garage-muted text-xs mt-1">{post.user} · {post.reply_count} replies</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
              {uploadFile && <p className="text-garage-text text-xs mt-2">Selected: {uploadFile.name}</p>}
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