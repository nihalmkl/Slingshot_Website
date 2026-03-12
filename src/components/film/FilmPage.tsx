'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Imported Next.js Image component
import Header from '@/components/nav/Header'; 
import Link from 'next/link';

interface CrewMember {
  role: string;
  name: string;
}


const festivals = [
    {
      logoText: "SIFF", // Placeholder for actual logo image
      subtitle: "INTERNATIONAL COMPETITION",
      title: "SEATTLE FILM FESTIVAL",
    },
    {
      logoText: "SERET",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "SERET FILM FESTIVAL",
    },
    {
      logoText: "CHICAGO",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "CHICAGO FILM FESTIVAL",
    },
    {
      logoText: "JIFF",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "JIFF",
    },
    {
      logoText: "SERET",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "SERET FILM FESTIVAL",
    },
    {
      logoText: "CHICAGO",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "CHICAGO FILM FESTIVAL",
    },
    {
      logoText: "JIFF",
      subtitle: "INTERNATIONAL COMPETITION",
      title: "JIFF",
    },
  ];

const galleryStills = [
    '/assets/images/film.jpg', '/assets/images/film.jpg', 
    '/assets/images/film.jpg', '/assets/images/film.jpg',
    '/assets/images/film.jpg', '/assets/images/film.jpg',
    '/assets/images/film.jpg', '/assets/images/film.jpg',
    '/assets/images/film.jpg', '/assets/images/film.jpg',
    '/assets/images/film.jpg', '/assets/images/film.jpg',
    '/assets/images/film.jpg', '/assets/images/film.jpg',
  ];
/* ─── Data ───────────────────────────────────────────────────────────────── */
const filmData = {
  director: { role: 'DIRECTOR', name: 'DORIT HAKIM KRAMER' },
  dop:      { role: 'DOP',      name: 'AMIT YASOUR' },
  editor:   { role: 'EDITOR',   name: 'TALI HALTER SHENKAR' },
  producers: [
    { role: 'PRODUCER',           name: 'DAVID MANDIL' },
    { role: 'EXECUTIVE PRODUCER', name: 'MICHAL GRAIDY' },
    { role: 'EXECUTIVE PRODUCER', name: 'LEE SHIRA' },
  ],
  mainCrew: [
    { role: 'LEAD ACTOR',   name: 'GAL TOREN' },
    { role: 'LEAD ACTOR',   name: 'GEFEN BARKAI' },
    { role: 'LEAD ACTRESS', name: 'YAARA PELZIG' },
    { role: 'LEAD ACTRESS', name: 'YUVAL SCHRF' },
  ],
};

const FilmPage: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // You can pass these as props later. 
  // Try changing this to "TABOO" to see the one-line layout in action!
  const filmTitle = "Moon In The 12th House"; 
  const filmCategory = "Feature Film"; 

  const headerFilms = [
    { img: '/assets/images/firstman.jpg', title: '004', year: '2024' },
    { img: '/assets/images/firstman.jpg', title: '005', year: '2023' }
  ];

  const gallerySectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gallerySectionRef.current || !row1Ref.current || !row2Ref.current) return;

      const rect = gallerySectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the gallery section is currently visible in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate a progress ratio (0 when it enters from bottom, 1 when it leaves top)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

        // Adjust '600' to make the horizontal scroll faster or slower
        const moveAmount = progress * 600; 

        // Row 1 moves LEFT as you scroll down
        row1Ref.current.style.transform = `translateX(-${moveAmount}px)`;
        
        // Row 2 moves RIGHT as you scroll down
        // We start it with a -10vw offset so it doesn't have an empty gap on the left
        row2Ref.current.style.transform = `translateX(calc(-10vw + ${moveAmount}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount to set initial positions

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cells = wrapperRef.current?.querySelectorAll<HTMLDivElement>('.gallery-cell');
    if (!cells) return;
    cells.forEach((cell, i) => {
      cell.style.opacity = '0';
      cell.style.transform = 'scale(0.88)';
      setTimeout(() => {
        cell.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
      }, 100 + i * 40);
    });
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#FAF7EF] font-sans flex flex-col selection:bg-black/20">
      
      {/* ─── HERO IMAGE SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[64vh] overflow-hidden bg-black flex flex-col">
        <Image 
          src="/assets/images/film.jpg" 
          alt={filmTitle}
          fill
          priority
          className="object-cover  opacity-80"
        />

        {/* Header Overlay */}
        <div className="relative z-50 w-full max-w-[1600px] mx-auto px-6 md:px-10 pt-8">
          <Header
            films={headerFilms} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            scrollContainerRef={wrapperRef} 
          />

          <div className="absolute top-[100px] md:top-[160px] left-6 md:left-10 z-50">
          <button className="flex items-center gap-4 text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            ALL WORK
          </button>
        </div>
        </div>
      </section>

      {/* ─── CONTENT DESIGN SECTION ────────────────────────────────────────── */}
      <section className="relative w-full bg-[#FAF7EF] flex flex-col items-center pt-8 pb-32 overflow-hidden">
        
        {/* Small subtitle above title */}
        <h3 className="uppercase tracking-[0.4em] text-xs md:text-sm text-black mb-6 font-serif z-10">
          {filmCategory}
        </h3>

        {/* Title Container - The relative wrapper for the lines and text */}
        <div className="relative w-full flex flex-col items-center justify-center">
          
          {/* The Horizontal Lines */}
          <div className="absolute top-0 w-full h-[1px] bg-black"></div>
          <div className="absolute top-1/2 w-full h-[1px] bg-black -translate-y-[50%]"></div>
          <div className="absolute bottom-1 w-full h-[1px] bg-black"></div>

          <div className="text-[12vw] md:text-[8vw] lg:text-[6rem] font-medium leading-[0.75] text-black tracking-tighter uppercase z-10 text-center m-0 py-0 max-w-[90%] md:max-w-[70%] lg:max-w-[50%] break-words">
            {filmTitle}
          </div>

          {/* Downward Arrow Button - straddling the bottom line */}
          <button className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 translate-y-[50%] z-20 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
          
        </div>
      </section>

      <section className="relative w-full bg-[#FAF7EF] flex flex-col items-center pb-32 px-4 md:px-10">
        
        {/* Large Video/Image Container 
            - Uses large border-radius to match the soft/organic edges in the screenshot
            - group class added for hover animations
        */}
        <div className="relative w-full max-w-[1100px] h-[50vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer group shadow-lg">
          
          {/* Background Image inside the rounded container */}
          <Image 
            src="/assets/images/film.jpg" 
            alt="Watch Trailer Background"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Optional: Subtle dark gradient to ensure the red pops on bright images */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20"></div>

          {/* Play Button & Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            {/* Red Play Triangle */}
            <div className="text-[#FF1E1E] mb-2 transform transition-transform duration-300 group-hover:scale-110">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            
            {/* Red Stacked Text */}
            <div className="text-center text-[#FF1E1E] flex flex-col items-center">
              <p className="text-[10px] md:text-xs tracking-[0.3em] font-bold mb-1">
                ACTION!
              </p>
              <p className="text-3xl md:text-5xl font-medium uppercase leading-[0.85] tracking-tighter">
                WATCH<br />TRAILER
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* LEFT COLUMN: Director Profile (1/3 width) */}
          <div className="relative w-full h-[400px] lg:h-full min-h-[450px] rounded overflow-hidden flex flex-col justify-end p-6 md:p-8 col-span-1">
            <Image 
              src="/assets/images/film.jpg" 
              alt="Director Dorit Hakim Kramer"
              fill
              className="object-cover object-center"
            />
            {/* Dark gradient so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="relative z-10 text-white">
              <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-4 text-white/90">
                Director
              </h4>
              {/* Dynamic width forces natural wrap without <br/> */}
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[0.85] tracking-tighter uppercase w-min">
                DORIT HAKIM KRAMER
              </h2>
            </div>
          </div>

          {/* RIGHT COLUMN: Crew Grids (2/3 width) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 md:gap-6">
            
            {/* Block 1: DOP & Editor (Solid Black) */}
            <div className="bg-black text-white rounded flex flex-col sm:flex-row">
              <div className="flex-1 py-3 px-4 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-dashed border-white/30">
                <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-3 text-white/70">DOP</h4>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[0.85] tracking-tighter uppercase w-min mx-auto">
                  AMIT YASOUR
                </h2>
              </div>
              <div className="flex-1 py-3 px-4 flex flex-col items-center justify-center text-center">
                <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-3 text-white/70">Editor</h4>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[0.85] tracking-tighter uppercase w-min mx-auto">
                  TALI HALTER SHENKAR
                </h2>
              </div>
            </div>

            {/* Block 2: Producers */}
            <div className="flex flex-col rounded overflow-hidden">
              {/* Black Header Bar */}
              <div className="bg-black text-white flex flex-row w-full py-2.5">
                <div className="flex-1 text-center font-serif text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Producer</div>
                <div className="flex-1 text-center font-serif text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Executive Producer</div>
                <div className="flex-1 text-center font-serif text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Executive Producer</div>
              </div>
              
              {/* Content Grid */}
              <div className="flex flex-row bg-transparent border-b border-l border-r border-dashed border-black/30">
                <div className="flex-1 py-5 px-2 flex items-center justify-center text-center border-r border-dashed border-black/30">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                    DAVID MANDIL
                  </h2>
                </div>
                <div className="flex-1 py-5 px-2 flex items-center justify-center text-center border-r border-dashed border-black/30">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                    MICHAL GRAIDY
                  </h2>
                </div>
                <div className="flex-1 py-5 px-2 flex items-center justify-center text-center">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                    LEE SHIRA
                  </h2>
                </div>
              </div>
            </div>

            {/* Block 3: Main Crew (Actors) */}
            <div className="flex flex-col rounded overflow-hidden">
              {/* Black Header Bar */}
              <div className="bg-black text-white w-full py-2.5 text-center font-serif text-[10px] uppercase tracking-[0.3em]">
                Main Crew
              </div>
              
              {/* Content Grid (2 Rows, 2 Columns) */}
              <div className="flex flex-col border-b border-l border-r border-dashed border-black/30 bg-transparent">
                
                {/* Row 1 */}
                <div className="flex flex-row border-b border-dashed border-black/30">
                  <div className="flex-1 py-5 px-4 flex flex-col items-center justify-center text-center border-r border-dashed border-black/30">
                    <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-2 text-black/70">Lead Actor</h4>
                    <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                      GAL TOREN
                    </h2>
                  </div>
                  <div className="flex-1 py-5 px-4 flex flex-col items-center justify-center text-center">
                    <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-2 text-black/70">Lead Actor</h4>
                    <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                      GEFEN BARKAI
                    </h2>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-row">
                  <div className="flex-1 py-5 px-4 flex flex-col items-center justify-center text-center border-r border-dashed border-black/30">
                    <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-2 text-black/70">Lead Actress</h4>
                    <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                      YAARA PELZIG
                    </h2>
                  </div>
                  <div className="flex-1 py-5 px-4 flex flex-col items-center justify-center text-center">
                    <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] mb-2 text-black/70">Lead Actress</h4>
                    <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold leading-[0.85] tracking-tighter uppercase text-black w-min mx-auto">
                      YUVAL SCHRF
                    </h2>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section 
        ref={gallerySectionRef}
        className="w-full bg-black py-40 md:py-50 overflow-hidden flex flex-col gap-4 md:gap-6"
      >

        {/* ─── PERFECTLY CENTERED TICKET BADGE ─── */}
        <div className="w-full flex items-center justify-center mb-8 md:mb-12">
          <div className="relative inline-block bg-[#FAF7EF] text-black px-10 py-3 z-20 shadow-xl rounded-sm">
            {/* Inner dashed border */}
            <div className="absolute inset-1.5 border border-dashed border-black/40 pointer-events-none"></div>
            
            {/* Left/Right punched holes (using background color black to simulate transparency) */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
            
            {/* Text */}
            <span className="relative z-10 font-bold text-[12px] md:text-[14px] tracking-[0.2em] uppercase">
              GALLERY
            </span>
          </div>
        </div>
        
        {/* Top Row - Moves Left */}
        {/* Using w-max to prevent wrapping, and removed manual overflow scrolling */}
        <div 
          ref={row1Ref}
          className="flex gap-4 md:gap-6 w-max px-4 md:px-10 will-change-transform"
        >
          {/* We repeat the array a few times to ensure the strip doesn't run out of images as it moves */}
          {[...galleryStills, ...galleryStills, ...galleryStills].slice(0, 10).map((img, idx) => (
            <div 
              key={`top-${idx}`} 
              // Reduced size: w-[200px] to w-[280px]
              className="relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[310px] aspect-square rounded-[1rem]  overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image 
                src={img} 
                alt={`Film still top ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Bottom Row - Moves Right */}
        <div 
          ref={row2Ref}
          className="flex gap-4 md:gap-6 w-max px-4 md:px-10 will-change-transform"
        >
          {[...galleryStills, ...galleryStills, ...galleryStills].slice(10, 20).map((img, idx) => (
            <div 
              key={`bottom-${idx}`} 
              // Reduced size: w-[200px] to w-[280px]
              className="relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[310px] aspect-square rounded-[1rem]  overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image 
                src={img} 
                alt={`Film still bottom ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </section>

      <section className="relative w-full min-h-screen py-10 md:py-30 overflow-hidden bg-[#FAF7EF] flex items-center justify-center select-none px-4 md:px-10">
        
        {/* 1. CSS ANIMATION DEFINITION */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scrollY {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-scroll-y {
            animation: scrollY 25s linear infinite;
          }
        `}} />

        {/* ─── FOREGROUND CARD (Now holds everything) ─── */}
        <div className="relative z-20 w-full max-w-[1500px] h-[80vh] md:h-[170vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer group shadow-2xl border border-black/10">
          
          {/* Background Image of the Card */}
          <Image 
            src="/assets/images/film.jpg" 
            alt="Watch Trailer Background"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Overlay (Darkened slightly to make text readable) */}
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50"></div>

          {/* ─── SCROLLING MARQUEE (Now nested INSIDE the card) ─── */}
          <div 
            className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-start overflow-hidden pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <div className="flex flex-col animate-scroll-y w-full max-w-[1400px] pt-[20vh]">
              {[1, 2,3].map((loopIndex) => (
                <div key={loopIndex} className="flex flex-col items-center w-full">
                  {festivals.map((fest, idx) => (
                    <div key={`${loopIndex}-${idx}`} className="flex flex-col items-center text-center mb-16 md:mb-24 px-4 w-[25%]">
                      
                      <Image src='/assets/images/film.jpg' alt={fest.title} width={30} height={30} className="mb-4 text-white" />
                      
                      <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/80 mb-3">
                        {fest.subtitle}
                      </p>
                      
                      <div className="max-w-2xl mx-auto w-full">
                        <h2 className="text-3xl md:text-5xl lg:text-[3rem] font-medium uppercase tracking-tighter text-white leading-[0.85]">
                          {fest.title}
                        </h2>
                      </div>
                      
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </section>

    <section className="w-full bg-[#FAF7EF] pt-16 pb-20 flex flex-col items-center px-4 md:px-10">
        
        {/* Top Text Block */}
        <div className="text-center mb-16 md:mb-24 px-4">
          <h2 className="text-2xl md:text-[2rem] font-bold uppercase tracking-tight text-black mb-4">
            Investors & Broadcast
          </h2>
          <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-black/90">
            Israel Fund for Film Production, Movie Plus Productions, United King Films
          </p>
        </div>

        {/* Bottom Cards Wrapper */}
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT CARD: ALL WORK */}
          <div className="lg:col-span-4 border border-dashed border-black/40 rounded-[2rem] p-8 md:p-8 flex flex-col justify-between min-h-[250px] md:min-h-[350px] cursor-pointer group hover:bg-black/5 transition-colors">
            <div>
              <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] text-black/70 mb-3">
                Showcase
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-black w-min">
                ALL WORK
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                Explore
              </span>
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: NEXT PROJECT (TABOO) */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row h-full min-h-[250px] md:min-h-[350px] cursor-pointer group shadow-sm hover:shadow-lg transition-shadow">
            
            {/* Left Black Box (with scalloped left edge) */}
            <div 
              className="w-full sm:w-[40%] bg-black text-white p-8 md:p-10 flex flex-col justify-between"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 0px 14px, transparent 6px, black 6.5px)',
                maskImage: 'radial-gradient(circle at 0px 14px, transparent 6px, black 6.5px)',
                WebkitMaskSize: '100% 28px',
                maskSize: '100% 28px',
                WebkitMaskPosition: '0 0',
                maskPosition: '0 0'
              }}
            >
              <div>
                <h4 className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/70 mb-3">
                  Showcase
                </h4>
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                  TABOO
                </h2>
              </div>

              <div className="flex items-center gap-4 mt-12 sm:mt-0">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Next
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Image Box (with scalloped right edge) */}
            <div 
              className="w-full sm:w-[60%] relative h-[250px] sm:h-auto overflow-hidden"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 100% 14px, transparent 6px, black 6.5px)',
                maskImage: 'radial-gradient(circle at 100% 14px, transparent 6px, black 6.5px)',
                WebkitMaskSize: '100% 28px',
                maskSize: '100% 28px',
                WebkitMaskPosition: '100% 0',
                maskPosition: '100% 0'
              }}
            >
              <Image 
                src="/assets/images/film.jpg" 
                alt="Taboo Showcase"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>
     <footer className="relative w-full bg-[#FAF7EF] text-black pt-10 flex flex-col items-center z-30">
        
        {/* Tiny Center Logo Box */}
        <div className="relative flex flex-col items-center justify-end mb-10 overflow-hidden">
          <div className="relative z-10 w-[75%] md:w-[80%] flex items-end justify-center pb-2 md:pb-3">
            <Image 
              src="/assets/images/sslogo-1.png" 
              alt="Website Logo" 
              width={90} 
              height={50} 
              className="object-contain w-full h-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Massive Footer Typography Over Lines */}
        <div className="relative w-full flex flex-col items-center justify-center mb-25">
            {/* Full-width Horizontal Lines mathematically placed at exact thirds */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#000000]"></div>
            <div className="absolute top-[33.333%] left-0 w-full h-[1.5px] bg-[#1a1a1a] -translate-y-1/2"></div>
            <div className="absolute top-[66.666%] left-0 w-full h-[1px] bg-[#1a1a1a] -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1a1a1a]"></div>

            {/* The Text Content */}
            <div className="flex flex-col items-center justify-center z-10 w-full text-center">
              
              <h2 className="w-full text-[13vw] md:text-[9vw] lg:text-[6rem] font-medium uppercase tracking-tighter leading-[0.4] text-[#1a1a1a] m-0 py-2 md:py-4">
                PRODUCTION
              </h2>
              <h2 className="w-full text-[13vw] md:text-[9vw] lg:text-[6rem] font-medium uppercase tracking-tighter leading-[0.4] text-[#1a1a1a] m-0 py-2 md:py-4">
                DOCUMENTARY
              </h2>
              <h2 className="w-full text-[13vw] md:text-[9vw] lg:text-[6rem] font-medium uppercase tracking-tighter leading-[0.4] text-[#1a1a1a] m-0 py-2 md:py-4">
                FILM TV
              </h2>
            </div>

          </div>

        {/* Footer Bottom Content (3 Columns) */}
        <div className="w-full max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 items-start mb-24">
          
          {/* Column 1: Newsletter */}
          <div className="flex flex-col items-start w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#1a1a1a]">
              Stay Up To Date
            </h4>
            <div className="relative w-full max-w-[280px] border border-dashed border-[#999] rounded-full p-1.5 flex items-center justify-between">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-transparent border-none outline-none text-[10px] md:text-[11px] tracking-[0.15em] pl-4 w-full text-black placeholder-[#777] uppercase"
              />
              <button aria-label="Submit" className="bg-[#1a1a1a] text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col items-start md:items-center w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#1a1a1a]">
              Sitemap
            </h4>
            <nav className="flex flex-col items-start md:items-center gap-0">
              <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#ccc] hover:text-[#1a1a1a] transition-colors leading-[0.85]">HOME</Link>
              <Link href="/work" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#ccc] hover:text-[#1a1a1a] transition-colors leading-[0.85]">WORK</Link>
              <Link href="/about" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#ccc] hover:text-[#1a1a1a] transition-colors leading-[0.85]">ABOUT</Link>
              <Link href="/contact" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#ccc] hover:text-[#1a1a1a] transition-colors leading-[0.85]">CONTACT</Link>
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-start w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#1a1a1a]">
              Contact Us
            </h4>
            <div className="flex items-end border-b border-[#1a1a1a] pb-2 w-full justify-start mt-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#1a1a1a] mr-6 mb-1">
                INQUIRIES
              </span>
              <a href="mailto:LEE@SIENA.FILM" className="text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tighter uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity">
                LEE@SIENA.FILM
              </a>
            </div>
          </div>
        </div>

        {/* ─── VERY BOTTOM BAR ─── */}
        <div className="w-full border-t border-[#ccc] py-2 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#777] gap-6">
          
          {/* Left: Socials */}
          <div className="flex items-center gap-4">
            <span>FOLLOW US —</span>
            <div className="flex items-center gap-4 text-[#1a1a1a]">
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
              <Link href="#" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
            </div>
          </div>

          {/* Center: Copyright */}
          <div className="text-center">
            @SIENA. ALL RIGHTS RESERVED
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors">COOKIE</Link>
            <span>-</span>
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors">PRIVACY</Link>
            <span>-</span>
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors">TERMS</Link>
          </div>
          
        </div>
      </footer>
    </main>
  );
};

export default FilmPage;