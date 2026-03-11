'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../nav/Header';

// ─── IMAGE DATA ──────────────────────────────────────────────────────────────
interface FilmImage {
  id: number
  src: string
  alt: string
}

const images: FilmImage[] = [
  { id: 1,  src: '/assets/images/firstman.jpg', alt: 'Film still 1' },
  { id: 2,  src: '/assets/images/first1.webp', alt: 'Film still 2' },
  { id: 3,  src: '/assets/images/firstman.jpg', alt: 'Film still 3' },
  { id: 4,  src: '/assets/images/first2.webp', alt: 'Film still 4' },
  { id: 5,  src: '/assets/images/firstman.jpg', alt: 'Film still 5' },
  { id: 6,  src: '/assets/images/firstman.jpg', alt: 'Film still 6' },
  { id: 7,  src: '/assets/images/first2.webp', alt: 'Film still 7' },
  { id: 8,  src: '/assets/images/firstman.jpg', alt: 'Film still 8' },
  { id: 9,  src: '/assets/images/first2.webp', alt: 'Film still 9' },
  { id: 10, src: '/assets/images/firstman.jpg', alt: 'Film still 10' },
  { id: 11, src: '/assets/images/firstman.jpg', alt: 'Film still 11' },
  { id: 12, src: '/assets/images/first2.webp', alt: 'Film still 12' },
  { id: 13, src: '/assets/images/first1.webp', alt: 'Film still 13' },
  { id: 14, src: '/assets/images/first2.webp', alt: 'Film still 14' },
  { id: 15, src: '/assets/images/firstman.jpg', alt: 'Film still 15' },
  { id: 16, src: '/assets/images/first1.webp', alt: 'Film still 16' },
  { id: 17, src: '/assets/images/firstman.jpg', alt: 'Film still 17' },
  { id: 18, src: '/assets/images/first1.webp', alt: 'Film still 18' },
  { id: 19, src: '/assets/images/firstman.jpg', alt: 'Film still 19' },
  { id: 20, src: '/assets/images/first1.webp', alt: 'Film still 20' },
  { id: 21, src: '/assets/images/firstman.jpg', alt: 'Film still 21' },
  { id: 22, src: '/assets/images/first2.webp', alt: 'Film still 22' },
  { id: 23, src: '/assets/images/firstman.jpg', alt: 'Film still 23' },
  { id: 24, src: '/assets/images/first1.webp', alt: 'Film still 24' },
  { id: 25, src: '/assets/images/firstman.jpg', alt: 'Film still 25' },
]

interface RowConfig {
  imageIds: number[]
  widthPercent: number
}

// EXACTLY 4 ROWS
const rows: RowConfig[] = [
  { imageIds: [1, 2, 3, 4, 5],        widthPercent: 92 },
  { imageIds: [6, 7, 8, 9, 10, 11],   widthPercent: 100 },
  { imageIds: [12, 13, 14, 15, 16],   widthPercent: 95 },
  { imageIds: [17, 18, 19, 20, 21],   widthPercent: 88 },
]

// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const headerFilms = [
    { img: '/assets/images/firstman.jpg', title: '004', year: '2024' },
    { img: '/assets/images/firstman.jpg', title: '005', year: '2023' }
  ];

  useEffect(() => {
    const cells = wrapperRef.current?.querySelectorAll<HTMLDivElement>('.gallery-cell')
    if (!cells) return
    cells.forEach((cell, i) => {
      cell.style.opacity = '0'
      cell.style.transform = 'scale(0.88)'
      setTimeout(() => {
        cell.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        cell.style.opacity = '1'
        cell.style.transform = 'scale(1)'
      }, 100 + i * 40)
    })
  }, [])
  
  return (
    <main className="bg-black text-white font-sans selection:bg-white/20 relative w-full flex flex-col items-center">
      
      {/* SVG Definitions for the Gothic Arch Mask */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="gothic-arch" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.5 C 0,0.2 0.5,0 0.5,0 C 0.5,0 1,0.2 1,0.5 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col relative">
        <div className="relative w-full pt-8 pb-4 z-50">
          <Header
            films={headerFilms} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            scrollContainerRef={wrapperRef} 
          />
        </div>

        {/* ─── SECTION 1: THREE PANELS ─── */}
        <div className="w-full mt-4 md:mt-10 mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_3.5fr_1.2fr] gap-4 md:gap-6 w-full h-auto md:h-[75vh]">
            
            {/* --- LEFT PANEL --- */}
            <div className="relative h-[60vh] md:h-full border border-dashed border-[#444] rounded-xl overflow-hidden flex flex-col items-center justify-end p-2 md:p-3">
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="absolute top-[18%] left-0 w-full border-t border-dashed border-[#555]"></div>
                <div className="absolute top-[-32%] left-[-10%] w-[120%] h-[50%] rounded-[100%] border border-dashed border-[#555]"></div>
              </div>
              <div className="w-full h-[82%] z-0 relative flex justify-center">
                <div 
                  className="w-full h-full bg-gray-900 relative"
                  style={{ clipPath: 'url(#gothic-arch)' }}
                >
                  <img 
                    src="assets/images/first1.webp" 
                    alt="Portrait Left" 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-125 opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* --- CENTER PANEL --- */}
            <div className="relative h-[60vh] md:h-full border border-dashed border-[#444] rounded-xl flex flex-col items-center justify-between py-10 px-4 md:px-10 overflow-hidden">
              <div className="text-center flex flex-col z-20 mt-2">
                <span className="text-[10px] md:text-[12px] tracking-[0.15em] text-gray-400">SLINGSHOT FILM</span>
                <span className="text-[10px] md:text-[12px] tracking-[0.15em] text-gray-400">FOUNDATION IS A</span>
              </div>
              <div className="relative w-full flex-1 flex flex-col items-center justify-center my-4">
                <div className="absolute inset-0 flex flex-col justify-evenly z-0 pointer-events-none w-full py-[15%]">
                  <div className="w-full border-t border-[#444]"></div>
                  <div className="w-full border-t border-[#444]"></div>
                  <div className="w-full border-t border-[#444]"></div>
                  <div className="w-full border-t border-[#444]"></div>
                </div>
                <div className="z-10 flex flex-col items-center justify-between h-[65%] w-full">
                  <h2 className="bg-black px-6 text-5xl md:text-6xl lg:text-[75px] font-medium tracking-tight uppercase leading-none">Film</h2>
                  <h2 className="bg-black px-6 text-5xl md:text-6xl lg:text-[75px] font-medium tracking-tight uppercase leading-none">Production</h2>
                  <h2 className="bg-black px-6 text-5xl md:text-6xl lg:text-[75px] font-medium tracking-tight uppercase leading-none">House</h2>
                </div>
              </div>
              <div className="text-center flex flex-col z-20 mb-4">
                <span className="text-[10px] md:text-[12px] tracking-[0.15em] text-gray-400">DEDICATED TO CRAFTING</span>
                <span className="text-[10px] md:text-[12px] tracking-[0.15em] text-gray-400">GROUNDBREAKING NARRATIVES</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black p-1 flex items-center justify-center">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-black cursor-pointer hover:scale-105 transition-transform duration-300 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* --- RIGHT PANEL --- */}
            <div className="relative h-[60vh] md:h-full border border-dashed border-[#444] rounded-xl overflow-hidden flex flex-col items-center justify-end p-2 md:p-3">
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="absolute top-[18%] left-0 w-full border-t border-dashed border-[#555]"></div>
                <div className="absolute top-[-32%] left-[-10%] w-[120%] h-[50%] rounded-[100%] border border-dashed border-[#555]"></div>
              </div>
              <div className="w-full h-[82%] z-0 relative flex justify-center">
                <div 
                  className="w-full h-full bg-gray-900 relative"
                  style={{ clipPath: 'url(#gothic-arch)' }}
                >
                  <img 
                    src="assets/images/first2.webp" 
                    alt="Portrait Right" 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-125 opacity-90"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── SECTION 2: TYPOGRAPHY ─── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 text-white pt-10 md:pt-20 pb-10 flex flex-col relative z-10 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10 mb-20 md:mb-32">
          <div className="w-full md:w-auto md:ml-[15%]">
            <ul className="text-left text-[15px] md:text-[20px] font-bold tracking-tighter leading-none space-y-1">
              <li>MOON IN THE 12TH HOUSE</li>
              <li>TABOO</li>
              <li>SAVOY</li>
              <li>PRISONER X</li>
            </ul>
          </div>
          <div className="w-full md:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-6 text-[#999999] font-medium text-[16px] md:text-[20px] leading-tight tracking-tight">
            <div className="text-left">
              <p>With a commitment to selective</p>
              <p>Siena Film Foundation supports</p>
              <p>and feature films</p>
              <p>leaving an indelible</p>
            </div>
            <div className="text-right">
              <p>and thoughtful</p>
              <p>and produces</p>
              <p>that resonate</p>
              <p>mark</p>
            </div>
            <div className="text-right">
              <p>storytelling,</p>
              <p>TV, documentaries,</p>
              <p>globally,</p>
              <p>on the world of cinema.</p>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[30vh] md:h-[40vh] select-none flex items-center">
          <h2 className="absolute -left-[4%] top-0 text-[14vw] md:text-[7vw] font-medium tracking-tighter uppercase leading-none">TELEVISION</h2>
          <div className="absolute left-[20%] top-[65%] w-[25vw] md:w-[12vw] h-[3px] bg-white"></div>
          <h2 className="absolute left-[65%] -translate-x-1/2 top-[48%] text-[15vw] md:text-[7vw] font-medium tracking-tighter uppercase leading-none w-max">DOCUMENTARY</h2>
          <h2 className="absolute -right-[2%] top-0 text-[18vw] md:text-[7vw] font-medium tracking-tighter uppercase leading-none">FILMS</h2>
        </div>

        <div className="relative w-full h-[40vh] md:h-[50vh] mt-10 md:mt-1 flex items-end justify-between">
          <div className="absolute -left-[5%] -bottom-[5%] text-[#FDFBF7] font-bold leading-[0.75] tracking-tighter" style={{ fontSize: '20vw' }}>ENA</div>
          <div className="absolute right-[25%] bottom-[20%] text-right z-20">
            <ul className="text-[14px] md:text-[18px] font-bold tracking-tighter leading-tight">
              <li>ANA MAXIM</li>
              <li>FREUD THE OUTSIDER</li>
              <li>KAFKA'S LAST TRIAL</li>
            </ul>
          </div>
          <div className="absolute right-0 bottom-[25%] text-left text-[#555] text-[9px] md:text-[11px] font-medium leading-tight tracking-wider z-20">
            <p>SIENA FILM FOUNDATION</p>
            <p>HARDCOVER. 365 DAYS OF INNOVATION</p>
            <p>ISBN: DRIVE-GROWTH-STANDOUT-FANS</p>
            <p>CULTURALLY-CODED CREATIVITY</p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 3: 4-ROW GALLERY ─── */}
      <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 mt-20 z-20">
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.95) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />

        <div 
          ref={wrapperRef} 
          className="relative z-20 w-full max-w-[1200px] flex flex-col items-center gap-[4px]"
          style={{ perspective: '1200px' }}
        >
          {rows.map((row, rowIdx) => (
            <div 
              key={rowIdx} 
              className="flex gap-[4px] items-stretch justify-center" 
              style={{ width: `${row.widthPercent}%` }}
            >
              {row.imageIds.map((imgId, colIdx) => {
                const img = images.find((i) => i.id === imgId)!
                return (
                  <GalleryCell 
                    key={imgId} 
                    img={img} 
                    colIdx={colIdx} 
                    rowLength={row.imageIds.length} 
                  />
                )
              })}
            </div>
          ))}
        </div>

        <style>{`
          .gallery-cell-wrapper { transition: z-index 0s 0.4s; }
          .gallery-cell-wrapper:hover { z-index: 50; transition: z-index 0s 0s; }
          .gallery-cell { transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease; filter: brightness(0.85); }
          .gallery-cell-wrapper:hover .gallery-cell { transform: scale(1.15) translateZ(40px) !important; filter: brightness(1.15); box-shadow: 0 30px 60px rgba(0,0,0,0.9); }
          .gallery-cell img { transition: transform 0.6s ease; }
          .gallery-cell-wrapper:hover .gallery-cell img { transform: scale(1.05); }
        `}</style>
      </section>

      {/* ─── SECTION 4: WHO WE ARE (PROFILES) ─── */}
      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-10 py-20 flex flex-col items-center z-30">
        
        {/* Ticket-Style "WHO WE ARE" Badge */}
        <div className="relative flex items-center justify-center bg-[#fcfaf5] text-black px-10 py-3 z-20 shadow-xl mb-12">
          {/* Inner dashed border */}
          <div className="absolute inset-1.5 border border-dashed border-black/40 pointer-events-none"></div>
          {/* Left/Right punched holes (using background color black to simulate transparency) */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
          {/* Text */}
          <span className="font-bold text-[13px] md:text-[15px] tracking-[0.2em] uppercase px-4 z-10">
            Who We Are
          </span>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          
          {/* Card 1: Dorit */}
          <div className="border border-dashed border-[#444] rounded-2xl flex flex-col lg:flex-row overflow-hidden bg-black">
            {/* Image Side */}
            <div className="w-full lg:w-[45%] relative min-h-[300px] lg:min-h-[450px]">
              <img 
                src="assets/images/fifth1.webp" 
                alt="Dorit Hakim Kramer" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            {/* Text Side */}
            <div className="w-full lg:w-[55%] p-8 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-dashed border-[#444]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#888] font-semibold uppercase">Founder</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-semibold leading-[0.9] tracking-tighter uppercase mb-6 text-white">
                Dorit<br/>Hakim<br/>Kramer
              </h3>
              <p className="text-[#999] text-sm md:text-[15px] leading-relaxed font-medium">
                Dorit Hakim Kramer is a writer, director, and producer known for award-winning films and TV. A Sam Spiegel alum and board member, she founded Siena Film Foundation to produce socially impactful works. She co-produced the acclaimed 2022 'Savoy' documentary and she just published her new book 'Due West'.
              </p>
            </div>
          </div>

          {/* Card 2: Lee */}
          <div className="border border-dashed border-[#444] rounded-2xl flex flex-col lg:flex-row overflow-hidden bg-black">
            {/* Image Side */}
            <div className="w-full lg:w-[45%] relative min-h-[300px] lg:min-h-[450px]">
              <img 
                src="assets/images/fifth2.webp" 
                alt="Lee Shira" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            {/* Text Side */}
            <div className="w-full lg:w-[55%] p-8 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-dashed border-[#444]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#888] font-semibold uppercase">Founder</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold leading-[0.9] tracking-tighter uppercase mb-6 text-white">
                Lee<br/>Shira
              </h3>
              <p className="text-[#999] text-sm md:text-[15px] leading-relaxed font-medium">
                Lee Shira is a seasoned producer with expertise in drama series, films, and documentaries. With a Film Studies degree from Tel Aviv University, Lee has contributed to projects like Our Boys (HBO), Scenes from a Marriage (HBO), and the Oscar-nominated Footnote. In 2024, Lee joined the Siena Film Foundation.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-10 py-10 md:py-20 flex flex-col items-center z-30">
        
        {/* Ticket-Style "OUR SERVICES" Badge */}
        <div className="relative flex items-center justify-center bg-[#fcfaf5] text-black px-10 py-3 z-20 shadow-xl mb-12">
          {/* Inner dashed border */}
          <div className="absolute inset-1.5 border border-dashed border-black/40 pointer-events-none"></div>
          {/* Left/Right punched holes (using background color black to simulate transparency) */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full"></div>
          {/* Text */}
          <span className="font-bold text-[13px] md:text-[15px] tracking-[0.2em] uppercase px-4 z-10">
            Our Services
          </span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          
          {/* Service Card 1 */}
          <div className="flex flex-col w-full">
            {/* Top Cream Header */}
            <div className="bg-[#fcfaf5] text-black text-center py-2 rounded-t-2xl">
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] font-semibold uppercase">
                Service 1
              </span>
            </div>
            {/* Main Black Body */}
            <div className="bg-black border-l border-r border-b border-dashed border-[#fff] rounded-b-2xl flex items-center justify-center min-h-[250px] md:min-h-[230px]">
              <h4 className="text-3xl md:text-[60px] font-medium tracking-tighter uppercase text-center leading-[0.9] text-white">
                Film<br/>Financing
              </h4>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* Top Cream Header */}
            <div className="bg-[#fcfaf5] text-black text-center py-2 rounded-t-2xl">
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] font-semibold uppercase">
                Service 2
              </span>
            </div>
            {/* Main Black Body */}
            <div className="bg-black border-l border-r border-b border-dashed border-[#fff] rounded-b-2xl flex items-center justify-center min-h-[250px] md:min-h-[230px]">
              <h4 className="text-3xl md:text-[60px] font-medium tracking-tighter uppercase text-center leading-[0.9] text-white">
                Film<br/>Production
              </h4>
            </div>
          </div>

        

        </div>
      </section>
      

      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-10 pb-20 md:pb-32 z-30 mt-15">
  {/* We need a relative container with height for your absolute code to work without collapsing */}
  <div className="relative w-full h-[40vh] md:h-[100vh] rounded-2xl overflow-hidden">
    
    <div className="absolute inset-0 z-10">
      {/* Base Image underneath */}
      <div className="absolute inset-0 z-0">
        <img
          src='/assets/images/sleepy.webp'
          alt='adhdkjha'
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/20 to-black/50 mix-blend-multiply z-10" />
      
      {/* Noise/Texture Background on top */}
      <img
        src="/assets/images/background.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-fill opacity-70 z-20 pointer-events-none"
      />
    </div>

    {/* Centered Content (Text and Button) */}
   <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8 md:gap-10 pointer-events-none">
  <h2 className="text-6xl md:text-9xl lg:text-[90px] font-medium text-white tracking-tight uppercase leading-none">
    OUR FILMS
  </h2>

  <Link href="/" className="group relative flex items-stretch text-black transition-transform duration-300 hover:scale-105 cursor-pointer min-h-[46px] pointer-events-auto drop-shadow-2xl">
    
    {/* Solid White Ticket Background with Mask */}
    <div 
      className="absolute inset-0 bg-white pointer-events-none" 
      style={{ 
        WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)', 
        maskImage: 'radial-gradient(circle at 0 0, transparent 5.5px, black 6px), radial-gradient(circle at 100% 0, transparent 5.5px, black 6px), radial-gradient(circle at 0 100%, transparent 5.5px, black 6px), radial-gradient(circle at 100% 100%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 0%, transparent 5.5px, black 6px), radial-gradient(circle at calc(100% - 56px) 100%, transparent 5.5px, black 6px)', 
        WebkitMaskComposite: 'destination-in', 
        maskComposite: 'intersect' 
      }} 
    />
    
    {/* Black Dashed Divider Line */}
    <div className="absolute top-[6px] bottom-[6px] right-[56px] border-l border-dashed border-black/30 pointer-events-none" />
    
    {/* Text */}
    <div className="relative z-10 flex items-center justify-center px-10 md:px-8 py-3 md:py-4 tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase">
      Explore
    </div>
    
    {/* Arrow Icon */}
    <div className="relative z-10 w-[56px] flex items-center justify-center">
      <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
    
  </Link>
</div>

  </div>
</section>

      <footer className="relative w-full bg-black text-white pt-32 flex flex-col items-center z-30">
        
        {/* Tiny Center Logo Box */}
        <div className="relative  flex flex-col items-center justify-end mb-16 overflow-hidden">
          
          {/* PNG Logo - Increased size and pushed to the bottom of the arch */}
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
        <div className="relative w-full flex flex-col items-center justify-center mb-24 md:mb-32 overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none z-0 w-full py-[3%] md:py-[1%]">
            <div className="w-full border-t border-[#e5e4df]"></div>
            <div className="w-full border-t border-[#e5e4df]"></div>
            <div className="w-full border-t border-[#e5e4df]"></div>
            <div className="w-full border-t border-[#e5e4df]"></div>
          </div>
          <div className="z-10 flex flex-col items-center justify-between w-full max-w-[1400px]">
            <h2 className="bg-black px-4 md:px-8 text-[12vw] md:text-[7.5vw] font-bold uppercase tracking-tighter leading-none text-[#e5e4df]">PRODUCTION</h2>
            <h2 className="bg-black px-4 md:px-8 text-[12vw] md:text-[7.5vw] font-bold uppercase tracking-tighter leading-none text-[#e5e4df]">DOCUMENTARY</h2>
            <h2 className="bg-black px-4 md:px-8 text-[12vw] md:text-[7.5vw] font-bold uppercase tracking-tighter leading-none text-[#e5e4df]">FILM TV</h2>
          </div>
        </div>

        {/* Footer Bottom Content (3 Columns) - Grouped closer together */}
        <div className="w-full max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 items-start mb-24">
          
          {/* Column 1: Newsletter */}
          <div className="flex flex-col items-start w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#e5e4df]">
              Stay Up To Date
            </h4>
            <div className="relative w-full max-w-[280px] border border-dashed border-[#666] rounded-full p-1.5 flex items-center justify-between">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-transparent border-none outline-none text-[10px] md:text-[11px] tracking-[0.15em] pl-4 w-full text-white placeholder-[#888] uppercase"
              />
              <button aria-label="Submit" className="bg-[#e5e4df] text-black w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col items-start md:items-center w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#e5e4df]">
              Sitemap
            </h4>
            <nav className="flex flex-col items-start md:items-center gap-0">
              <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#333] hover:text-[#e5e4df] transition-colors leading-[0.85]">HOME</Link>
              <Link href="/work" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#333] hover:text-[#e5e4df] transition-colors leading-[0.85]">WORK</Link>
              <Link href="/about" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#333] hover:text-[#e5e4df] transition-colors leading-[0.85]">ABOUT</Link>
              <Link href="/contact" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#333] hover:text-[#e5e4df] transition-colors leading-[0.85]">CONTACT</Link>
            </nav>
          </div>

          {/* Column 3: Contact Us (Left Aligned within its column) */}
          <div className="flex flex-col items-start w-full">
            <h4 className="text-[10px] md:text-[11px] tracking-[0.25em] font-bold mb-6 uppercase text-[#e5e4df]">
              Contact Us
            </h4>
            {/* The underline sits under both the label and the email */}
            <div className="flex items-end border-b border-[#e5e4df] pb-2 w-full justify-start mt-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#e5e4df] mr-6 mb-1">
                INQUIRIES
              </span>
              <a href="mailto:LEE@SIENA.FILM" className="text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tighter uppercase text-[#e5e4df] hover:opacity-80 transition-opacity">
                LEE@SIENA.FILM
              </a>
            </div>
          </div>
        </div>

        {/* ─── VERY BOTTOM BAR ─── */}
        <div className="w-full border-t border-[#333] py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] gap-6">
          
          {/* Left: Socials */}
          <div className="flex items-center gap-4">
            <span>FOLLOW US —</span>
            <div className="flex items-center gap-4 text-[#e5e4df]">
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
            <Link href="#" className="hover:text-[#e5e4df] transition-colors">COOKIE</Link>
            <span>-</span>
            <Link href="#" className="hover:text-[#e5e4df] transition-colors">PRIVACY</Link>
            <span>-</span>
            <Link href="#" className="hover:text-[#e5e4df] transition-colors">TERMS</Link>
          </div>
          
        </div>
      </footer>

    </main>
  );
};

export default AboutSection;

// ─── GALLERY CELL COMPONENT (Flat heights, Narrow edges) ─────────────────────
interface GalleryCellProps {
  img: FilmImage
  colIdx: number
  rowLength: number
}

const GalleryCell: React.FC<GalleryCellProps> = ({ img, colIdx, rowLength }) => {
  const height = '180px'; 
  
  // Shrink left and right widths
  const isEdge = colIdx === 0 || colIdx === rowLength - 1;
  const flexValue = isEdge ? '0.5' : '1'; 

  const midCol = (rowLength - 1) / 2;
  const xPos = rowLength === 1 ? 0 : (colIdx - midCol) / midCol;
  
  const rotateY = xPos * -30;
  const translateZ = (1 - Math.abs(xPos)) * 60;

  return (
    <div
      className="gallery-cell-wrapper relative group"
      style={{ 
        height, 
        flex: flexValue, 
        minWidth: 0,
        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="gallery-cell w-full h-full relative overflow-hidden rounded-[3px] cursor-pointer shadow-2xl">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 25vw, 15vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none"></div>
      </div>
    </div>
  )
}