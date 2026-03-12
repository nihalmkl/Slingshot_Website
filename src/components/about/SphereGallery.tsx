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
  // Each column has a pixel width and a list of cells.
  // Outer columns are narrow + start lower (marginTop) → creates oval/sphere curve.
  // Inner columns are wider + start higher → fills the center of the sphere.
  // ─────────────────────────────────────────────────────────────────────
  const columns = [
    // Far left — narrowest, starts lowest
    {
      width: 75,
      topOffset: 90,
      cells: [
        { imgIdx: 0,  height: 115 },
        { imgIdx: 1,  height: 130 },
        { imgIdx: 2,  height: 110 },
      ],
    },
    // Left outer
    {
      width: 120,
      topOffset: 45,
      cells: [
        { imgIdx: 3,  height: 150 },
        { imgIdx: 4,  height: 155 },
        { imgIdx: 5,  height: 140 },
        { imgIdx: 6,  height: 100 },
      ],
    },
    // Left mid
    {
      width: 160,
      topOffset: 15,
      cells: [
        { imgIdx: 7,  height: 180 },
        { imgIdx: 8,  height: 185 },
        { imgIdx: 9,  height: 165 },
      ],
    },
    // Center left — widest
    {
      width: 195,
      topOffset: 0,
      cells: [
        { imgIdx: 10, height: 200 },
        { imgIdx: 11, height: 205 },
        { imgIdx: 12, height: 185 },
      ],
    },
    // Center right — widest
    {
      width: 195,
      topOffset: 0,
      cells: [
        { imgIdx: 13, height: 200 },
        { imgIdx: 14, height: 205 },
        { imgIdx: 15, height: 185 },
      ],
    },
    // Right mid
    {
      width: 160,
      topOffset: 15,
      cells: [
        { imgIdx: 16, height: 180 },
        { imgIdx: 17, height: 185 },
        { imgIdx: 18, height: 165 },
      ],
    },
    // Right outer
    {
      width: 120,
      topOffset: 45,
      cells: [
        { imgIdx: 19, height: 150 },
        { imgIdx: 20, height: 155 },
        { imgIdx: 21, height: 140 },
        { imgIdx: 22, height: 100 },
      ],
    },
    // Far right — narrowest, starts lowest
    {
      width: 75,
      topOffset: 90,
      cells: [
        { imgIdx: 23, height: 115 },
        { imgIdx: 0,  height: 130 },
        { imgIdx: 1,  height: 110 },
      ],
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 mt-20 z-20">

      {/* Radial vignette — fades hard into black on all edges */}
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

      {/* ── The sphere grid: columns side by side ── */}
      <div className="relative z-20 flex items-start justify-center gap-[3px]">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col gap-[3px]"
            style={{
              width: `${col.width}px`,
              flexShrink: 0,
              paddingTop: `${col.topOffset}px`,
            }}
          >
            {col.cells.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                className="relative overflow-hidden w-full"
                style={{ height: `${cell.height}px` }}
              >
                <Image
                  src={localImages[cell.imgIdx % localImages.length]}
                  alt={`Gallery ${colIdx}-${cellIdx}`}
                  fill
                  className="object-cover brightness-[0.82]"
                  sizes="200px"
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