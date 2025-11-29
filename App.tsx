import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Logo } from './components/Logo';
import { Button } from './components/UI';
import { MessageSquare, Menu, X, Briefcase } from 'lucide-react';
import Home from './pages/Home';
import ChatAssistant from './pages/ChatAssistant';
import Tools from './pages/Tools';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { path: '/tools', label: 'Tools', icon: Briefcase },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-royal-500/30 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-8 w-8 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" />
            <span className="text-xl font-bold text-white tracking-tight">Mo.Nabil AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-royal-900/50 text-royal-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/chat">
              <Button size="sm" variant="primary">Start Chatting</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 ${
                  isActive(item.path)
                    ? 'bg-royal-900/50 text-royal-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-800">
               <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                 <Button className="w-full">Start Chatting</Button>
               </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-6">
               <Logo className="h-8 w-8 grayscale opacity-70" />
               <span className="text-2xl font-bold text-slate-400">Mo.Nabil AI</span>
            </div>
          
          <div className="text-center text-sm text-slate-600">
            <p>&copy; 2026 Mo.Nabil AI. All rights reserved.</p>
            <p className="mt-2">
              Powered by <span className="text-royal-600 font-semibold">Mo.Nabil Intelligence Engine</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatAssistant />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;