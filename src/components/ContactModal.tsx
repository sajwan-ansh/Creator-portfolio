import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { CommissionInquiry } from '../types/portfolio';
import { contactService } from '../services/contactService';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  // Hooks defined FIRST at top level
  const [form, setForm] = useState<CommissionInquiry & { honeypot?: string }>({
    name: '',
    email: '',
    service: '2D Animation',
    budget: '$1,000 - $3,000',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const containerRef = useFocusTrap<HTMLDivElement>({ isOpen, onClose });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result = await contactService.submitInquiry(form);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
          setForm({
            name: '',
            email: '',
            service: '2D Animation',
            budget: '$1,000 - $3,000',
            message: '',
            honeypot: '',
          });
        }, 2000);
      } else {
        setErrorMessage(result.message || 'Failed to submit inquiry.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-overlay bg-black/80 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-xl bg-[#12151b] text-stone-100 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#181c24] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 id="contact-modal-title" className="font-serif text-xl font-bold text-white">
              Start a Project / Inquiry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close contact form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {successMessage ? (
          <div className="p-10 text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-white">Inquiry Delivered!</h3>
            <p className="text-sm text-stone-300 max-w-sm mx-auto leading-relaxed">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2 font-medium" role="alert">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Anti-spam Honeypot (Hidden from human users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp-field">Leave this field blank</label>
              <input
                id="hp-field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="alex@studio.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Service Needed
                </label>
                <select
                  id="contact-service"
                  disabled={isSubmitting}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="2D Animation">2D Animation</option>
                  <option value="3D Animation">3D Animation</option>
                  <option value="3D Model">3D Asset Modeling</option>
                  <option value="Video Editing">Video Editing & Grading</option>
                  <option value="Photography">Photography Shoot</option>
                  <option value="Artworks">Illustration & Cover Art</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-budget" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Estimated Budget
                </label>
                <select
                  id="contact-budget"
                  disabled={isSubmitting}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="<$1,000">Under $1,000</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                  <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Project Details *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Tell me about your vision, timeline, and deliverables..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-stone-950 hover:bg-stone-200 disabled:opacity-50 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-colors"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
