import React from 'react';
import Image from 'next/image';

const SphereGallery = () => {
  const localImages = [
    '/assets/images/firstman.jpg',
    '/assets/images/first2.webp',
    '/assets/images/first1.webp',
    '/assets/images/first2.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/first1.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/first2.webp',
    '/assets/images/first1.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/first2.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/first1.webp',
    '/assets/images/first2.webp',
    '/assets/images/first2.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/first1.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/firstman.jpg',
    '/assets/images/first2.webp',
    '/assets/images/first1.webp',
    '/assets/images/first1.webp',
    '/assets/images/firstman.jpg',
    '/assets/images/firstman.jpg',
    '/assets/images/firstman.jpg',
    '/assets/images/first2.webp',
    '/assets/images/first1.webp',
    '/assets/images/first2.webp',
    '/assets/images/first2.webp',
  ];

  // ─── COLUMN DEFINITIONS ───────────────────────────────────────────────
  // Values are now scaled down (divided by 10). 
  // We will multiply them by var(--unit) to scale beautifully across all screens.
  // ─────────────────────────────────────────────────────────────────────
  const columns = [
    {
      width: 7.5,
      topOffset: 9,
      cells: [
        { imgIdx: 0, height: 11.5 },
        { imgIdx: 1, height: 13 },
        { imgIdx: 2, height: 11 },
      ],
    },
    {
      width: 12,
      topOffset: 4.5,
      cells: [
        { imgIdx: 3, height: 15 },
        { imgIdx: 4, height: 15.5 },
        { imgIdx: 5, height: 14 },
        { imgIdx: 6, height: 10 },
      ],
    },
    {
      width: 16,
      topOffset: 1.5,
      cells: [
        { imgIdx: 7, height: 18 },
        { imgIdx: 8, height: 18.5 },
        { imgIdx: 9, height: 16.5 },
      ],
    },
    {
      width: 19.5,
      topOffset: 0,
      cells: [
        { imgIdx: 10, height: 20 },
        { imgIdx: 11, height: 20.5 },
        { imgIdx: 12, height: 18.5 },
      ],
    },
    {
      width: 19.5,
      topOffset: 0,
      cells: [
        { imgIdx: 13, height: 20 },
        { imgIdx: 14, height: 20.5 },
        { imgIdx: 15, height: 18.5 },
      ],
    },
    {
      width: 16,
      topOffset: 1.5,
      cells: [
        { imgIdx: 16, height: 18 },
        { imgIdx: 17, height: 18.5 },
        { imgIdx: 18, height: 16.5 },
      ],
    },
    {
      width: 12,
      topOffset: 4.5,
      cells: [
        { imgIdx: 19, height: 15 },
        { imgIdx: 20, height: 15.5 },
        { imgIdx: 21, height: 14 },
        { imgIdx: 22, height: 10 },
      ],
    },
    {
      width: 7.5,
      topOffset: 9,
      cells: [
        { imgIdx: 23, height: 11.5 },
        { imgIdx: 0, height: 13 },
        { imgIdx: 1, height: 11 },
      ],
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 mt-20 z-20">
      
      {/* ── Dynamic CSS Variable Scaling ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .sphere-container {
            /* On mobile, it acts fluidly based on screen width (90% width) */
            --unit: 0.85vw; 
          }
          @media (min-width: 768px) {
            .sphere-container {
              /* Tablet sizing */
              --unit: 0.75vw;
            }
          }
          @media (min-width: 1024px) {
            .sphere-container {
              /* Desktop max size locks at your exact original pixels (1 unit = 10px) */
              --unit: 10px;
            }
          }
        `
      }} />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.98) 100%)',
        }}
      />

      {/* Subtle film grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* ── The sphere grid ── */}
      <div 
        className="sphere-container relative z-20 flex items-start justify-center"
        style={{ gap: 'calc(0.3 * var(--unit))' }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col"
            style={{
              width: `calc(${col.width} * var(--unit))`,
              flexShrink: 0,
              paddingTop: `calc(${col.topOffset} * var(--unit))`,
              gap: 'calc(0.3 * var(--unit))' // Vertical gap between images
            }}
          >
            {col.cells.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                className="relative overflow-hidden w-full"
                style={{ height: `calc(${cell.height} * var(--unit))` }}
              >
                <Image
                  src={localImages[cell.imgIdx % localImages.length]}
                  alt={`Gallery ${colIdx}-${cellIdx}`}
                  fill
                  className="object-cover brightness-[0.82]"
                  sizes="(max-width: 768px) 15vw, 200px"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
};

export default SphereGallery;