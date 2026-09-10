import React, { useState } from 'react';
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
import { Category, WorkItem } from './types/portfolio';
import { usePortfolio } from './features/portfolio/usePortfolio';

const MainApp: React.FC = () => {
  const { items, addItem, deleteItem } = usePortfolio();
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<Category>('All');
  const { isAuthenticated, logout } = useAuth();

  const openUpload = () => {
    if (isAuthenticated) setIsUploadOpen(true);
    else setIsAuthModalOpen(true);
  };

  const toggleAdminLock = () => {
    if (isAuthenticated) {
      void logout();
      setIsUploadOpen(false);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const openCategoryPage = (category: Category) => {
    setSelectedGalleryCategory(category);
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1c1c1e] selection:bg-stone-900 selection:text-white">
      <Navbar
        currentPage={currentPage}
        onNavigateHome={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateGallery={() => openCategoryPage('All')}
        onOpenUpload={openUpload}
        onOpenContact={() => setIsContactOpen(true)}
        onToggleAdminLock={toggleAdminLock}
      />

      {currentPage === 'home' ? (
        <main className="animate-fadeIn">
          <Hero />
          <WorkGrid
            items={items}
            isAdmin={isAuthenticated}
            onSelectItem={setSelectedItem}
            onOpenCategoryPage={openCategoryPage}
            onDeleteItem={deleteItem}
          />
          <AboutSection />
        </main>
      ) : (
        <main className="animate-fadeIn">
          <CategoryGalleryPage
            initialCategory={selectedGalleryCategory}
            items={items}
            isAdmin={isAuthenticated}
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectItem={setSelectedItem}
            onOpenUpload={openUpload}
            onDeleteItem={deleteItem}
          />
        </main>
      )}

      <ContactSection onOpenContact={() => setIsContactOpen(true)} />

      <MediaModal
        item={selectedItem}
        items={items}
        onClose={() => setSelectedItem(null)}
        onNavigateItem={setSelectedItem}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddWorkItem={addItem}
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

export const App: React.FC = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
