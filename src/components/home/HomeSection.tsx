'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import CustomCursor from '../cursor/Cursor';
import Header from '../nav/Header';

export default function HomeSection() {
  const [activeIndex, setActiveIndex] = useState(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<any>(null);

  // Drag state
  const isDragging      = useRef(false);
  const hasDragged      = useRef(false);
  const dragStartY      = useRef(0);
  const dragStartScroll = useRef(0);

  // Inertia state
  const lastY           = useRef(0);
  const velocity        = useRef(0);
  const lastTime        = useRef(0);
  const inertiaRaf      = useRef<number>(0);

  const films = [
    { title: 'SAVOY',                img: '/assets/images/firstman.jpg', director: 'Zohar Wagner',    year: '2022' },
    { title: 'MOON IN THE 12TH HOUSE', img: '/assets/images/firstman.jpg', director: 'Dorit Hakim',  year: '2015' },
    { title: 'TABOO',                img: '/assets/images/firstman.jpg', director: 'Amos Guttman',    year: '1989' },
    { title: "KAFKA'S LAST TRIAL",   img: '/assets/images/firstman.jpg', director: 'Eliran Peled',    year: '2023' },
    { title: 'MY PROJECT X',         img: '/assets/images/firstman.jpg', director: 'Limor Pinhasov',  year: '2024' },
    { title: 'ANA MAXIM',            img: '/assets/images/firstman.jpg', director: 'Yoni Handelsman', year: '2024' },
    { title: 'OUTSIDER FREUD',       img: '/assets/images/firstman.jpg', director: 'Nitzan Gilady',   year: '2024' },
  ];

  const extendedFilms  = Array(5).fill(films).flat();
  const originalLength = films.length;
  const middleSetStart = originalLength * 2; // index 14
  const CARD_HEIGHT    = 582; // 550px + 32px gap

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = (middleSetStart + activeIndex) * CARD_HEIGHT;
    }
  }, []);

  /* ── Snap + infinite-loop logic on natural scroll ── */
  const handleScroll = () => {
    if (!scrollContainerRef.current || isDragging.current) return;
    const container = scrollContainerRef.current;
    const scrollY   = container.scrollTop;
    const currentIndex = Math.round(scrollY / CARD_HEIGHT);
    const realIndex    = currentIndex % originalLength;

    if (realIndex !== activeIndex && realIndex >= 0) {
      setActiveIndex(realIndex);
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const snapIndex = Math.round(scrollContainerRef.current.scrollTop / CARD_HEIGHT);
      if (snapIndex < originalLength || snapIndex >= originalLength * 4) {
        scrollContainerRef.current.scrollTop =
          (middleSetStart + (snapIndex % originalLength)) * CARD_HEIGHT;
      }
    }, 150);
  };

  /* ── Snap to nearest card after drag/inertia ── */
  const snapToNearest = () => {
    if (!scrollContainerRef.current) return;
    const current = scrollContainerRef.current.scrollTop;
    const nearest = Math.round(current / CARD_HEIGHT) * CARD_HEIGHT;
    // Smooth scroll to snap point
    scrollContainerRef.current.scrollTo({ top: nearest, behavior: 'smooth' });
    // Re-enable CSS snap
    scrollContainerRef.current.style.scrollSnapType = 'y mandatory';
    // Update activeIndex
    const snapIndex = Math.round(nearest / CARD_HEIGHT);
    setActiveIndex(snapIndex % originalLength);
  };

  /* ── Inertia animation after mouse-up ── */
  const runInertia = () => {
    if (!scrollContainerRef.current) return;
    const FRICTION = 0.88; // lower = stops faster, higher = more glide

    const step = () => {
      velocity.current *= FRICTION;

      if (Math.abs(velocity.current) < 0.5) {
        // Done — snap to nearest
        snapToNearest();
        return;
      }

      scrollContainerRef.current!.scrollTop += velocity.current;
      inertiaRaf.current = requestAnimationFrame(step);
    };

    inertiaRaf.current = requestAnimationFrame(step);
  };

  /* ── Mouse handlers ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    cancelAnimationFrame(inertiaRaf.current); // stop any ongoing inertia
    isDragging.current    = true;
    hasDragged.current    = false;
    dragStartY.current    = e.clientY;
    lastY.current         = e.clientY;
    lastTime.current      = performance.now();
    velocity.current      = 0;
    dragStartScroll.current = scrollContainerRef.current.scrollTop;

    document.body.style.userSelect = 'none';
    // Disable CSS snap so drag feels free
    scrollContainerRef.current.style.scrollSnapType = 'none';

    window.dispatchEvent(new CustomEvent('dragScroll', { detail: { dragging: true } }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;

    const delta = dragStartY.current - e.clientY;
    if (Math.abs(delta) > 4) hasDragged.current = true;

    // Calculate velocity from recent movement
    const now      = performance.now();
    const elapsed  = now - lastTime.current;
    const dy       = lastY.current - e.clientY;
    if (elapsed > 0) {
      // Smooth velocity with small blend factor
      velocity.current = velocity.current * 0.6 + (dy / elapsed) * 16 * 0.4;
    }

    lastY.current    = e.clientY;
    lastTime.current = now;

    scrollContainerRef.current.scrollTop = dragStartScroll.current + delta;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.userSelect = '';

    window.dispatchEvent(new CustomEvent('dragScroll', { detail: { dragging: false } }));

    // If barely moved, just snap immediately
    if (Math.abs(velocity.current) < 1) {
      snapToNearest();
    } else {
      runInertia();
    }
  };

  return (
    <div className="relative h-screen bg-[#0a0a0a] text-white font-sans p-6 md:p-12 overflow-hidden flex flex-col">

      <CustomCursor />

      <Header
        films={films}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        scrollContainerRef={scrollContainerRef}
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute inset-0 overflow-y-auto snap-y snap-mandatory flex flex-col items-center gap-8 px-6 md:px-12 z-10"
        style={{
          paddingBlock:    'calc(50vh - 275px)',
          scrollbarWidth:  'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {extendedFilms.map((film, index) => {
          const isActive = (index % originalLength) === activeIndex;

          return (
            <main
              key={index}
              /* HEIGHT RESTORED TO STRICTLY 550px SO DRAG/SCROLL MATH WORKS PERFECTLY */
              className={`relative w-full h-[550px] shrink-0 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black snap-center transition-all duration-500 ease-out cursor-pointer pointer-events-auto
                ${isActive ? 'opacity-100 brightness-[0.85]' : 'opacity-60 hover:opacity-80'}
              `}
              onClick={() => {
                if (hasDragged.current) return;
                if (!isActive && scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ top: index * CARD_HEIGHT, behavior: 'smooth' });
                }
              }}
            >
              <div className="absolute inset-0 z-10">
                <img
                  src="/assets/images/background.png"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-fill opacity-70 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50 mix-blend-multiply" />
                <div className="absolute inset-0 z-0">
                  <img
                    src={film.img}
                    alt={film.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>


              {/* ==============================================
                  1. DESKTOP LAYOUT (Exact Original Code)
                     Hidden completely on mobile using hidden md:flex
                  ============================================== */}
              <div className={`hidden md:flex relative z-10 p-16 flex-col md:flex-row justify-between h-full min-h-[550px] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col justify-between max-w-lg z-10">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-lg tracking-widest uppercase mb-1 font-semibold">2024</span>
                    <span className="text-[10px] tracking-widest uppercase mb-4 leading-relaxed font-medium">
                      The Cinema<br />South Film<br />Festival
                    </span>
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.8,11.3c0,0-1.1-2.1-2.2-2.1c-1,0-1.8,1.4-2.8,1.4c-1.1,0-2-1.6-3.1-1.6c-0.8,0-1.6,0.6-2.2,1.2 c-0.8-1.5-2.2-2.3-3.9-2.3c-2,0-3.3,1.4-4,3.2C1.1,12.3,1,14.2,1,16h2c0-1.4,0.1-2.8,0.7-3.9c0.4-0.8,1-1.4,1.9-1.4 c1.1,0,1.9,0.8,2.3,1.9l0.4,1.4H10l-0.4-2.1c0.4-0.4,1-0.9,1.6-0.9c0.7,0,1.3,0.8,2,0.8c1.6,0,2.6-2,3.3-2 c0.6,0,1.3,1.4,1.3,1.4l1-1v4h2v-2C20.8,12.2,19.8,11.3,19.8,11.3z" />
                    </svg>
                  </div>
                  <div className="mt-auto pt-20 flex flex-col items-start z-20">
                    <div className="w-full max-w-[450px] text-center mb-3">
                      <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/90">
                        DOCUMENTARY
                      </span>
                    </div>
                    <h2 className="text-[48px] font-semibold uppercase tracking-tighter leading-[0.85] mb-8 max-w-[380px] text-white">
                      {film.title}
                    </h2>
                    <div className="w-[360px] flex flex-col text-[12.5px] font-extrabold tracking-[0.25em] uppercase text-white">
                      <div className="flex items-center w-full border-t border-b border-white/90 py-[1px]">
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">DIRECTOR</span>
                        <span className="flex-1 text-center leading-[0.65] mt-[2px]">{film.director}</span>
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
                <div className="flex flex-col justify-between items-end text-right z-10">
                  <div className="space-y-8 max-w-xs">
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Critical Acclaim</p>
                      <p className="text-sm tracking-wider uppercase font-medium mb-2">"Inspiring True Story"</p>
                      <div className="text-white text-xs tracking-widest">★★★★★</div>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">The Armenian Report</p>
                      <p className="text-sm tracking-wider uppercase font-medium mb-2">"A fascinating voyage"</p>
                      <div className="text-white text-xs tracking-widest">★★★★★</div>
                    </div>
                  </div>
                  <Link href="/work" className="group relative flex items-stretch text-black cursor-pointer h-[48px] w-[210px] overflow-hidden">
                    <div className="absolute inset-0 bg-[#f4f2eb] pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 6.5px), radial-gradient(circle at 100% 0, transparent 6px, black 6.5px), radial-gradient(circle at 0 100%, transparent 6px, black 6.5px), radial-gradient(circle at 100% 100%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 0%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 100%, transparent 6px, black 6.5px)', maskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 6.5px), radial-gradient(circle at 100% 0, transparent 6px, black 6.5px), radial-gradient(circle at 0 100%, transparent 6px, black 6.5px), radial-gradient(circle at 100% 100%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 0%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 100%, transparent 6px, black 6.5px)' }} />
                    <div className="absolute top-[8px] bottom-[8px] right-[50px] border-l border-dashed border-black/50 pointer-events-none" />
                    
                    <div className="relative z-10 flex-1 flex items-center justify-center tracking-[0.25em] text-[12px] font-extrabold uppercase pt-[2px]">
                      Explore
                    </div>
                    <div className="relative z-10 w-[50px] flex items-center justify-center">
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>


              {/* ==============================================
                  2. MOBILE LAYOUT (Stacked to match screenshot)
                     Hidden on desktop using flex md:hidden
                  ============================================== */}
              <div className={`flex md:hidden relative z-10 p-6 pt-10 flex-col items-center justify-between h-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Top: Ratings side-by-side */}
                <div className="flex justify-between gap-4 w-full px-2">
                  <div className="flex flex-col items-center w-1/2 text-center">
                    <div className="text-white text-[11px] tracking-widest mb-3">★★★★★</div>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white mb-3">Critical<br/>Acclaim</p>
                    <p className="text-[13px] font-bold uppercase leading-tight text-white">"A fascinating<br/>voyage"</p>
                  </div>
                  <div className="flex flex-col items-center w-1/2 text-center">
                    <div className="text-white text-[11px] tracking-widest mb-3">★★★★★</div>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white mb-3">The Armenian<br/>Report</p>
                    <p className="text-[13px] font-bold uppercase leading-tight text-white">"Inspiring<br/>True story"</p>
                  </div>
                </div>

                {/* Middle: Title & Meta Grid */}
                <div className="flex flex-col items-center w-full mt-auto mb-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/90 mb-2">
                    DOCUMENTARY
                  </span>
                  
                  <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-none mb-5 text-white text-center">
                    {film.title}
                  </h2>

                  <div className="w-full max-w-[300px] flex flex-col text-[12px] font-extrabold tracking-[0.15em] uppercase text-white">
                    <div className="flex items-center justify-between w-full border-t border-b border-white/90 py-[5px]">
                      <span className="flex-1 text-center">DIRECTOR</span>
                      <span className="flex-1 text-center">{film.director}</span>
                    </div>
                    <div className="flex items-center justify-between w-full border-b border-white/90 py-[5px]">
                      <span className="flex-1 text-center">YEAR</span>
                      <span className="flex-1 text-center">{film.year}</span>
                    </div>
                    <div className="flex items-center justify-between w-full border-b border-white/90 py-[5px]">
                      <span className="flex-1 text-center">CATEGORY</span>
                      <span className="flex-1 text-center">DOCUMENTARY</span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Solid Off-White Button */}
                <div className="w-full flex justify-center pb-2">
                  <Link href="/work" className="group relative flex items-stretch text-black cursor-pointer h-[48px] w-[210px] overflow-hidden">
                    <div className="absolute inset-0 bg-[#f4f2eb] pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 6.5px), radial-gradient(circle at 100% 0, transparent 6px, black 6.5px), radial-gradient(circle at 0 100%, transparent 6px, black 6.5px), radial-gradient(circle at 100% 100%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 0%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 100%, transparent 6px, black 6.5px)', maskImage: 'radial-gradient(circle at 0 0, transparent 6px, black 6.5px), radial-gradient(circle at 100% 0, transparent 6px, black 6.5px), radial-gradient(circle at 0 100%, transparent 6px, black 6.5px), radial-gradient(circle at 100% 100%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 0%, transparent 6px, black 6.5px), radial-gradient(circle at calc(100% - 50px) 100%, transparent 6px, black 6.5px)' }} />
                    <div className="absolute top-[8px] bottom-[8px] right-[50px] border-l border-dashed border-black/50 pointer-events-none" />
                    
                    <div className="relative z-10 flex-1 flex items-center justify-center tracking-[0.25em] text-[12px] font-extrabold uppercase pt-[2px]">
                      Explore
                    </div>
                    <div className="relative z-10 w-[50px] flex items-center justify-center">
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

            </main>
          );
        })}
      </div>
    </div>
  );
}