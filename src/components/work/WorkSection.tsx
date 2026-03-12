'use client'
import React, { useState, useRef } from 'react';
import Header from '../nav/Header'; // Update path if needed
import CustomScroll from '../cursor/Scroll'; // Update path if needed
import Link from 'next/link';

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(2); 
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'footage' | 'poster'>('footage');

  // --- Added: Drag to Scroll State ---
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const films = [
    {
      id: 1,
      title: "KAFKA'S LAST TRIAL",
      category: "DOCUMENTARY",
      year: "2024",
      location: "TEL AVIV",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "MY PROJECT X",
      category: "DOCUMENTARY",
      year: "2024",
      location: "TEL AVIV",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "ANA MAXIM",
      category: "SHORT FILM",
      year: "2024",
      location: "TEL AVIV",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "OUTSIDER FREUD",
      category: "DOCUMENTARY",
      year: "2024",
      location: "TEL AVIV",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      title: "SAVOY",
      category: "FEATURE FILM",
      year: "2024",
      location: "TEL AVIV",
      img: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=500&q=80",
    }
  ];

  const seamlessFilms = [...films, ...films, ...films, ...films];

  // --- Added: Drag Event Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="relative h-screen bg-[#080808] text-white font-sans overflow-hidden selection:bg-yellow-600/30">
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <CustomScroll/>

      {/* Global CSS for Marquee Animations & Scrollbar Hiding */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          animation: marquee-left 180s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          display: flex;
          animation: marquee-right 180s linear infinite;
          width: max-content;
        }
        /* Hover Pause rule completely removed from here! */

        /* Hide scrollbar for the horizontal footage container */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header Container */}
      <div className="p-6 md:p-12 absolute inset-0 pointer-events-none z-50">
        <Header
          films={films}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          scrollContainerRef={scrollContainerRef}
        />
      </div>

      {/* --- TOP CENTER: FOOTAGE MODE TOGGLE --- */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-40 pointer-events-auto">
        <div 
          className="bg-[#1f1f1f] p-1 flex items-center mb-1"
          style={{ clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)' }}
        >
          {/* Footage Button */}
          <button
            onClick={() => setViewMode('footage')}
            className={`w-[60px] h-[50px] flex items-center justify-center rounded-md transition-colors duration-300 ${
              viewMode === 'footage' ? 'bg-[#050505]' : 'bg-transparent hover:bg-white/5'
            }`}
          >
            <div 
              className={`w-8 h-8 transition-all duration-300 ${
                viewMode === 'footage' ? 'bg-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'bg-[#555555]'
              }`}
              style={{
                WebkitMaskImage: `url('/assets/images/footage.svg')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('/assets/images/footage.svg')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </button>

          {/* Poster Button */}
          <button
            onClick={() => setViewMode('poster')}
            className={`w-[60px] h-[50px] flex items-center justify-center rounded-md transition-colors duration-300 ${
              viewMode === 'poster' ? 'bg-[#050505]' : 'bg-transparent hover:bg-white/5'
            }`}
          >
            <div 
              className={`w-8 h-8 transition-all duration-300 ${
                viewMode === 'poster' ? 'bg-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'bg-[#555555]'
              }`}
              style={{
                WebkitMaskImage: `url('/assets/images/poster.svg')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('/assets/images/poster.svg')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </button>
        </div>

        {/* Dynamic Label Area */}
        <div className="relative flex justify-center w-full h-8 mt-0.5">
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#333333] -translate-x-1/2"></div>
          <div className="flex w-full max-w-[150px]">
            <div className={`flex-1 flex flex-col items-end justify-start pr-2.5 transition-opacity duration-300 ${viewMode === 'footage' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-[11px] font-extrabold text-white tracking-[0.15em] leading-tight">FOOTAGE</span>
              <span className="text-[11px] font-extrabold text-[#555555] tracking-[0.15em] leading-tight">MODE</span>
            </div>
            <div className={`flex-1 flex flex-col items-start justify-start pl-2.5 transition-opacity duration-300 ${viewMode === 'poster' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-[11px] font-extrabold text-white tracking-[0.15em] leading-tight">POSTER</span>
              <span className="text-[11px] font-extrabold text-[#555555] tracking-[0.15em] leading-tight">MODE</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CENTER: CAROUSEL / MARQUEE CONTENT --- */}
      <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-10 min-h-screen flex items-center">
        
        {/* FOOTAGE MODE (Horizontal Drag Carousel) */}
        {viewMode === 'footage' && (
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex items-center gap-4 md:gap-6 w-full overflow-x-auto no-scrollbar pointer-events-auto mt-20 px-10 md:px-32 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {films.map((film, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={film.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shrink-0
                    ${isActive ? 'w-[260px] h-[420px] z-20 shadow-[0_0_40px_rgba(0,0,0,0.8)] scale-100 opacity-100' : 'w-[260px] h-[430px] z-10 scale-[0.95] opacity-40 blur-[1px] hover:opacity-60'}
                  `}
                >
                  <img src={film.img} alt={film.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-8 left-0 right-0 px-6 flex flex-col items-center text-center z-20 pointer-events-none">
                    <div className="absolute top-[-400px] bottom-0 left-1/2 w-[1px] bg-white/20 -translate-x-1/2 pointer-events-none z-0" />
                    <p className="text-[10px] tracking-[0.4em] font-bold text-white uppercase font-serif mb-1 z-10 drop-shadow-md">{film.category}</p>
                    <h2 className={`font-sans font-medium uppercase tracking-tighter leading-none mb-6 text-white z-10 drop-shadow-lg ${isActive ? 'text-[28px] md:text-[34px]' : 'text-xl'}`}>{film.title}</h2>
                    <div className="w-[280px] md:w-[200px] flex flex-col text-[10px] md:text-[10px] font-extrabold tracking-[0.25em] uppercase text-white">
                      <div className="flex items-center w-full border-t border-b border-white/90 py-[1px]">
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">DIRECTOR</span>
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">Unknown</span>
                      </div>
                      <div className="flex items-center w-full border-b border-white/90 py-[1px]">
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">YEAR</span>
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">{film.year}</span>
                      </div>
                      <div className="flex items-center w-full border-b border-white/90 py-[1px]">
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">CATEGORY</span>
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">DOCUMENTARY</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* POSTER MODE (Moving Marquee Grid) */}
        {viewMode === 'poster' && (
          <div className="flex flex-col gap-2 md:gap-3 pointer-events-auto w-full py-20 mt-10">
            
            {/* ROW 1: LEFT TO RIGHT */}
            <div className="w-full overflow-hidden relative h-[180px]">
              <div className="animate-marquee-right flex gap-4 md:gap-6">
                {seamlessFilms.map((film, idx) => (
                  <MarqueePosterCard key={`r1-${idx}`} film={film} />
                ))}
              </div>
            </div>

            {/* ROW 2: RIGHT TO LEFT */}
            <div className="w-full overflow-hidden relative h-[180px]">
              <div className="animate-marquee-left flex gap-4 md:gap-6">
                {seamlessFilms.map((film, idx) => (
                  <MarqueePosterCard key={`r2-${idx}`} film={film} />
                ))}
              </div>
            </div>
            
          </div>
        )}

      </div>

     {/* --- BOTTOM: FOOTER --- */}
      <footer className="absolute bottom-8 left-0 right-0 px-8 md:px-12 flex justify-between items-end z-20 pointer-events-auto w-full">
        
        {viewMode === 'poster' ? (
          // POSTER MODE FOOTER (Detailed Grid)
          <div className="flex items-end justify-between w-full">
            
            {/* Left Group: Thumbnail & Data Grid */}
            <div className="flex items-end gap-10 md:gap-24">
              
              {/* 1. Thumbnail & Title */}
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-4">
              <div className="w-12 h-14 rounded overflow-hidden shrink-0 shadow-lg">
                <img 
                  src={films[activeIndex].img} 
                  alt={films[activeIndex].title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold tracking-[0.3em] text-[#777] uppercase mb-0.5">category</span>
                <span className="text-[16px] font-bold tracking-tight max-w-[70%] uppercase text-white leading-none">documentary changes</span>
              </div>
            </div>
              </div>

              {/* 2. Middle Data Grid (4 lines) */}
              <div className="w-[200px] md:w-[230px] flex flex-col text-[8px] md:text-[9px] font-extrabold tracking-[0.25em] uppercase text-white pb-2">
                <div className="flex items-center w-full border-t border-b border-white/80 ">
                  <span className="flex-1 text-center leading-none mt-[2px]">YEAR</span>
                  <span className="flex-1 text-center leading-none mt-[2px]">{films[activeIndex].year}</span>
                </div>
                <div className="flex items-center w-full border-b border-white/80 py-[2px]">
                  <span className="flex-1 text-center leading-none mt-[2px]">LOCATION</span>
                  <span className="flex-1 text-center leading-none mt-[2px]">{films[activeIndex].location}</span>
                </div>
                <div className="flex items-center w-full border-b border-white/80 py-[2px]">
                  <span className="flex-1 text-center leading-none mt-[2px]">CATEGORY</span>
                  <span className="flex-1 text-center leading-none mt-[2px]">{films[activeIndex].category}</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          // FOOTAGE MODE FOOTER (Empty left space)
          <div className="flex-1"></div>
        )}

        {/* 3. Absolute Centered Timeline / Ruler Indicator (Visible in both modes) */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex items-center justify-center gap-2 pb-2 opacity-60">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((mark) => (
            <div key={mark} className="flex flex-col items-center justify-end h-4">
              {mark === 8 ? (
                <div className="w-8 h-[14px] rounded-[4px] border-[1.5px] border-white"></div>
              ) : (
                <div className={`w-[1px] bg-white ${mark % 4 === 0 ? 'h-4' : 'h-2'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* 4. Absolute Right Explore Button */}
        <div className="absolute right-8 md:right-12 bottom-8">
          <Link href="/" className="group relative flex items-stretch text-white hover:text-black transition-colors duration-300 cursor-pointer min-h-[46px]">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white transition-colors duration-300 pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)', maskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)', WebkitMaskComposite: 'destination-in', maskComposite: 'intersect' }} />
            <div className="absolute top-0 left-[6px] right-[62px] border-t border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-[6px] right-[62px] border-b border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute top-0 right-[6px] w-[44px] border-t border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 right-[6px] w-[44px] border-b border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute left-0 top-[6px] bottom-[6px] border-l border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute right-0 top-[6px] bottom-[6px] border-r border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute top-0 left-0 w-[6px] h-[6px] border-b border-r border-white/40 rounded-br-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[6px] h-[6px] border-b border-l border-white/40 rounded-bl-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[6px] h-[6px] border-t border-r border-white/40 rounded-tr-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-t border-l border-white/40 rounded-tl-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute top-0 right-[50px] w-[12px] h-[6px] border-b border-l border-r border-white/40 rounded-b-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 right-[50px] w-[12px] h-[6px] border-t border-l border-r border-white/40 rounded-t-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="absolute top-[6px] bottom-[6px] right-[56px] border-l border-dashed border-white group-hover:border-white transition-colors duration-300 pointer-events-none" />
            <div className="flex items-center justify-center px-10 md:px-8 py-3 md:py-4 tracking-[0.3em] text-[10px] md:text-xs font-semibold uppercase">Explore</div>
            <div className="w-[56px] flex items-center justify-center">
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

      </footer>

    </div>
  );
}

// ── MARQUEE POSTER CARD COMPONENT (With requested Editorial layout) ──────────
const MarqueePosterCard = ({ film }: { film: any }) => (
  <div className="relative w-[180px] h-[180px] md:w-[180px] md:h-[180px] shrink-0 rounded-[10px] overflow-hidden group cursor-pointer">
    {/* Image */}
    <img src={film.img} alt={film.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none" />
    
    {/* Full card dark overlay for text readability */}
    <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-300 group-hover:opacity-70 pointer-events-none" />
  </div>
);