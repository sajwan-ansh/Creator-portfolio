import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkGrid } from './components/WorkGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CategoryGalleryPage } from './components/CategoryGalleryPage';
import { MediaModal } from './components/MediaModal';
import { UploadModal } from './components/UploadModal';
import { ContactModal } from './components/ContactModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { INITIAL_WORK_ITEMS } from './data/initialPortfolioData';
import { WorkItem, Category } from './types/portfolio';

const MainApp: React.FC = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(() => {
    const saved = localStorage.getItem('ansh_portfolio_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const customItems = parsed.filter((item: WorkItem) => item.id.startsWith('custom-'));
        return [...customItems, ...INITIAL_WORK_ITEMS];
      } catch (err) {
        console.error('Failed to parse saved portfolio items', err);
      }
    }
    return INITIAL_WORK_ITEMS;
  });

  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<Category>('All');

  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Only save minimal metadata & valid URLs to localStorage (no heavy Base64 media)
    const sanitizedItems = workItems.map((item) => ({
      ...item,
      // Ensure media URLs are clean references
      mediaUrl: item.mediaUrl.startsWith('data:') ? item.thumbnail : item.mediaUrl,
    }));
    localStorage.setItem('ansh_portfolio_items', JSON.stringify(sanitizedItems));
  }, [workItems]);

  const handleOpenUpload = () => {
    if (isAuthenticated) {
      setIsUploadOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleToggleAdminLock = () => {
    if (isAuthenticated) {
      logout();
      setIsUploadOpen(false);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenCategoryPage = (category: Category) => {
    setSelectedGalleryCategory(category);
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddWorkItem = (newItem: WorkItem) => {
    setWorkItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setWorkItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1c1c1e] selection:bg-stone-900 selection:text-white">
      {/* Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateGallery={() => handleOpenCategoryPage('All')}
        onOpenUpload={handleOpenUpload}
        onOpenContact={() => setIsContactOpen(true)}
        onToggleAdminLock={handleToggleAdminLock}
      />

      {/* Main View Switcher */}
      {currentPage === 'home' ? (
        <main className="animate-fadeIn">
          <Hero />
          
          <WorkGrid
            items={workItems}
            isAdmin={isAuthenticated}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenCategoryPage={handleOpenCategoryPage}
            onDeleteItem={handleDeleteItem}
          />

          <AboutSection />
        </main>
      ) : (
        <main className="animate-fadeIn">
          <CategoryGalleryPage
            initialCategory={selectedGalleryCategory}
            items={workItems}
            isAdmin={isAuthenticated}
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenUpload={handleOpenUpload}
            onDeleteItem={handleDeleteItem}
          />
        </main>
      )}

      {/* Dark Footer Contact Section */}
      <ContactSection onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals & Lightboxes */}
      <MediaModal
        item={selectedItem}
        items={workItems}
        onClose={() => setSelectedItem(null)}
        onNavigateItem={(item) => setSelectedItem(item)}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddWorkItem={handleAddWorkItem}
      />

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
