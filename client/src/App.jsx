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
  const [currentUser, setCurrentUser]             = useState(null);
  const [loginEmail, setLoginEmail]               = useState('');
  const [loginPassword, setLoginPassword]         = useState('');
  const [loginError, setLoginError]               = useState('');
  const [signupUsername, setSignupUsername]       = useState('');
  const [signupEmail, setSignupEmail]             = useState('');
  const [signupPassword, setSignupPassword]       = useState('');
  const [signupError, setSignupError]             = useState('');
  const [authTab, setAuthTab]                     = useState('login');

  // ── Edit/Delete modal state ───────────────────────
  const [showEditModal, setShowEditModal]         = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingPost, setEditingPost]             = useState(null);
  const [editQuestion, setEditQuestion]           = useState('');
  const [editTag, setEditTag]                     = useState('');
  const [editError, setEditError]                 = useState('');
  const [deletingPostId, setDeletingPostId]       = useState(null);

  // ── Viewed user profile ───────────────────────────
  const [viewingUser, setViewingUser]             = useState(null);
  const [viewingUserPosts, setViewingUserPosts]   = useState([]);
  const [viewingUserLoading, setViewingUserLoading] = useState(false);

  // ── Profile tab ───────────────────────────────────
  const [profileTab, setProfileTab]               = useState('posts');

  // ── Job log state ─────────────────────────────────
  const [jobLogs, setJobLogs]                     = useState([]);
  const [jobLogsLoading, setJobLogsLoading]       = useState(false);
  const [jobForm, setJobForm]                     = useState({ vehicle: '', repair_type: '', notes: '', status: 'completed', date: '' });
  const [jobFormError, setJobFormError]           = useState('');
  const [jobFormOpen, setJobFormOpen]             = useState(false);

  // ── Load posts ────────────────────────────────────
  const fetchPosts = async () => {
    setPostsLoading(true);
    try {
      const res  = await fetch(`${API}/posts`);
      const data = await res.json();
      setPosts([...data.map(p => ({ ...p, replies: [] })), ...SEED_POSTS]);
    } catch (err) {
      console.error('Failed to load posts:', err);
      setPosts(SEED_POSTS);
    } finally {
      setPostsLoading(false);
    }
  };

  // ── Load job logs ─────────────────────────────────
  const fetchJobLogs = async (username) => {
    setJobLogsLoading(true);
    try {
      const res  = await fetch(`${API}/joblog/${username}`);
      const data = await res.json();
      setJobLogs(data);
    } catch {
      setJobLogs([]);
    } finally {
      setJobLogsLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowQuestionModal(false);
        setShowUploadModal(false);
        setShowEditModal(false);
        setShowDeleteConfirm(false);
        setFabOpen(false);
        setJobFormOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // ── Restore session ───────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('mechrelay_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('mechrelay_user');
      }
    }
  }, []);

  // ── Load job logs when profile tab switches ───────
  useEffect(() => {
    if (profileTab === 'joblog' && currentUser) {
      fetchJobLogs(currentUser.username);
    }
  }, [profileTab, currentUser]);

  // ── When a thread is opened ───────────────────────
  const handleSetActivePostId = async (id) => {
    if (!id) { setActivePostId(null); return; }
    if (String(id).startsWith('seed-')) { setActivePostId(id); return; }
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

  // ── New post ──────────────────────────────────────
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

  // ── Add reply ─────────────────────────────────────
  const handleAddReply = async (postId, reply) => {
    if (String(postId).startsWith('seed-')) {
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, replies: [...(p.replies || []), { ...reply, id: `local-${Date.now()}` }], reply_count: (p.reply_count || 0) + 1 }
          : p
      ));
      return;
    }
    try {
      const res  = await fetch(`${API}/posts/${postId}/replies`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ user: reply.user, text: reply.text }),
      });
      const saved = await res.json();
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, replies: [...(p.replies || []), saved], reply_count: (p.reply_count || 0) + 1 }
          : p
      ));
    } catch (err) {
      console.error('Failed to save reply:', err);
      setPosts(prev => prev.map(p =>
        p.id === postId ? { ...p, replies: [...(p.replies || []), reply] } : p
      ));
    }
  };

  // ── Auth: Login ───────────────────────────────────
  const handleLogin = async () => {
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) { setLoginError('Email and password are required.'); return; }
    try {
      const res  = await fetch(`${API}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error || 'Login failed.'); return; }
      const user = { username: data.username, token: data.token };
      setCurrentUser(user);
      localStorage.setItem('mechrelay_user', JSON.stringify(user));
      setLoginEmail('');
      setLoginPassword('');
      navigateTo('profile');
    } catch {
      setLoginError('Could not connect to server.');
    }
  };

  // ── Auth: Signup ──────────────────────────────────
  const handleSignup = async () => {
    setSignupError('');
    if (!signupUsername.trim() || !signupEmail.trim() || !signupPassword.trim()) { setSignupError('All fields are required.'); return; }
    try {
      const res  = await fetch(`${API}/auth/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: signupUsername, email: signupEmail, password: signupPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setSignupError(data.error || 'Sign up failed.'); return; }
      const user = { username: data.username, token: data.token };
      setCurrentUser(user);
      localStorage.setItem('mechrelay_user', JSON.stringify(user));
      setSignupUsername(''); setSignupEmail(''); setSignupPassword('');
      navigateTo('profile');
    } catch {
      setSignupError('Could not connect to server.');
    }
  };

  // ── Auth: Logout ──────────────────────────────────
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mechrelay_user');
    navigateTo('home');
  };

  // ── View another user ─────────────────────────────
  const handleViewUser = async (username) => {
    setViewingUser(username);
    setViewingUserPosts([]);
    setViewingUserLoading(true);
    navigateTo('user-profile');
    try {
      const res  = await fetch(`${API}/posts/by/${username}`);
      const data = await res.json();
      setViewingUserPosts(data);
    } catch {
      setViewingUserPosts([]);
    } finally {
      setViewingUserLoading(false);
    }
  };

  // ── Edit post ─────────────────────────────────────
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditQuestion(post.question);
    setEditTag(post.tag);
    setEditError('');
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!editQuestion.trim()) { setEditError('Question cannot be empty.'); return; }
    try {
      const res  = await fetch(`${API}/posts/${editingPost.id}`, {
        method:  'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ question: editQuestion, tag: editTag }),
      });
      const updated = await res.json();
      if (!res.ok) { setEditError(updated.error || 'Failed to save changes.'); return; }
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...updated } : p));
      setShowEditModal(false);
      setEditingPost(null);
    } catch {
      setEditError('Failed to save changes.');
    }
  };

  // ── Delete post ───────────────────────────────────
  const openDeleteConfirm = (postId) => { setDeletingPostId(postId); setShowDeleteConfirm(true); };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`${API}/posts/${deletingPostId}`, {
        method:  'DELETE',
        headers: { 'Authorization': `Bearer ${currentUser.token}` },
      });
      setPosts(prev => prev.filter(p => p.id !== deletingPostId));
      setShowDeleteConfirm(false);
      setDeletingPostId(null);
    } catch {
      alert('Failed to delete post.');
    }
  };

  // ── Job log: Add entry ────────────────────────────
  const handleJobFormSubmit = async () => {
    if (!jobForm.vehicle.trim() || !jobForm.repair_type.trim() || !jobForm.date) {
      setJobFormError('Vehicle, repair type, and date are required.');
      return;
    }
    try {
      const res  = await fetch(`${API}/joblog`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...jobForm, user: currentUser.username }),
      });
      const saved = await res.json();
      setJobLogs(prev => [saved, ...prev]);
      setJobForm({ vehicle: '', repair_type: '', notes: '', status: 'completed', date: '' });
      setJobFormError('');
      setJobFormOpen(false);
    } catch {
      setJobFormError('Failed to save entry. Try again.');
    }
  };

  // ── Job log: Delete entry ─────────────────────────
  const handleJobDelete = async (id) => {
    try {
      await fetch(`${API}/joblog/${id}`, { method: 'DELETE' });
      setJobLogs(prev => prev.filter(j => j.id !== id));
    } catch {
      alert('Failed to delete entry.');
    }
  };

  // ── FAB handlers ──────────────────────────────────
  const handleSearchSubmit = async () => {
    if (!searchText.trim())    { setSearchError('Search cannot be empty.'); return; }
    if (searchText.length < 3) { setSearchError('Search must be at least 3 characters.'); return; }
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

  const handleQuestionSubmit = async () => {
    if (!questionText.trim())     { setQuestionError('Question cannot be empty.'); return; }
    if (questionText.length < 10) { setQuestionError('Please provide more detail (10+ characters).'); return; }
    try {
      const res  = await fetch(`${API}/posts`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ user: currentUser ? currentUser.username : 'You', question: questionText, tag: 'Other' }),
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
  };

  const myPosts = currentUser
    ? posts.filter(p => !String(p.id).startsWith('seed-') && p.user === currentUser.username)
    : [];

  const TAG_OPTIONS = ['Engine', 'Brakes', 'Transmission', 'Electrical', 'AC', 'Suspension', 'Exhaust', 'General', 'Other'];
  const STATUS_OPTIONS = ['completed', 'in-progress', 'pending'];

  return (
    <div className="min-h-screen flex flex-col bg-garage-bg font-body">

      {/* ── NAVBAR ── */}
      <nav className="w-full sticky top-0 z-50 border-b border-garage-border" style={{ backgroundColor: '#1A2535' }}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">

          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer">
            <MechRelayLogo size={48} />
            <span className="font-condensed font-extrabold text-xl tracking-wide text-garage-text">
              Mech<span className="text-garage-gold">Relay</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'How It Works', 'Community', 'About'].map((item) => (
              <a key={item} href="#"
                onClick={(e) => { e.preventDefault(); navigateTo(getPageKey(item)); }}
                className={`text-sm font-medium transition-colors ${activePage === getPageKey(item) ? 'text-garage-text' : 'text-garage-muted hover:text-garage-text'}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div
              className={`flex items-center gap-2 border border-garage-border rounded transition-all duration-300 ${searchOpen ? 'w-52 px-3 py-2' : 'w-9 h-9 p-0'}`}
              style={{ backgroundColor: '#0F1923' }}
            >
              <button onClick={() => setSearchOpen(p => !p)} className="w-full h-full flex items-center justify-center">
                <Search className="w-4 h-4 text-garage-muted" />
              </button>
              {searchOpen && (
                <input autoFocus type="text" placeholder="Search..." onBlur={() => setSearchOpen(false)}
                  className="w-full bg-transparent outline-none text-sm text-garage-text placeholder:text-garage-muted"
                />
              )}
            </div>
            <button onClick={() => navigateTo('post')}
              className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition">
              POST
            </button>
            {currentUser ? (
              <button onClick={() => navigateTo('profile')}
                className="text-sm text-garage-gold hover:text-garage-text transition font-condensed font-bold tracking-wide">
                {currentUser.username}
              </button>
            ) : (
              <button onClick={() => navigateTo('login')} className="text-sm text-garage-muted hover:text-garage-text transition">
                Login
              </button>
            )}
          </div>

          <button onClick={() => setMenuOpen(p => !p)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" aria-label="Toggle menu">
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-garage-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-garage-border px-6 py-4 space-y-3" style={{ backgroundColor: '#1A2535' }}>
            <div className="flex items-center gap-2 border border-garage-border rounded px-3 py-2" style={{ backgroundColor: '#0F1923' }}>
              <Search className="w-4 h-4 text-garage-muted" />
              <input type="text" placeholder="Search issues, codes, or topics..."
                className="w-full bg-transparent outline-none text-sm text-garage-text placeholder:text-garage-muted" />
            </div>
            {['Home', 'How It Works', 'Community', 'About', 'Post'].map((item) => (
              <a key={item} href="#"
                onClick={(e) => { e.preventDefault(); navigateTo(getPageKey(item)); }}
                className="block text-garage-muted hover:text-garage-text transition py-1 text-sm font-medium">
                {item}
              </a>
            ))}
            {currentUser ? (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('profile'); }} className="block text-garage-gold py-1 text-sm font-medium">
                  My Profile ({currentUser.username})
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="block text-garage-muted hover:text-garage-text py-1 text-sm font-medium">
                  Logout
                </a>
              </>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="block text-garage-muted hover:text-garage-text py-1 text-sm font-medium">
                Login
              </a>
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
                <h1 className="font-condensed font-extrabold text-garage-text leading-none tracking-tight fade-up fade-up-1"
                  style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
                  The Shop in<br /><span className="text-garage-gold">Your Pocket.</span>
                </h1>
                <p className="mt-5 text-garage-muted text-lg leading-relaxed max-w-xl mx-auto fade-up fade-up-2">
                  Real answers from techs who've done the job. No dead threads,
                  no endless scrolling — just fast, shop-floor knowledge when you need it.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center fade-up fade-up-3">
                  <button onClick={() => navigateTo('post')}
                    className="px-8 py-3 bg-garage-gold text-garage-bg font-condensed font-bold text-base tracking-widest rounded hover:bg-garage-gold-hover transition">
                    POST A QUESTION
                  </button>
                  <button onClick={() => navigateTo('how-it-works')}
                    className="px-8 py-3 bg-transparent text-garage-text border border-garage-border font-condensed font-semibold text-base tracking-widest rounded hover:bg-garage-surface transition">
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
            onViewUser={handleViewUser}
          />
        )}

        {activePage === 'post' && <Post onSubmit={handleNewPost} />}

        {/* ── LOGIN / SIGNUP ── */}
        {activePage === 'login' && (
          <section className="py-20 flex items-center justify-center px-6">
            <div className="p-8 rounded w-full max-w-md border border-garage-border" style={{ backgroundColor: '#1A2535' }}>
              <h2 className="font-condensed font-extrabold text-2xl tracking-wide text-garage-text mb-6 text-center">
                Mech<span className="text-garage-gold">Relay</span>
              </h2>
              <div className="flex border border-garage-border rounded overflow-hidden mb-6">
                <button onClick={() => { setAuthTab('login'); setLoginError(''); setSignupError(''); }}
                  className={`flex-1 py-2 text-sm font-condensed font-bold tracking-widest transition ${authTab === 'login' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}>
                  SIGN IN
                </button>
                <button onClick={() => { setAuthTab('signup'); setLoginError(''); setSignupError(''); }}
                  className={`flex-1 py-2 text-sm font-condensed font-bold tracking-widest transition ${authTab === 'signup' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}>
                  CREATE ACCOUNT
                </button>
              </div>
              {authTab === 'login' ? (
                <>
                  <input type="email" placeholder="Email" value={loginEmail}
                    onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                    style={{ backgroundColor: '#0F1923' }} />
                  <input type="password" placeholder="Password" value={loginPassword}
                    onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full mb-4 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                    style={{ backgroundColor: '#0F1923' }} />
                  {loginError && <p className="text-red-400 text-sm mb-4">{loginError}</p>}
                  <button onClick={handleLogin} className="w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                    SIGN IN
                  </button>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Username" value={signupUsername}
                    onChange={(e) => { setSignupUsername(e.target.value); setSignupError(''); }}
                    className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                    style={{ backgroundColor: '#0F1923' }} />
                  <input type="email" placeholder="Email" value={signupEmail}
                    onChange={(e) => { setSignupEmail(e.target.value); setSignupError(''); }}
                    className="w-full mb-3 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                    style={{ backgroundColor: '#0F1923' }} />
                  <input type="password" placeholder="Password" value={signupPassword}
                    onChange={(e) => { setSignupPassword(e.target.value); setSignupError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                    className="w-full mb-4 px-4 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                    style={{ backgroundColor: '#0F1923' }} />
                  {signupError && <p className="text-red-400 text-sm mb-4">{signupError}</p>}
                  <button onClick={handleSignup} className="w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                    CREATE ACCOUNT
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {/* ── MY PROFILE PAGE ── */}
        {activePage === 'profile' && (
          <section className="max-w-3xl mx-auto px-6 py-12">
            {!currentUser ? (
              <div className="text-center py-20">
                <p className="text-garage-muted mb-4">You need to be logged in to view your profile.</p>
                <button onClick={() => navigateTo('login')}
                  className="px-6 py-2 bg-garage-gold text-garage-bg font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition">
                  LOG IN
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-condensed font-extrabold text-3xl text-garage-text tracking-wide">
                      {currentUser.username}
                    </h2>
                    <p className="text-garage-muted text-sm mt-1">{myPosts.length} post{myPosts.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={handleLogout}
                    className="px-4 py-2 border border-garage-border text-garage-muted text-sm rounded hover:text-garage-text hover:border-garage-text transition font-condensed tracking-widest">
                    LOGOUT
                  </button>
                </div>

                <div className="flex border border-garage-border rounded overflow-hidden mb-6">
                  <button onClick={() => setProfileTab('posts')}
                    className={`flex-1 py-2.5 text-sm font-condensed font-bold tracking-widest transition ${profileTab === 'posts' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}>
                    MY POSTS
                  </button>
                  <button onClick={() => setProfileTab('joblog')}
                    className={`flex-1 py-2.5 text-sm font-condensed font-bold tracking-widest transition ${profileTab === 'joblog' ? 'bg-garage-gold text-garage-bg' : 'text-garage-muted hover:text-garage-text'}`}>
                    JOB LOG
                  </button>
                </div>

                {profileTab === 'posts' && (
                  myPosts.length === 0 ? (
                    <div className="border border-garage-border rounded p-8 text-center" style={{ backgroundColor: '#1A2535' }}>
                      <p className="text-garage-muted text-sm">You haven't posted anything yet.</p>
                      <button onClick={() => navigateTo('post')}
                        className="mt-4 px-6 py-2 bg-garage-gold text-garage-bg font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition text-sm">
                        POST A QUESTION
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myPosts.map(post => (
                        <div key={post.id} className="border border-garage-border rounded p-5" style={{ backgroundColor: '#1A2535' }}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-garage-gold font-condensed font-bold uppercase tracking-wider">{post.tag}</span>
                              <p className="text-garage-text text-sm mt-1 leading-relaxed">{post.question}</p>
                              <p className="text-garage-muted text-xs mt-2">
                                {post.time} · {post.reply_count ?? 0} {post.reply_count === 1 ? 'reply' : 'replies'}
                              </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button onClick={() => openEditModal(post)}
                                className="px-3 py-1.5 text-xs font-condensed font-bold tracking-wider border border-garage-border text-garage-muted rounded hover:text-garage-text hover:border-garage-gold transition">
                                EDIT
                              </button>
                              <button onClick={() => openDeleteConfirm(post.id)}
                                className="px-3 py-1.5 text-xs font-condensed font-bold tracking-wider border border-red-800 text-red-400 rounded hover:bg-red-900/30 transition">
                                DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

                {profileTab === 'joblog' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-condensed font-bold text-lg text-garage-text tracking-wide uppercase">Job Log</h3>
                      <button onClick={() => setJobFormOpen(p => !p)}
                        className="px-4 py-2 bg-garage-gold text-garage-bg font-condensed font-bold text-sm tracking-widest rounded hover:bg-garage-gold-hover transition">
                        {jobFormOpen ? 'CANCEL' : '+ ADD ENTRY'}
                      </button>
                    </div>

                    {jobFormOpen && (
                      <div className="border border-garage-border rounded p-5 mb-6" style={{ backgroundColor: '#1A2535' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Vehicle (e.g. 2019 Ford F-150)"
                            value={jobForm.vehicle}
                            onChange={(e) => setJobForm(p => ({ ...p, vehicle: e.target.value }))}
                            className="px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                            style={{ backgroundColor: '#0F1923' }} />
                          <input type="text" placeholder="Repair type (e.g. Brake pad replacement)"
                            value={jobForm.repair_type}
                            onChange={(e) => setJobForm(p => ({ ...p, repair_type: e.target.value }))}
                            className="px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                            style={{ backgroundColor: '#0F1923' }} />
                          <input type="date" value={jobForm.date}
                            onChange={(e) => setJobForm(p => ({ ...p, date: e.target.value }))}
                            className="px-3 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm"
                            style={{ backgroundColor: '#0F1923' }} />
                          <select value={jobForm.status}
                            onChange={(e) => setJobForm(p => ({ ...p, status: e.target.value }))}
                            className="px-3 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm"
                            style={{ backgroundColor: '#0F1923' }}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <textarea placeholder="Notes (optional)" value={jobForm.notes}
                          onChange={(e) => setJobForm(p => ({ ...p, notes: e.target.value }))}
                          className="w-full h-20 px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition resize-none text-sm mb-3"
                          style={{ backgroundColor: '#0F1923' }} />
                        {jobFormError && <p className="text-red-400 text-sm mb-3">{jobFormError}</p>}
                        <button onClick={handleJobFormSubmit}
                          className="w-full py-2 bg-garage-gold text-garage-bg font-condensed font-bold tracking-widest rounded hover:bg-garage-gold-hover transition text-sm">
                          SAVE ENTRY
                        </button>
                      </div>
                    )}

                    {jobLogsLoading ? (
                      <p className="text-garage-muted text-sm text-center py-8">Loading...</p>
                    ) : jobLogs.length === 0 ? (
                      <div className="border border-garage-border rounded p-8 text-center" style={{ backgroundColor: '#1A2535' }}>
                        <p className="text-garage-muted text-sm">No job log entries yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {jobLogs.map(job => (
                          <div key={job.id} className="border border-garage-border rounded p-4" style={{ backgroundColor: '#1A2535' }}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="text-sm font-semibold text-garage-text">{job.vehicle}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded font-condensed font-bold uppercase tracking-wider ${
                                    job.status === 'completed'   ? 'bg-green-900/40 text-green-400 border border-green-800' :
                                    job.status === 'in-progress' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-800' :
                                    'bg-garage-surface text-garage-muted border border-garage-border'
                                  }`}>{job.status}</span>
                                </div>
                                <p className="text-garage-gold text-xs font-condensed font-bold uppercase tracking-wider">{job.repair_type}</p>
                                {job.notes && <p className="text-garage-muted text-xs mt-1 leading-relaxed">{job.notes}</p>}
                                <p className="text-garage-muted text-xs mt-2">{job.date}</p>
                              </div>
                              <button onClick={() => handleJobDelete(job.id)}
                                className="text-xs text-red-400 border border-red-800 px-2 py-1 rounded hover:bg-red-900/30 transition font-condensed font-bold tracking-wider shrink-0">
                                DELETE
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ── USER PROFILE PAGE (read-only) ── */}
        {activePage === 'user-profile' && viewingUser && (
          <section className="max-w-3xl mx-auto px-6 py-12">
            <button onClick={() => navigateTo('community')}
              className="flex items-center gap-2 text-garage-muted hover:text-garage-text transition text-sm mb-8 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Community
            </button>
            <div className="flex items-center gap-4 mb-8 p-6 border border-garage-border rounded" style={{ backgroundColor: '#1A2535' }}>
              <div className="w-16 h-16 rounded-full bg-garage-gold flex items-center justify-center text-garage-bg font-condensed font-extrabold text-2xl shrink-0">
                {viewingUser[0].toUpperCase()}
              </div>
              <div>
                <h2 className="font-condensed font-extrabold text-3xl text-garage-text tracking-wide">{viewingUser}</h2>
                <p className="text-garage-muted text-sm mt-1">
                  {viewingUserLoading ? '...' : `${viewingUserPosts.length} post${viewingUserPosts.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
            <h3 className="font-condensed font-bold text-lg text-garage-text tracking-wide mb-4 uppercase">Posts by {viewingUser}</h3>
            {viewingUserLoading ? (
              <p className="text-garage-muted text-sm text-center py-12">Loading posts...</p>
            ) : viewingUserPosts.length === 0 ? (
              <div className="border border-garage-border rounded p-8 text-center" style={{ backgroundColor: '#1A2535' }}>
                <p className="text-garage-muted text-sm">No posts yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {viewingUserPosts.map(post => (
                  <div key={post.id}
                    onClick={() => { handleSetActivePostId(post.id); navigateTo('community'); }}
                    className="border border-garage-border rounded p-5 cursor-pointer hover:border-garage-gold transition group"
                    style={{ backgroundColor: '#1A2535' }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-garage-gold font-condensed font-bold uppercase tracking-wider">{post.tag}</span>
                        <p className="text-garage-text text-sm mt-1 leading-relaxed">{post.question}</p>
                        <p className="text-garage-muted text-xs mt-2">{post.time} · {post.reply_count ?? 0} {post.reply_count === 1 ? 'reply' : 'replies'}</p>
                      </div>
                      <span className="text-xs text-garage-gold opacity-0 group-hover:opacity-100 transition font-condensed font-bold tracking-wider shrink-0">VIEW →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── MOBILE FAB ── */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <div className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button onClick={() => { setShowSearchModal(true); setFabOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}>
              <Search className="w-4 h-4" /><span>Search</span>
            </button>
            <button onClick={() => { setShowQuestionModal(true); setFabOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}>
              <HelpCircle className="w-4 h-4" /><span>Ask a Question</span>
            </button>
            <button onClick={() => { setShowUploadModal(true); setFabOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-garage-border text-garage-text text-sm"
              style={{ backgroundColor: '#1A2535' }}>
              <Camera className="w-4 h-4" /><span>Upload Photo</span>
            </button>
          </div>
          <button onClick={() => setFabOpen(p => !p)}
            className="w-14 h-14 rounded bg-garage-gold text-garage-bg shadow-xl flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform">
            {fabOpen ? '×' : '+'}
          </button>
        </div>

        {/* ── SEARCH MODAL ── */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => { setShowSearchModal(false); setSearchResults(null); setSearchText(''); }}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Search</h2>
              <input type="text" value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setSearchError(''); setSearchResults(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search issues, codes, or topics..."
                className="w-full px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }} />
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
                        <div key={post.id}
                          onClick={() => { setShowSearchModal(false); setSearchResults(null); setSearchText(''); handleSetActivePostId(post.id); navigateTo('community'); }}
                          className="p-3 rounded border border-garage-border cursor-pointer hover:border-garage-gold transition text-sm"
                          style={{ backgroundColor: '#0F1923' }}>
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
              <textarea value={questionText} onChange={(e) => { setQuestionText(e.target.value); setQuestionError(''); }}
                placeholder="Describe the issue..."
                className="w-full h-32 px-3 py-2 rounded border border-garage-border text-garage-text placeholder:text-garage-muted outline-none focus:border-garage-gold transition resize-none text-sm"
                style={{ backgroundColor: '#0F1923' }} />
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
              <input type="file" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]; setUploadError('');
                  if (!file) return;
                  if (!file.type.startsWith('image/')) { setUploadError('File must be an image.'); setUploadFile(null); return; }
                  if (file.size > 5 * 1024 * 1024) { setUploadError('Image must be under 5MB.'); setUploadFile(null); return; }
                  setUploadFile(file);
                }}
                className="w-full text-garage-muted text-sm" />
              {uploadFile && <p className="text-garage-text text-xs mt-2">Selected: {uploadFile.name}</p>}
              {uploadError && <p className="text-red-400 text-sm mt-2">{uploadError}</p>}
              <button onClick={handleUploadSubmit} className="mt-4 w-full bg-garage-gold text-garage-bg py-2 rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition">
                UPLOAD
              </button>
            </div>
          </div>
        )}

        {/* ── EDIT POST MODAL ── */}
        {showEditModal && editingPost && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowEditModal(false)}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-md" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-4">Edit Post</h2>
              <textarea value={editQuestion} onChange={(e) => { setEditQuestion(e.target.value); setEditError(''); }}
                className="w-full h-32 px-3 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition resize-none text-sm"
                style={{ backgroundColor: '#0F1923' }} />
              <select value={editTag} onChange={(e) => setEditTag(e.target.value)}
                className="w-full mt-3 px-3 py-2 rounded border border-garage-border text-garage-text outline-none focus:border-garage-gold transition text-sm"
                style={{ backgroundColor: '#0F1923' }}>
                {TAG_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {editError && <p className="text-red-400 text-sm mt-2">{editError}</p>}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 border border-garage-border text-garage-muted rounded font-condensed font-bold tracking-widest hover:text-garage-text transition text-sm">
                  CANCEL
                </button>
                <button onClick={handleEditSubmit}
                  className="flex-1 py-2 bg-garage-gold text-garage-bg rounded font-condensed font-bold tracking-widest hover:bg-garage-gold-hover transition text-sm">
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE CONFIRM MODAL ── */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
            <div className="border border-garage-border p-6 rounded w-11/12 max-w-sm" style={{ backgroundColor: '#1A2535' }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-condensed font-bold text-xl text-garage-text mb-2">Delete Post?</h2>
              <p className="text-garage-muted text-sm mb-6">This will permanently delete the post and all its replies. This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 border border-garage-border text-garage-muted rounded font-condensed font-bold tracking-widest hover:text-garage-text transition text-sm">
                  CANCEL
                </button>
                <button onClick={handleDeleteConfirm}
                  className="flex-1 py-2 bg-red-700 text-white rounded font-condensed font-bold tracking-widest hover:bg-red-600 transition text-sm">
                  DELETE
                </button>
              </div>
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