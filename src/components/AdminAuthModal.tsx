import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  // Hooks defined FIRST at top level (React Rules of Hooks compliant)
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const containerRef = useFocusTrap<HTMLDivElement>({ isOpen, onClose });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login({ passcode: pin });
      if (result.success) {
        setPin('');
        onClose();
      } else {
        setError(result.error || 'Authentication failed. Invalid passcode.');
      }
    } catch {
      setError('An unexpected authentication error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-md bg-[#12151b] text-stone-100 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 p-6 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h3 id="auth-modal-title" className="font-serif text-2xl font-bold text-white">
            Creator Portal Access
          </h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto">
            Content management features require creator authentication.
          </p>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passcode-input" className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5 text-center">
              Creator Passcode
            </label>
            <div className="relative">
              <input
                id="passcode-input"
                type="password"
                required
                autoFocus
                disabled={isSubmitting}
                placeholder="Enter Passcode"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                className={`w-full px-4 py-3 bg-stone-900 border ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-stone-700 focus:ring-amber-400'
                } rounded-xl text-center text-lg tracking-widest text-white focus:outline-none focus:ring-2 transition-all`}
              />
              <Key className="w-4 h-4 text-stone-500 absolute right-4 top-4" />
            </div>

            {error && (
              <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1 font-medium" role="alert">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSubmitting || !pin.trim()}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Creator Mode</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
