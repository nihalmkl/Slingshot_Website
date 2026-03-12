'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Corners = () => (
  <>
    <span className="absolute -top-[4px] -left-[4px] w-3 h-3 border-t-4 border-l-4 border-white -translate-x-1 -translate-y-1 pointer-events-none" />
    <span className="absolute -top-[4px] -right-[4px] w-3 h-3 border-t-4 border-r-4 border-white translate-x-1 -translate-y-1 pointer-events-none" />
    <span className="absolute -bottom-[4px] -left-[4px] w-3 h-3 border-b-4 border-l-4 border-white -translate-x-1 translate-y-1 pointer-events-none" />
    <span className="absolute -bottom-[4px] -right-[4px] w-3 h-3 border-b-4 border-r-4 border-white translate-x-1 translate-y-1 pointer-events-none" />
  </>
);

export default function Header({ films, activeIndex, setActiveIndex, scrollContainerRef }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilmMenuOpen, setIsFilmMenuOpen] = useState(false);
  // 1. Create a ref to store the audio object
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 2. Preload the audio on mount
  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/scroll.mp4');
    audioRef.current.load(); // Forces the browser to start downloading immediately
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      // Reset sound to start if it's already playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
  };

  const handleMenuToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (nextState) playSound();
  };

  const handleFilmMenuToggle = () => {
    const nextState = !isFilmMenuOpen;
    setIsFilmMenuOpen(nextState);
    if (nextState) playSound();
  };

  return (
    <header className="flex justify-between items-start mb-8 relative z-50 pointer-events-none">
      <div className="flex flex-col fixed top-8 z-50 pointer-events-auto">
        <Link href="/" aria-label="Slingshot Home" className="block w-32 md:w-40 hover:opacity-80 transition-opacity">
          <Image src="/assets/images/sslogo-1.png" alt="Siena Film Foundation Logo" width={160} height={90} className="w-full h-auto object-contain " priority />
        </Link>
      </div>

      <div className="absolute top-0 right-0 md:-top-4 md:-right-4 z-50 flex drop-shadow-2xl pointer-events-auto">
        
        {/* ADDED CAMERA CORNERS HERE */}
        <Corners />

        {/* Main Ticket Body (Film Selector) - HIDDEN ON MOBILE (added hidden md:block) */}
        <div className="relative hidden md:block">
          <div className="bg-[#fcfaf5] text-black flex flex-col w-[250px] md:w-[280px] h-full">
            <div className="flex items-center justify-between px-4 py-3 flex-1 cursor-pointer" onClick={handleFilmMenuToggle}>
              <div className="flex items-center gap-3">
                <img src={films[activeIndex].img} alt="Current Film" className="object-cover w-10 h-10 rounded-md" />
                <h2 className="text-[18px] md:text-[16px] leading-none font-semibold tracking-tight uppercase mt-1">
                  {films[activeIndex].title}
                </h2>
              </div>
              <button aria-label="Dropdown" className="mr-1 transform transition-transform">
                <svg className={`w-5 h-5 text-black ${isFilmMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="flex border-t border-black text-[8px] md:text-[9px] tracking-[0.15em] font-bold text-gray-800">
              <span className="flex-[1.2] text-center border-r border-black py-1">DOCUMENTARY</span>
              <span className="flex-[0.8] text-center border-r border-black py-1">{films[activeIndex].year}</span>
              <span className="flex-1 text-center py-1">MIN 88</span>
            </div>
          </div>

          {/* FILM DROPDOWN MENU */}
          {isFilmMenuOpen && (
            <>
              <div className="absolute top-full left-0 mt-[-2px] bg-[#fcfaf5] text-black flex flex-col w-[250px] md:w-[280px] drop-shadow-2xl z-40">
                <div className="w-full border-t border-dashed border-gray-400"></div>

                <div className="flex flex-col py-2">
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
                        className="flex items-center justify-between px-6 py-1 hover:bg-gray-100 transition-colors w-full text-left"
                      >
                        <div className="flex items-center gap-4">
                          <img src={film.img} alt={film.title} className="object-cover w-6 h-6 rounded" />
                          <span className="text-[13px] font-bold tracking-wide uppercase mt-1 text-black">{film.title}</span>
                        </div>
                        {index === activeIndex && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </button>
                      {index < films.length - 1 && (
                        <div className="mx-6 border-b border-dashed border-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="h-4"></div>
              </div>
            </>
          )}
        </div>

        {/* Ticket Stub (Hamburger / Close Button) */}
        {/* ADDED relative z-10 HERE TO BRING THE DASHED LINE TO THE FRONT */}
        <div 
          onClick={handleMenuToggle}
          className="relative z-10 bg-[#fcfaf5] text-black w-[64px] h-[64px] md:h-auto md:w-24 border-l-0 md:border-l border-dashed border-black flex items-center justify-center cursor-pointer hover:bg-[#f0eee9] transition-colors -ml-[1px]"
        >
          <button aria-label="Menu" className="flex flex-col gap-[3px] items-center justify-center">
            {isMenuOpen ? (
              <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <>
                <span className="block w-8 md:w-10 h-[3px] bg-black"></span>
                <span className="block w-8 md:w-10 h-[3px] bg-black"></span>
                <span className="block w-8 md:w-10 h-[3px] bg-black"></span>
              </>
            )}
          </button>
        </div>

        {/* MAIN NAV DROPDOWN MENU OVERLAY */}
        {isMenuOpen && (
          <>
            <div className="absolute top-full right-0 mt-[-2px] bg-[#fcfaf5] text-black flex flex-col w-[280px] md:w-[376px] drop-shadow-2xl z-40">
              <div className="w-full border-t border-dashed border-gray-400"></div>

              <div className="px-8 py-8 flex flex-col gap-3">
                <Link href="/work" className="flex items-baseline gap-4 group">
                  <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">01</span>
                  <span className="text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">WORK</span>
                </Link>
                <Link href="/about" className="flex items-baseline gap-4 group">
                  <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">02</span>
                  <span className="text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">ABOUT</span>
                </Link>
                <Link href="/contact" className="flex items-baseline gap-4 group">
                  <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">03</span>
                  <span className="text-[32px] md:text-[40px] font-bold tracking-tight leading-none group-hover:text-black/70">CONTACT</span>
                </Link>
              </div>

              <div className="border-t border-dashed border-gray-400 px-8 py-3 flex gap-8 text-[11px] font-bold text-gray-500 tracking-[0.15em]">
                <Link href="#" className="hover:text-black transition-colors">COOKIE</Link>
                <Link href="#" className="hover:text-black transition-colors">TERMS</Link>
                <Link href="#" className="hover:text-black transition-colors">PRIVACY</Link>
              </div>

              <div className="border-t border-dashed border-gray-400 px-8 py-3 flex gap-5 text-black">
                <Link href="#" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Link>
                <Link href="#" aria-label="Facebook" className="hover:opacity-60 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
                <Link href="#" aria-label="LinkedIn" className="hover:opacity-60 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
              </div>

              <div className="border-t border-dashed border-gray-400 px-8 py-2">
                <p className="text-[10px] text-gray-500 font-semibold tracking-[0.1em]">
                  ©2024. SIENA FILM FOUNDATION.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}