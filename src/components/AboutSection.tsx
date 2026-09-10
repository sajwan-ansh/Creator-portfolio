import React from 'react';
import { INITIAL_SKILLS } from '../data/initialPortfolioData';
import { SITE_CONFIG } from '../config/siteConfig';
import { ImageWithFallback } from './common/ImageWithFallback';
import { Paintbrush, Video, Box, Film, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { creator } = SITE_CONFIG;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-stone-900" />;
      case 'Video':
        return <Video className="w-6 h-6 text-stone-900" />;
      case 'Box':
        return <Box className="w-6 h-6 text-stone-900" />;
      case 'Film':
        return <Film className="w-6 h-6 text-stone-900" />;
      default:
        return <Sparkles className="w-6 h-6 text-stone-900" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: About Me */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              About Me
            </h2>
            <div className="w-20 h-[1.5px] bg-stone-300 rounded-full"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 bg-[#efece6] p-6 sm:p-8 rounded-3xl border border-stone-300/60 shadow-sm">
            
            {/* Anime Creator Portrait */}
            <div className="relative flex-shrink-0 mx-auto sm:mx-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <ImageWithFallback
                src={creator.avatar}
                alt={`${creator.name} Portrait`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute -bottom-2 -right-2 bg-stone-900 text-white p-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            {/* Bio & Handwritten Note */}
            <div className="space-y-4 flex-1">
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                {creator.shortBio}
              </p>

              {/* Handwritten Quote */}
              <div className="pt-2 border-t border-stone-300/50">
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-900 tracking-wide rotate-[-3deg] leading-tight">
                  {creator.handwrittenQuotes.aboutNote.split(' ')[0]} {creator.handwrittenQuotes.aboutNote.split(' ')[1]} <br />
                  <span className="text-amber-700">{creator.handwrittenQuotes.aboutNote.split(' ').slice(2).join(' ')}</span>
                </p>
              </div>
            </div>

          </div>

          {/* Core Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {creator.stats.map((stat, idx) => (
              <div key={idx} className="p-4 bg-[#efece6]/60 rounded-2xl border border-stone-300/50 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900">{stat.label}</h3>
                  <p className="text-[11px] text-stone-500">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Skills Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Skills
            </h2>
            <div className="w-20 h-[1.5px] bg-stone-300 rounded-full"></div>
          </div>

          {/* 4 Cards Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INITIAL_SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="bg-[#efece6] p-6 rounded-2xl border border-stone-300/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-stone-200/80 group-hover:scale-110 transition-transform">
                  {getIcon(skill.iconName)}
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Software tags */}
                <div className="mt-auto flex flex-wrap justify-center gap-1.5">
                  {skill.tools.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-white text-stone-700 rounded-md border border-stone-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
