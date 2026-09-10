import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const Hero: React.FC = () => {
  const { creator } = SITE_CONFIG;

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 z-10">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{creator.title}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.08]">
              Ideas <br />
              <span className="italic font-normal">into</span> Visual <br />
              Stories<span className="text-amber-600">.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-md">
              I create illustrations, animations and visual concepts that bring imagination to life through color, light, and narrative depth.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-stone-700 hover:text-stone-950 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
              >
                <span>Read Story</span>
              </a>
            </div>
          </div>

          {/* Right Image Banner Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 group">
              {/* Hero Image */}
              <img
                src={creator.heroBanner}
                alt={`${creator.name} — ${creator.title}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-black/20 pointer-events-none"></div>

              {/* Handwritten Quote Overlay Top Right */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right pointer-events-none drop-shadow-md">
                <p className="font-handwriting text-3xl sm:text-4xl text-white tracking-wide font-bold leading-tight rotate-[-4deg]">
                  {creator.handwrittenQuotes.heroOverlay.split(' ')[0]} {creator.handwrittenQuotes.heroOverlay.split(' ')[1]}
                </p>
                <p className="font-handwriting text-3xl sm:text-4xl text-white tracking-wide font-bold leading-tight mt-1 rotate-[-2deg]">
                  {creator.handwrittenQuotes.heroOverlay.split(' ').slice(2).join(' ')}
                </p>
                <div className="w-20 h-0.5 bg-white/80 ml-auto mt-2 rounded-full"></div>
              </div>

              {/* Bottom Subtle Badge */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-stone-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Selected Short Film & Art Series</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
