import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function IntroPage() {
  return (
    // Pure black background, centered content
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Main Logo 
        Using your local path. Adjust width/height based on your actual PNG dimensions.
      */}
      <div className="mb-20 md:mb-28 flex justify-center">
        <Image 
          src="/assets/banner/sslogo-1.png" 
          alt="SIENA FILM FOUNDATION"
          width={600} 
          height={200} 
          className="w-[280px] md:w-[450px] lg:w-[650px] h-auto object-contain"
          priority // Loads the logo immediately
        />
      </div>

      {/* ENTER Ticket Button 
        Built entirely with Tailwind classes, no external CSS required.
      */}
      <Link 
          href="/" // Change to your destination
          className="group relative flex items-stretch text-white hover:text-white transition-colors duration-300 cursor-pointer min-h-[46px]"
        >
          {/* BACKGROUND HOVER LAYER
            Uses the mask intersection trick so the background hover effect doesn't spill into the holes! 
          */}
          <div 
            className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)',
              maskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect'
            }}
          />

          {/* === BORDER SEGMENTS (Creates the perfect curved strokes) === */}
          
          {/* Straight Lines */}
          {/* Top & Bottom Left Side */}
          <div className="absolute top-0 left-[6px] right-[62px] border-t border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 left-[6px] right-[62px] border-b border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          {/* Top & Bottom Right Side */}
          <div className="absolute top-0 right-[6px] w-[44px] border-t border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 right-[6px] w-[44px] border-b border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          {/* Far Left & Far Right */}
          <div className="absolute left-0 top-[6px] bottom-[6px] border-l border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute right-0 top-[6px] bottom-[6px] border-r border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />

          {/* 4 Outer Corner Curves */}
          <div className="absolute top-0 left-0 w-[6px] h-[6px] border-b border-r border-white/40 rounded-br-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[6px] h-[6px] border-b border-l border-white/40 rounded-bl-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[6px] h-[6px] border-t border-r border-white/40 rounded-tr-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-t border-l border-white/40 rounded-tl-full group-hover:border-white transition-colors duration-300 pointer-events-none" />

          {/* 2 Middle Notch Curves (The bites on the dashed line) */}
          <div className="absolute top-0 right-[50px] w-[12px] h-[6px] border-b border-l border-r border-white/40 rounded-b-full group-hover:border-white transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 right-[50px] w-[12px] h-[6px] border-t border-l border-r border-white/40 rounded-t-full group-hover:border-white transition-colors duration-300 pointer-events-none" />

          {/* The Vertical Dashed Perforation Line */}
          <div className="absolute top-[6px] bottom-[6px] right-[56px] border-l border-dashed border-white/40 group-hover:border-white transition-colors duration-300 pointer-events-none" />


          {/* === CONTENT === */}
          {/* Left Side: Text */}
          <div className="flex items-center justify-center px-10 md:px-14 py-3.5 md:py-4 tracking-[0.3em] text-[10px] md:text-xs font-semibold uppercase">
            Enter
          </div>
          
          {/* Right Side: Arrow (Fixed width of 56px aligns exactly with the notch math above) */}
          <div className="w-[56px] flex items-center justify-center">
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </Link>

    </main>
  );
}