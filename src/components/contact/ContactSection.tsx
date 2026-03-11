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
        // // Creating the background lines using a CSS gradient for perfect consistency
        // backgroundImage: `linear-gradient(to bottom, transparent 99%, rgba(0,0,0,0.2) 99%)`,
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

        <div className="flex flex-col items-center justify-center flex-1 py-24 min-h-[70vh]">
  {/* CONTACT US Label */}
  <p className="tracking-[0.6em] text-black text-[10px] md:text-xs uppercase mb-12 font-medium">
    CONTACT US
  </p>

  {/* BIG IMPACT HEADLINE WRAPPER */}
  <div className="flex flex-col items-center w-full relative">
    
    {/* Row 1: CRAFT */}
    <div className="w-full border-t-2 border-black flex justify-center py-0 h-[10vw] md:h-[6vw] items-center">
      <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[18vw]  md:text-[90px] leading-none transform scale-y-[1.4] origin-center">
        CRAFT
      </p>
    </div>

    {/* Row 2: THE NEXT */}
    <div className="w-full border-t border-black flex justify-center py-0 h-[10vw] md:h-[6vw] items-center">
      <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[18vw]  md:text-[90px] leading-none transform scale-y-[1.4] origin-center">
        THE NEXT
      </p>
    </div>

    {/* Row 3: ACT */}
    <div className="w-full border-t border-b-2 border-black flex justify-center py-0 h-[12vw] md:h-[6vw] items-center">
      <p className="text-black uppercase font-semibold tracking-[-0.07em] text-[18vw]  md:text-[90px] leading-none transform scale-y-[1.4] origin-center">
        ACT
      </p>
    </div>

  </div>
</div>

        {/* ── BOTTOM CONTACT BAR ── */}
       <div className="w-full pb-12 md:pb-20 mt-auto relative z-20">
          <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-16">
            
            {/* Left Side: Project Inquiries */}
            <div className="relative w-full h-[40px] md:h-[50px] border-t border-b border-black flex items-center overflow-hidden">
              <div className="flex items-baseline w-full">
                <span className="text-black text-[7px] md:text-[9px] tracking-[0.4em] font-semibold uppercase mr-6 md:mr-10 whitespace-nowrap">
                  PROJECT INQUIRIES
                </span>
                <p
                  className="text-black font-medium uppercase text-2xl md:text-3xl lg:text-[38px] tracking-[-0.02em] leading-none m-0"
                  style={{ fontFamily: 'Impact, sans-serif' }}
                >
                  LEE@SIENA.FILM
                </p>
              </div>
            </div>

            {/* Right Side: Phone Number */}
            <div className="relative w-full h-[40px] md:h-[50px] border-t border-b border-black flex items-center overflow-hidden">
              <div className="flex items-baseline w-full">
                <span className="text-black text-[7px] md:text-[9px] tracking-[0.4em] font-semibold uppercase mr-6 md:mr-10 whitespace-nowrap">
                  PHONE NUMBER
                </span>
                <p
                  className="text-black font-medium uppercase text-2xl md:text-3xl lg:text-[38px] tracking-[-0.02em] leading-none m-0"
                  style={{ fontFamily: 'Impact, sans-serif' }}
                >
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