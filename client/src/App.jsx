import { Sun, Moon } from 'lucide-react';
import logo from './assets/Mech-Relay.png';
import { useState, useEffect } from 'react';
import { Search, HelpCircle, Camera } from 'lucide-react';
import './App.css';
import WhyMechRelay from "./pages/WhyMechRelay";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import Post from "./pages/Post";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    } catch (err) {
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
    } catch (err) {
      setQuestionError('Something went wrong. Try again.');
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) { setUploadError('Please select an image.'); return; }
    const formData = new FormData();
    formData.append('photo', uploadFile);
    try {
      await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      setShowUploadModal(false);
      setUploadFile(null);
    } catch (err) {
      setUploadError('Upload failed. Try again.');
    }
  };

  const navItems = ['Home', 'How It Works', 'Community', 'About', 'Post', 'Login'];

  const getPageKey = (item) => item.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out">

      {/* NAVBAR */}
      <nav className="w-full bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <img
            src={logo}
            alt="MechRelay Logo"
            className="max-w-20 h-auto transition-all dark:brightness-125 dark:contrast-125 dark:drop-shadow-md cursor-pointer"
            onClick={() => setActivePage('home')}
          />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium text-base">
            {['Home', 'How It Works', 'Community', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage(getPageKey(item)); }}
                className={`relative group transition-colors ${
                  activePage === getPageKey(item)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">

            {/* Expandable Search */}
            <div className={`flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 transition-all duration-300 ${searchOpen ? 'w-56' : 'w-10'}`}>
        <button onClick={() => setSearchOpen((prev) => !prev)}>
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-300 shrink-0" />
        </button>
        {searchOpen && (
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            onBlur={() => setSearchOpen(false)}
            className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
          />
        )}
      </div>

            {/* Post CTA */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActivePage('post'); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
            >
              Post
            </a>

            {/* Login */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActivePage('login'); }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
            >
              Login
            </a>
          </div>

    {/* Mobile Right Side */}
    <div className="md:hidden flex items-center gap-3">
      {/* Dark Mode Toggle — mobile only shows here */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
    </div>
  </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3 text-gray-700 dark:text-gray-200 font-medium">

            {/* Mobile Search */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search issues, codes, or topics..."
                className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>

            {/* Mobile Nav Links */}
            {['Home', 'How It Works', 'Community', 'About', 'Post', 'Login'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage(getPageKey(item)); setMenuOpen(false); }}
                className="block hover:text-blue-600 dark:hover:text-blue-400 transition py-1"
              >
                {item}
              </a>
            ))}

            {/* Dark Mode Toggle — inside mobile menu on desktop */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow">

        {/* HOME PAGE */}
        {activePage === 'home' && (
          <section className="bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20 transition-colors">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white hero-animate hero-delay-1">
                The Shop in Your Pocket
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto hero-animate hero-delay-2">
                MechRelay helps mechanics talk to each other quickly and clearly.
                Share problems, photos, and real-world advice — dead threads, or endless scrolling
              . Just fast answers from techs who've done the job.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center hero-animate hero-delay-3">
                <button
                  onClick={() => setActivePage('post')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition button-ripple"
                >
                  Post a Question
                </button>
                <button
                  onClick={() => setActivePage('how-it-works')}
                  className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  See How It Works
                </button>
              </div>
            </div>
          </section>
        )}

        {/* HOW IT WORKS PAGE */}
        {activePage === 'how-it-works' && <HowItWorks />}

        {/* COMMUNITY PAGE */}
        {activePage === 'community' && <Community />}

        {/* ABOUT PAGE */}
        {activePage === 'about' && <WhyMechRelay />}

        {/* POST PAGE */}
        {activePage === 'post' && <Post />}

        {/* LOGIN PAGE */}
        {activePage === 'login' && (
          <section className="py-20 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Sign In to MechRelay</h2>
              <input type="email" placeholder="Email" className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
              <input type="password" placeholder="Password" className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">Sign In</button>
              <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</a>
              </p>
            </div>
          </section>
        )}

        {/* FLOATING ACTION BUTTON */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <div className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button onClick={() => setShowSearchModal(true)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white shadow-lg text-sm">
              <Search className="w-4 h-4" /><span>Search</span>
            </button>
            <button onClick={() => setShowQuestionModal(true)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 text-white shadow-lg text-sm">
              <HelpCircle className="w-4 h-4" /><span>Ask a Question</span>
            </button>
            <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-600 text-white shadow-lg text-sm">
              <Camera className="w-4 h-4" /><span>Upload Photo</span>
            </button>
          </div>
          <button
            onClick={() => setFabOpen((prev) => !prev)}
            className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center text-2xl active:scale-95 transition-transform"
          >
            {fabOpen ? '×' : '+'}
          </button>
        </div>

        {/* SEARCH MODAL */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSearchModal(false)}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-md animate-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search</h2>
              <input
                type="text"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setSearchError(''); }}
                placeholder="Search issues, codes, or topics..."
                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              />
              {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
              <button onClick={handleSearchSubmit} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Search</button>
            </div>
          </div>
        )}

        {/* ASK A QUESTION MODAL */}
        {showQuestionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowQuestionModal(false)}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-md animate-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Ask a Question</h2>
              <textarea
                value={questionText}
                onChange={(e) => { setQuestionText(e.target.value); setQuestionError(''); }}
                placeholder="Describe the issue..."
                className="w-full h-32 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              />
              {questionError && <p className="text-red-500 text-sm mt-2">{questionError}</p>}
              <button onClick={handleQuestionSubmit} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Submit</button>
            </div>
          </div>
        )}

        {/* UPLOAD PHOTO MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUploadModal(false)}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-md animate-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upload Photo</h2>
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
                className="w-full text-gray-900 dark:text-gray-200"
              />
              {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
              <button onClick={handleUploadSubmit} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Upload</button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-800 py-8 mt-20 shadow-inner transition-colors relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p className="text-lg font-medium">MechRelay © {new Date().getFullYear()}</p>
          <p className="mt-2 text-sm">
            Empowering mechanics to learn, collaborate, and solve problems — faster, smarter, together.
          </p>
        </div>
      </footer>

    </div>
  );
}