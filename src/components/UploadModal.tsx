import React, { useState } from 'react';
import { WorkItem, Category, MediaType } from '../types/portfolio';
import { storageService } from '../services/storageService';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, Upload, Video, Image as ImageIcon, Sparkles, Plus, Check, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkItem: (newItem: WorkItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onAddWorkItem }) => {
  // Hooks defined FIRST at top level
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<Category, 'All'>>('2D Animation');
  const [type, setType] = useState<MediaType>('video');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [thumbnailInput, setThumbnailInput] = useState('');
  const [description, setDescription] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [client, setClient] = useState('');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const containerRef = useFocusTrap<HTMLDivElement>({ isOpen, onClose });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMessage(null);

    if (file) {
      const validation = storageService.validateFile(file, { mediaType: type });
      if (!validation.valid) {
        setErrorMessage(validation.error || 'Invalid file format or size.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Project Title is required.');
      return;
    }

    setIsUploading(true);

    try {
      let finalMediaUrl = mediaUrlInput.trim();
      let finalThumbnailUrl = thumbnailInput.trim();

      // Perform storage upload via StorageService if local file selected
      if (selectedFile) {
        const uploadResult = await storageService.uploadFile(selectedFile, { mediaType: type, category });
        if (!uploadResult.success || !uploadResult.mediaUrl) {
          setErrorMessage(uploadResult.error || 'Failed to upload media file.');
          setIsUploading(false);
          return;
        }
        finalMediaUrl = uploadResult.mediaUrl;
        if (!finalThumbnailUrl) {
          finalThumbnailUrl = uploadResult.thumbnailUrl || uploadResult.mediaUrl;
        }
      }

      // Default fallback thumbnail if none specified
      if (!finalThumbnailUrl) {
        finalThumbnailUrl = type === 'video'
          ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80';
      }

      if (!finalMediaUrl) {
        finalMediaUrl = finalThumbnailUrl;
      }

      const toolsArray = toolsInput
        ? toolsInput.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Digital Media'];

      const newItem: WorkItem = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        category,
        type,
        thumbnail: finalThumbnailUrl,
        mediaUrl: finalMediaUrl,
        description: description.trim() || 'Custom uploaded creator work showcasing artistic vision.',
        tools: toolsArray,
        date: new Date().getFullYear().toString(),
        featured: true,
        meta: {
          client: client.trim() || 'Personal Work',
        },
      };

      onAddWorkItem(newItem);
      setSuccessMsg(true);

      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
        // Reset form state
        setTitle('');
        setMediaUrlInput('');
        setThumbnailInput('');
        setDescription('');
        setToolsInput('');
        setClient('');
        setSelectedFile(null);
        setIsUploading(false);
      }, 1000);
    } catch {
      setErrorMessage('An error occurred while publishing project.');
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-overlay bg-black/75 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl bg-[#efece6] text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#f7f6f2] border-b border-stone-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 id="upload-modal-title" className="font-serif text-xl font-bold text-stone-900">
                Upload Creator Work
              </h3>
              <p className="text-xs text-stone-500">Publish videos, 3D models, or photographs to your portfolio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
            aria-label="Close upload modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {errorMessage && (
            <div className="p-3.5 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 flex items-center gap-2 font-medium" role="alert">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Work Title */}
          <div>
            <label htmlFor="upload-title" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Project Title *
            </label>
            <input
              id="upload-title"
              type="text"
              required
              disabled={isUploading}
              placeholder="e.g. Echoes of Midnight, Cyberpunk Mech Render"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800"
            />
          </div>

          {/* Category & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="upload-category" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Category Section
              </label>
              <select
                id="upload-category"
                value={category}
                disabled={isUploading}
                onChange={(e) => setCategory(e.target.value as Exclude<Category, 'All'>)}
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800"
              >
                <option value="2D Animation">2D Animation</option>
                <option value="3D Animation">3D Animation</option>
                <option value="3D Model">3D Model</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Photography">Photography</option>
                <option value="Artworks">Artworks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Content Format
              </label>
              <div className="flex rounded-xl bg-stone-300/60 p-1">
                <button
                  type="button"
                  onClick={() => setType('video')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    type === 'video' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" /> Video
                </button>
                <button
                  type="button"
                  onClick={() => setType('photo')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    type === 'photo' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Photo / Render
                </button>
              </div>
            </div>
          </div>

          {/* File Upload Container */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Upload File (Max 10MB Image / 50MB Video)
            </label>

            <div className="border-2 border-dashed border-stone-300 bg-white hover:bg-stone-50 rounded-2xl p-6 text-center transition-colors relative cursor-pointer group">
              <input
                type="file"
                disabled={isUploading}
                accept={type === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/jpeg,image/png,image/webp'}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2 group-hover:text-stone-700 transition-colors" />
              <p className="text-xs font-semibold text-stone-800">
                {selectedFile ? (
                  <span className="text-amber-700 font-bold">
                    Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)}MB)
                  </span>
                ) : (
                  <>
                    Drag & drop or <span className="text-amber-700 underline">browse computer file</span>
                  </>
                )}
              </p>
            </div>

            {/* Direct URL Fallback */}
            <div className="mt-3">
              <input
                type="url"
                disabled={isUploading}
                placeholder="Or paste direct video/image URL (https://...)"
                value={mediaUrlInput}
                onChange={(e) => {
                  setMediaUrlInput(e.target.value);
                  if (!thumbnailInput) setThumbnailInput(e.target.value);
                }}
                className="w-full px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800"
              />
            </div>
          </div>

          {/* Software & Tools */}
          <div>
            <label htmlFor="upload-tools" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Software / Tools Used (comma separated)
            </label>
            <input
              id="upload-tools"
              type="text"
              disabled={isUploading}
              placeholder="e.g. Blender, ZBrush, Maya, DaVinci Resolve, Procreate"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="upload-desc" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Description
            </label>
            <textarea
              id="upload-desc"
              rows={3}
              disabled={isUploading}
              placeholder="Describe the story, render details, or workflow process behind this piece..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-800 resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-300 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-5 py-2.5 text-xs font-bold text-stone-700 hover:text-stone-950"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || successMsg}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all"
            >
              {successMsg ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Portfolio!</span>
                </>
              ) : isUploading ? (
                <span>Uploading Media...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Publish Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
