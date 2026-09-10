import React, { useState, useMemo } from 'react';
import { WorkItem, Category } from '../types/portfolio';
import { ImageWithFallback } from './common/ImageWithFallback';
import { Play, Image as ImageIcon, Trash2, ArrowUpRight, Film, Camera, Sparkles, FolderKanban, AlertTriangle } from 'lucide-react';

interface WorkGridProps {
  items: WorkItem[];
  isAdmin: boolean;
  onSelectItem: (item: WorkItem) => void;
  onOpenCategoryPage: (category: Category) => void;
  onDeleteItem?: (id: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  '2D Animation',
  '3D Animation',
  '3D Model',
  'Video Editing',
  'Photography',
  'Artworks',
];

export const WorkGrid: React.FC<WorkGridProps> = React.memo(({
  items,
  isAdmin,
  onSelectItem,
  onOpenCategoryPage,
  onDeleteItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleDeleteConfirmed = (id: string) => {
    if (onDeleteItem) {
      onDeleteItem(id);
      setDeleteConfirmId(null);
    }
  };

  return (
    <section id="work" className="py-16 sm:py-24 px-6 sm:px-10 max-w-7xl mx-auto">
      
      {/* Delete Confirmation Dialog Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80 animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-[#12151b] text-white p-6 rounded-3xl max-w-sm w-full border border-stone-800 space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold">Delete Project?</h3>
            <p className="text-xs text-stone-400">Are you sure you want to delete this project from your portfolio? This action cannot be undone.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirmed(deleteConfirmId)}
                className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
            My Work
          </h2>
          <div className="hidden sm:block w-24 h-[1.5px] bg-stone-300 rounded-full"></div>
        </div>

        {/* Dedicated Page Action */}
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
          <span>{filteredItems.length} Projects Showcase</span>
          <button
            onClick={() => onOpenCategoryPage(activeCategory)}
            className="inline-flex items-center gap-1.5 text-stone-900 hover:text-amber-700 transition-colors font-bold px-3 py-1.5 bg-stone-200/80 hover:bg-stone-300 rounded-full focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Open Dedicated {activeCategory} Page →</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Category Filters">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-stone-200/70 hover:bg-stone-300/80 text-stone-700 hover:text-stone-950 border border-stone-300/50'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-300/80 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <input
            type="text"
            aria-label="Search portfolio work"
            placeholder="Search by title, tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 px-4 py-2 bg-stone-200/50 border border-stone-300 rounded-full text-xs text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-800 transition-all"
          />
        </div>
      </div>

      {/* Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-stone-200/40 rounded-2xl border border-stone-200">
          <Sparkles className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-stone-800">No projects found</h3>
          <p className="text-sm text-stone-500 mt-1">Try switching categories or uploading a new project.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title} (${item.category})`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectItem(item);
                }
              }}
              className="group cursor-pointer flex flex-col bg-[#efece6] rounded-2xl overflow-hidden border border-stone-300/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <ImageWithFallback
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                {item.type === 'video' ? (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-amber-500/90 text-white group-hover:text-stone-950 backdrop-blur-md flex items-center justify-center border border-white/20 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCategoryPage(item.category);
                    }}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 backdrop-blur-md border border-white/10 transition-all"
                  >
                    {item.category} ↗
                  </button>
                  {item.type === 'video' ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500 text-stone-950 flex items-center gap-1">
                      <Film className="w-2.5 h-2.5" /> Video
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-stone-200 text-stone-900 flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" /> Photo
                    </span>
                  )}
                </div>

                {/* Delete Trigger */}
                {isAdmin && onDeleteItem && item.id.startsWith('custom-') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(item.id);
                    }}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-md"
                    title="Delete Project (Creator Mode)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">{item.category}</p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tools Tags */}
                <div className="mt-4 pt-3 border-t border-stone-300/40 flex flex-wrap gap-1.5">
                  {item.tools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-stone-300/50 text-stone-700 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                  {item.tools.length > 3 && (
                    <span className="text-[10px] text-stone-500 font-semibold self-center">
                      +{item.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
});
