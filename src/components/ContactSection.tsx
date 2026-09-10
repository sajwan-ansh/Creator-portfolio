import React from 'react';
import { ArrowRight, Instagram, Youtube, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContact }) => {
  const { creator } = SITE_CONFIG;

  return (
    <footer id="contact" className="relative bg-[#0b0d12] text-stone-100 pt-20 sm:pt-28 pb-10 px-6 sm:px-10 overflow-hidden border-t border-stone-800">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-20 border-b border-stone-800/80">
          
          {/* Left Side: Headline & Button */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Let's <br />
              Create Something <br />
              Meaningful<span className="text-amber-500">.</span>
            </h2>

            <p className="text-base sm:text-lg text-stone-400 max-w-md font-normal">
              Have a project in mind? I'd love to hear from you.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-stone-200 text-stone-950 text-sm font-semibold rounded-full shadow-2xl transition-all duration-300 group hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side: Social Links & Handwritten Overlay */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-8">
            
            {/* Handwritten Quote Accent */}
            <div className="text-left lg:text-right">
              <p className="font-handwriting text-3xl sm:text-4xl text-stone-300 tracking-wide font-bold rotate-[-3deg]">
                {creator.handwrittenQuotes.footerAccent.split(' ')[0]} {creator.handwrittenQuotes.footerAccent.split(' ')[1]} <br />
                {creator.handwrittenQuotes.footerAccent.split(' ').slice(2).join(' ')}
              </p>
              <div className="w-16 h-0.5 bg-stone-600 ml-auto mt-2 rounded-full hidden lg:block"></div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={creator.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={creator.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                <Youtube className="w-5 h-5" />
              </a>

              {/* ArtStation Triangle Icon */}
              <a
                href={creator.socials.artstation}
                target="_blank"
                rel="noreferrer"
                aria-label="ArtStation"
                className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 font-bold text-xs focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                ▲
              </a>

              {/* Behance Bē Icon */}
              <a
                href={creator.socials.behance}
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
                className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 font-serif font-bold text-sm focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                Bē
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {creator.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline-block ml-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
};
