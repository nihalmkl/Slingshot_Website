'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Updated Corners component to hide bottom corners when menu is open
const Corners = ({ hideBottom = false }: { hideBottom?: boolean }) => (
  <>
    <span className="absolute -top-[4px] -left-[4px] w-3 h-3 border-t-4 border-l-4 border-white -translate-x-1 -translate-y-1 pointer-events-none" />
    <span className="absolute -top-[4px] -right-[4px] w-3 h-3 border-t-4 border-r-4 border-white translate-x-1 -translate-y-1 pointer-events-none" />
    <span className={`absolute -bottom-[4px] -left-[4px] w-3 h-3 border-b-4 border-l-4 border-white -translate-x-1 translate-y-1 pointer-events-none transition-opacity duration-300 ${hideBottom ? 'opacity-0' : 'opacity-100'}`} />
    <span className={`absolute -bottom-[4px] -right-[4px] w-3 h-3 border-b-4 border-r-4 border-white translate-x-1 translate-y-1 pointer-events-none transition-opacity duration-300 ${hideBottom ? 'opacity-0' : 'opacity-100'}`} />
  </>
);

// New component specifically for the bottom of the dropdowns
const BottomCorners = () => (
  <>
    <span className="absolute -bottom-[4px] -left-[4px] w-3 h-3 border-b-4 border-l-4 border-white -translate-x-1 translate-y-1 pointer-events-none" />
    <span className="absolute -bottom-[4px] -right-[4px] w-3 h-3 border-b-4 border-r-4 border-white translate-x-1 translate-y-1 pointer-events-none" />
  </>
);

export default function Header({ films, activeIndex, setActiveIndex, scrollContainerRef }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilmMenuOpen, setIsFilmMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/scroll.mp4');
    audioRef.current.load();
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
  };

  const handleMenuToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    // Ensure the other menu closes when opening this one
    if (nextState) setIsFilmMenuOpen(false);
    if (nextState) playSound();
  };

  const handleFilmMenuToggle = () => {
    const nextState = !isFilmMenuOpen;
    setIsFilmMenuOpen(nextState);
    // Ensure the other menu closes when opening this one
    if (nextState) setIsMenuOpen(false);
    if (nextState) playSound();
  };

  return (
    <header className="flex justify-between items-start mb-8 relative z-50 pointer-events-none">
      
      {/* LOGO */}
      <div className="flex flex-col fixed top-8 z-50 pointer-events-auto">
        <Link href="/" aria-label="Slingshot Home" className="block w-12 md:w-40 hover:opacity-80 transition-opacity">
          <Image 
            src="/assets/images/sslogo-1.png" 
            alt="Siena Film Foundation Logo" 
            width={160} 
            height={90} 
            className="hidden md:block w-full h-auto object-contain" 
            priority 
          />
          <Image 
            src="/assets/images/favicon.png" 
            alt="Siena Film Foundation Icon" 
            width={48} 
            height={48} 
            className="block md:hidden w-full h-auto object-contain " 
            priority 
          />
        </Link>
      </div>

      <div className="absolute top-0 right-0 md:-top-4 md:-right-4 z-50 flex drop-shadow-2xl pointer-events-auto">
        
        {/* Hide bottom corners if either menu is open */}
        <Corners hideBottom={isMenuOpen || isFilmMenuOpen} />

        {/* 1. FILM SELECTOR - Always visible, scaled for mobile (w-[210px] on mobile, w-[280px] on md) */}
        <div className="relative flex">
          <div className="bg-[#fcfaf5] text-black flex flex-col w-[210px] sm:w-[250px] md:w-[280px] h-full relative z-20">
            <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 flex-1 cursor-pointer" onClick={handleFilmMenuToggle}>
              <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                <img src={films[activeIndex]?.img} alt="Current Film" className="object-cover w-7 h-7 md:w-10 md:h-10 rounded-md shrink-0" />
                <h2 className="text-[13px] sm:text-[15px] md:text-[16px] leading-none font-semibold tracking-tight uppercase mt-1 truncate">
                  {films[activeIndex]?.title}
                </h2>
              </div>
              <button aria-label="Dropdown" className="ml-1 md:mr-1 transform transition-transform duration-300 shrink-0">
                <svg className={`w-4 h-4 md:w-5 md:h-5 text-black transition-transform duration-300 ${isFilmMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="flex border-t border-black text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] font-bold text-gray-800">
              <span className="flex-[1.2] text-center border-r border-black py-1 md:py-1">DOCUMENTARY</span>
              <span className="flex-[0.8] text-center border-r border-black py-1 md:py-1">{films[activeIndex]?.year}</span>
              <span className="flex-1 text-center py-1 md:py-1">MIN 88</span>
            </div>
          </div>

          {/* FILM DROPDOWN MENU (Scaled matching width) */}
          <div className={`absolute top-full left-0 mt-[-2px] bg-[#fcfaf5] text-black flex flex-col w-[210px] sm:w-[250px] md:w-[280px] drop-shadow-2xl z-10 transition-all duration-500 ease-in-out origin-top ${isFilmMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
            <div className="w-full border-t border-dashed border-gray-400"></div>

            <div className="flex flex-col py-1 md:py-2">
              {films.map((film: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <button 
                    onClick={() => {
                      setActiveIndex(index);
                      setIsFilmMenuOpen(false);
                      if(scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({ top: (14 + index) * 582, behavior: 'smooth' });
                      }
                    }}
                    className="group relative flex items-center justify-between px-4 md:px-6 py-1 md:py-1.5 hover:bg-[#e6e3dd] transition-colors w-full text-left"
                  >
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <img src={film.img} alt={film.title} className="object-cover w-5 h-5 md:w-6 md:h-6 rounded shrink-0" />
                      <span className="text-[11px] md:text-[13px] font-bold tracking-wide uppercase mt-1 text-black truncate">{film.title}</span>
                    </div>
                    
                    <div className={`w-1.5 h-1.5 bg-black rounded-full shrink-0 transition-opacity duration-200 ${index === activeIndex ? 'opacity-100 group-hover:opacity-0' : 'opacity-0'}`}></div>

                    <div className="absolute right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-5 h-5 md:w-7 md:h-7 bg-black text-white rounded flex items-center justify-center pointer-events-none">
                      <svg className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  {index < films.length - 1 && (
                    <div className="mx-4 md:mx-6 border-b border-dashed border-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="h-2 md:h-4"></div>
            
            {/* Add bottom corners to the dropdown */}
            <BottomCorners />
          </div>
        </div>

        {/* 2. TICKET STUB (HAMBURGER BUTTON) - Always visible, scales perfectly */}
        <div 
          onClick={handleMenuToggle}
          className="relative z-30 bg-[#fcfaf5] text-black w-[56px] sm:w-[64px] md:h-auto md:w-24 border-l border-dashed border-black flex items-center justify-center cursor-pointer hover:bg-[#f0eee9] transition-colors -ml-[1px]"
        >
          <button aria-label="Menu" className="flex flex-col gap-[3px] items-center justify-center">
            {isMenuOpen ? (
              <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <>
                <span className="block w-6 sm:w-8 md:w-10 h-[2px] md:h-[3px] bg-black"></span>
                <span className="block w-6 sm:w-8 md:w-10 h-[2px] md:h-[3px] bg-black"></span>
                <span className="block w-6 sm:w-8 md:w-10 h-[2px] md:h-[3px] bg-black"></span>
              </>
            )}
          </button>
        </div>

        {/* MAIN NAV DROPDOWN MENU (Scaled matching width) */}
        <div className={`absolute top-full right-0 mt-[-2px] bg-[#fcfaf5] text-black flex flex-col w-[266px] sm:w-[314px] md:w-[376px] drop-shadow-2xl z-20 transition-all duration-600 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="w-full border-t border-dashed border-gray-400"></div>

          <div className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-3">
            <Link href="/work" onClick={() => setIsMenuOpen(false)} className="flex items-baseline gap-3 md:gap-4 group">
              <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-black transition-colors">01</span>
              <span className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">WORK</span>
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="flex items-baseline gap-3 md:gap-4 group">
              <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-black transition-colors">02</span>
              <span className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">ABOUT</span>
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-baseline gap-3 md:gap-4 group">
              <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-black transition-colors">03</span>
              <span className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">CONTACT</span>
            </Link>
          </div>

          <div className="border-t border-dashed border-gray-400 px-6 md:px-8 py-2 md:py-3 flex gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold text-gray-500 tracking-[0.1em] md:tracking-[0.15em]">
            <Link href="#" className="hover:text-black transition-colors">COOKIE</Link>
            <Link href="#" className="hover:text-black transition-colors">TERMS</Link>
            <Link href="#" className="hover:text-black transition-colors">PRIVACY</Link>
          </div>

          <div className="border-t border-dashed border-gray-400 px-6 md:px-8 py-2 md:py-3 flex gap-4 md:gap-5 text-black">
            <Link href="#" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5 md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5 md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5 md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Link>
          </div>

          <div className="border-t border-dashed border-gray-400 px-6 md:px-8 py-2">
            <p className="text-[8px] md:text-[10px] text-gray-500 font-semibold tracking-[0.1em]">
              ©2024. SIENA FILM FOUNDATION.
            </p>
          </div>
          
          {/* Add bottom corners to the dropdown */}
          <BottomCorners />
        </div>
      </div>
    </header>
  );
}
