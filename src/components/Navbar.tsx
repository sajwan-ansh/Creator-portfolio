import React, { useState, useEffect } from 'react';
import { PlusCircle, Sparkles, Menu, X, ShieldCheck, Lock, FolderKanban, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  currentPage: 'home' | 'gallery';
  onNavigateHome: () => void;
  onNavigateGallery: () => void;
  onOpenUpload: () => void;
  onOpenContact: () => void;
  onToggleAdminLock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateGallery,
  onOpenUpload,
  onOpenContact,
  onToggleAdminLock,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || currentPage === 'gallery'
          ? 'bg-[#f7f6f2]/90 backdrop-blur-md shadow-sm py-3.5 border-b border-stone-200/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="group flex items-center gap-1.5 text-left focus-visible:ring-2 focus-visible:ring-amber-500 outline-none rounded-lg p-1"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
              {SITE_CONFIG.creator.name}.
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-stone-900 mt-2"></span>
          </button>

          {/* Admin Lock Badge Indicator */}
          <button
            onClick={onToggleAdminLock}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-amber-500 outline-none ${
              isAuthenticated
                ? 'bg-amber-500/20 text-amber-800 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-stone-200/80 text-stone-600 border border-stone-300 hover:bg-stone-300'
            }`}
            title={isAuthenticated ? 'Creator Mode Active (Click to Lock)' : 'Public Mode (Click to Unlock Uploads)'}
          >
            {isAuthenticated ? (
              <>
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>Creator Mode</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-stone-500" />
                <span>Visitor Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700" aria-label="Main Navigation">
          <button
            onClick={onNavigateHome}
            className={`hover:text-stone-950 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none ${
              currentPage === 'home'
                ? 'text-stone-950 font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-stone-900'
                : ''
            }`}
          >
            Home
          </button>
          
          <button
            onClick={onNavigateGallery}
            className={`hover:text-stone-950 transition-colors flex items-center gap-1.5 relative py-1 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none ${
              currentPage === 'gallery'
                ? 'text-stone-950 font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-stone-900'
                : ''
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>My Work Gallery</span>
          </button>

          <a
            href="#about"
            onClick={currentPage === 'gallery' ? onNavigateHome : undefined}
            className="hover:text-stone-950 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          >
            About
          </a>

          <button
            onClick={onOpenContact}
            className="hover:text-stone-950 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-amber-500 outline-none ${
              isAuthenticated
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold border border-amber-600'
                : 'text-stone-900 bg-stone-200/80 hover:bg-stone-300/80 border border-stone-300'
            }`}
          >
            {isAuthenticated ? <PlusCircle className="w-3.5 h-3.5 text-stone-950" /> : <Lock className="w-3.5 h-3.5 text-stone-700" />}
            <span>{isAuthenticated ? 'Upload Work' : 'Creator Portal'}</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className="p-2 text-stone-500 hover:text-red-600 rounded-full transition-colors"
              title="Lock Creator Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-300" />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-200/60 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f6f2] border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-stone-300/60">
            <span className="text-xs font-bold uppercase text-stone-500">Session</span>
            <button
              onClick={() => {
                onToggleAdminLock();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-amber-700 flex items-center gap-1"
            >
              {isAuthenticated ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isAuthenticated ? 'Creator Mode (Unlocked)' : 'Unlock Creator Portal'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Home
          </button>

          <button
            onClick={() => {
              onNavigateGallery();
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full text-base font-bold text-stone-900"
          >
            📂 Open Full Work Gallery
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="block text-left w-full text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Contact
          </button>

          <div className="pt-4 border-t border-stone-300/60 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUpload();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 border border-stone-300 rounded-full"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAuthenticated ? 'Upload Work' : 'Creator Portal (PIN)'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hire Me</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
