'use client'
import React, { useState, useRef } from 'react'
import Header from '../nav/Header'

const ContactSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mock data for header - replace with your actual state/data
  const headerFilms = [
    { img: '/assets/images/firstman.jpg', title: '004', year: '2024' },
    { img: '/assets/images/firstman.jpg', title: '005', year: '2023' }
  ];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col select-none overflow-hidden"
      style={{ 
        backgroundColor: '#FF1A00',
        backgroundSize: '100% 12.5vh' 
      }}
    >
      {/* ── HEADER & MAIN WRAPPER ── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col flex-1 relative z-10">
        
        {/* Header Container */}
        <div className="relative w-full pt-8 pb-4 z-50">
          <Header
            films={headerFilms} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            scrollContainerRef={wrapperRef} 
          />
        </div>

        <div className="flex flex-col items-center justify-center flex-1 py-16 md:py-24 min-h-[70vh]">
          {/* CONTACT US Label */}
          <p className="tracking-[0.6em] text-black text-[10px] md:text-xs uppercase mb-12 font-medium">
            CONTACT US
          </p>

          {/* BIG IMPACT HEADLINE WRAPPER */}
          <div className="flex flex-col items-center w-full relative">
            
            {/* Row 1: CRAFT */}
            {/* Mobile: taller height to fit scaled text. Desktop: maintained md:h-[6vw] */}
            <div className="w-full border-t-2 border-black flex justify-center py-0 h-[25vw] md:h-[6vw] items-center">
              <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[13.5vw] md:text-[90px] leading-none transform scale-y-[1.4] origin-center">
                CRAFT
              </p>
            </div>

            {/* Row 2: THE NEXT */}
            <div className="w-full border-t border-black flex justify-center py-0 h-[25vw] md:h-[6vw] items-center">
              <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[13.5vw] md:text-[90px] leading-none transform scale-y-[1.4] origin-center whitespace-nowrap">
                THE NEXT
              </p>
            </div>

            {/* Row 3: ACT */}
            <div className="w-full border-t border-b-2 border-black flex justify-center py-0 h-[25vw] md:h-[6vw] items-center">
              <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[13.5vw] md:text-[90px] leading-none transform scale-y-[1.4] origin-center">
                ACT
              </p>
            </div>

          </div>
        </div>

        {/* ── BOTTOM CONTACT BAR ── */}
        <div className="w-full pb-10 mt-auto relative z-20">
          {/* Changed gap for mobile, kept gap-10 for lg */}
          <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-16">
            
            {/* Left Side: Project Inquiries */}
            {/* Made height auto with padding on mobile, preserved desktop height */}
            <div className="relative w-full h-auto py-3 md:py-0 md:h-[20px] border-t border-b border-black flex items-center overflow-hidden">
              {/* Stack items on mobile (flex-col), side-by-side on desktop (md:flex-row) */}
              <div className="flex flex-col md:flex-row items-start md:items-baseline w-full">
                <span className="text-black text-[7px] md:text-[7px] tracking-[0.4em] font-semibold uppercase mb-1 md:mb-0 mr-0 md:mr-19 whitespace-nowrap">
                  PROJECT INQUIRIES
                </span>
                <p className="text-black font-medium uppercase text-2xl md:text-2xl lg:text-[30px] tracking-[-0.1em] m-0">
                  LEE@SIENA.FILM
                </p>
              </div>
            </div>

            {/* Right Side: Phone Number */}
            <div className="relative w-full h-auto py-3 md:py-0 md:h-[20px] border-t border-b border-black flex items-center overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-baseline w-full">
                <span className="text-black text-[7px] md:text-[9px] tracking-[0.4em] font-semibold uppercase mb-1 md:mb-0 mr-0 md:mr-10 whitespace-nowrap">
                  PHONE NUMBER
                </span>
                <p className="text-black font-medium uppercase text-2xl md:text-2xl lg:text-[30px] tracking-[-0.1em] m-0">
                  +972-54-2804049
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        h1, a {
          font-family: 'Helvetica Neue', 'Arial Black', sans-serif;
          font-stretch: condensed;
        }
      `}</style>
    </section>
  )
}

export default ContactSection