import React, { useState } from 'react';
import { WorkItem, Category } from '../types/portfolio';
import { ArrowLeft, Play, Image as ImageIcon, Plus, Film, Camera, Sparkles, Trash2, ArrowUpRight, Search, Box } from 'lucide-react';

interface CategoryGalleryPageProps {
  initialCategory: Category;
  items: WorkItem[];
  isAdmin: boolean;
  onBack: () => void;
  onSelectItem: (item: WorkItem) => void;
  onOpenUpload: () => void;
  onDeleteItem: (id: string) => void;
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

export const CategoryGalleryPage: React.FC<CategoryGalleryPageProps> = ({
  initialCategory,
  items,
  isAdmin,
  onBack,
  onSelectItem,
  onOpenUpload,
  onDeleteItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategorySubtitle = (cat: Category) => {
    switch (cat) {
      case '2D Animation':
        return 'Hand-drawn character animation, frame-by-frame sequences, and motion storytelling.';
      case '3D Animation':
        return '3D character performance, volumetric lighting, and cinematic 3D shots.';
      case '3D Model':
        return 'Hard-surface mechanical assets, ZBrush character sculpting, and PBR turntable renders.';
      case 'Video Editing':
        return 'Cinematic cuts, rhythmic pacing, color grading, and dynamic promo edits.';
      case 'Photography':
        return 'High-contrast street photography, portraiture, and atmospheric landscape shots.';
      case 'Artworks':
        return 'Digital paintings, character concept art, background illustrations, and sketches.';
      default:
        return 'Complete archive of uploaded videos, 3D models, photography, and digital artworks.';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1c1c1e] pt-24 pb-24 px-6 sm:px-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-300/80">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200/80 hover:bg-stone-300/80 text-stone-900 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio Home</span>
          </button>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onOpenUpload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Upload to {selectedCategory === 'All' ? 'Portfolio' : selectedCategory}</span>
              </button>
            )}
            <span className="text-xs font-semibold uppercase text-stone-500 bg-stone-200 px-3 py-1.5 rounded-full">
              {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Uploaded
            </span>
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="bg-[#efece6] p-8 sm:p-12 rounded-3xl border border-stone-300/70 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-stone-900 text-white rounded-full">
              {selectedCategory === 'All' ? 'Full Portfolio Gallery' : selectedCategory}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900">
              {selectedCategory === 'All' ? 'All Uploaded Works' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
              {getCategorySubtitle(selectedCategory)}
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Sparkles className="w-72 h-72 text-stone-900" />
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700 hover:text-stone-950 border border-stone-300/50'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-300 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search uploaded titles, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-200/70 border border-stone-300 rounded-full text-xs text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-800"
            />
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Media Items Grid Layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#efece6] rounded-3xl border border-stone-300/60 p-8 space-y-4">
            <Box className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-stone-800">No items uploaded in {selectedCategory} yet</h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              You haven't uploaded any items to this section yet. Switch categories or click upload to publish a video or photograph!
            </p>
            {isAdmin && (
              <button
                onClick={onOpenUpload}
                className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-stone-800 transition-colors"
              >
                + Upload New Work
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group cursor-pointer flex flex-col bg-[#efece6] rounded-2xl overflow-hidden border border-stone-300/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

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

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-md border border-white/10">
                      {item.category}
                    </span>
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

                  {/* Delete Option for Creator */}
                  {isAdmin && item.id.startsWith('custom-') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-md"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Details Content */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-transform" />
                    </div>
                    <p className="text-xs text-stone-500 font-medium">{item.category}</p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="pt-3 border-t border-stone-300/40 flex flex-wrap gap-1.5">
                    {item.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-medium bg-stone-300/50 text-stone-700 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
