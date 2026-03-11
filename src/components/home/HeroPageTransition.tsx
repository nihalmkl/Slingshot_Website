// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';

// /*
//   HeroPageTransition.tsx
  
//   Cinematic exit animation when EXPLORE is clicked:
//   ─ Arrow shoots right + border fills white (existing hover)
//   ─ On click: left column (festival badge + title + info) slides LEFT + fades
//   ─ Hero image slides LEFT (out of frame) with slight scale down
//   ─ Right column (reviews) slides UP and fades
//   ─ Explore button slides DOWN and fades
//   ─ A black curtain sweeps across from right → covers screen
//   ─ Then navigates to the next page
  
//   Usage: Drop this into your HomeSection's main content area.
//   The `onExplore` prop handles navigation (use Next.js router.push).
// */

// interface Props {
//   onExplore?: () => void; // called after exit animation completes
// }

// // Duration constants
// const EXIT_DURATION = 0.55;
// const CURTAIN_DELAY = 0.25;

// export default function HeroPageTransition({ onExplore }: Props) {
//   const [isExiting, setIsExiting] = useState(false);

//   const handleExplore = () => {
//     if (isExiting) return;
//     setIsExiting(true);
//     // Fire onExplore after curtain fully covers screen
//     setTimeout(() => {
//       onExplore?.();
//     }, (CURTAIN_DELAY + 0.5) * 1000);
//   };

//   return (
//     <>
//       {/* ── CURTAIN SWEEP (appears last, covers everything) ── */}
//       <AnimatePresence>
//         {isExiting && (
//           <motion.div
//             style={{
//               position: 'fixed',
//               inset: 0,
//               background: '#0a0908',
//               zIndex: 9998,
//               originX: 1,  // sweep from right
//             }}
//             initial={{ scaleX: 0, transformOrigin: 'right center' }}
//             animate={{ scaleX: 1, transformOrigin: 'right center' }}
//             transition={{
//               duration: 0.55,
//               delay: CURTAIN_DELAY,
//               ease: [0.76, 0, 0.24, 1],
//             }}
//           />
//         )}
//       </AnimatePresence>

//       {/* ── HERO CARD ── */}
//       <div
//         style={{
//           position: 'relative',
//           width: '100%',
//           borderRadius: 24,
//           overflow: 'hidden',
//           background: '#111',
//           minHeight: 600,
//         }}
//       >
//         {/* Background image — slides LEFT on exit */}
//         <motion.div
//           style={{ position: 'absolute', inset: 0, zIndex: 0 }}
//           animate={isExiting ? {
//             x: '-18%',
//             scale: 0.96,
//             opacity: 0.3,
//           } : { x: 0, scale: 1, opacity: 1 }}
//           transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
//         >
//           <img
//             src="/assets/banner/firstman.jpg"
//             alt="Film"
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//           {/* Gradient overlays */}
//           <div style={{
//             position: 'absolute', inset: 0,
//             background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 45%)',
//           }} />
//           <div style={{
//             position: 'absolute', inset: 0,
//             background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
//           }} />
//         </motion.div>

//         {/* Content layer */}
//         <div style={{
//           position: 'relative', zIndex: 10,
//           padding: '48px 56px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           minHeight: 600,
//         }}>

//           {/* ── LEFT COLUMN: slides LEFT on exit ── */}
//           <motion.div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               maxWidth: 420,
//             }}
//             animate={isExiting ? {
//               x: '-120px',
//               opacity: 0,
//             } : { x: 0, opacity: 1 }}
//             transition={{
//               duration: EXIT_DURATION,
//               ease: [0.76, 0, 0.24, 1],
//               delay: 0,
//             }}
//           >
//             {/* Festival badge */}
//             <div>
//               <p style={{
//                 fontFamily: "'Bebas Neue', sans-serif",
//                 fontSize: 20, letterSpacing: '0.1em',
//                 color: 'white', marginBottom: 4,
//               }}>2024</p>
//               <p style={{
//                 fontFamily: "'Courier New', monospace",
//                 fontSize: 9, letterSpacing: '0.28em',
//                 color: 'rgba(255,255,255,0.6)',
//                 textTransform: 'uppercase',
//                 lineHeight: 1.7, marginBottom: 10,
//               }}>The Cinema<br />South Film<br />Festival</p>
//               <div style={{
//                 width: 34, height: 34, borderRadius: '50%',
//                 border: '1px solid rgba(255,255,255,0.3)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <span style={{ color: 'white', fontSize: 12 }}>★</span>
//               </div>
//             </div>

//             {/* Title + info */}
//             <div style={{ marginTop: 'auto', paddingTop: 60 }}>
//               <p style={{
//                 fontFamily: "'Courier New', monospace",
//                 fontSize: 9, letterSpacing: '0.4em',
//                 color: 'rgba(255,255,255,0.5)',
//                 textTransform: 'uppercase', marginBottom: 10,
//               }}>Short Film</p>

//               <h2 style={{
//                 fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//                 fontSize: 'clamp(52px, 7vw, 82px)',
//                 color: 'white',
//                 letterSpacing: '0.06em',
//                 lineHeight: 0.9,
//                 marginBottom: 20,
//               }}>Ana Maxim</h2>

//               {/* Info table */}
//               <div style={{
//                 borderTop: '1px solid rgba(255,255,255,0.2)',
//                 borderBottom: '1px solid rgba(255,255,255,0.2)',
//                 padding: '12px 0',
//               }}>
//                 {[
//                   ['DIRECTOR', 'Yoni Handelsman'],
//                   ['YEAR', '2024'],
//                   ['CATEGORY', 'Short Film'],
//                 ].map(([label, value]) => (
//                   <div key={label} style={{
//                     display: 'flex', gap: 16,
//                     fontFamily: "'Courier New', monospace",
//                     fontSize: 10, letterSpacing: '0.2em',
//                     textTransform: 'uppercase',
//                     borderBottom: '1px dashed rgba(255,255,255,0.1)',
//                     padding: '4px 0',
//                   }}>
//                     <span style={{ color: 'rgba(255,255,255,0.35)', width: 80 }}>{label}</span>
//                     <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* ── RIGHT COLUMN ── */}
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             alignItems: 'flex-end',
//             textAlign: 'right',
//           }}>

//             {/* Reviews — slide UP on exit */}
//             <motion.div
//               style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 210 }}
//               animate={isExiting ? {
//                 y: '-60px',
//                 opacity: 0,
//               } : { y: 0, opacity: 1 }}
//               transition={{
//                 duration: EXIT_DURATION * 0.85,
//                 ease: [0.76, 0, 0.24, 1],
//                 delay: 0.05,
//               }}
//             >
//               {[
//                 { src: 'The Armenian Report', quote: '"Inspiring True Story"' },
//                 { src: 'Armenpress',          quote: '"Best Feature Film At Pomegranate Festival"' },
//                 { src: 'The Armenian Report', quote: '"Emotional And Powerful Portrayal"' },
//               ].map((r, i) => (
//                 <div key={i}>
//                   <p style={{ fontFamily: "'Courier New', monospace", fontSize: 8, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 5 }}>
//                     {r.src}
//                   </p>
//                   <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase', marginBottom: 4 }}>
//                     {r.quote}
//                   </p>
//                   <div style={{ color: '#f5c518', fontSize: 11, letterSpacing: 2 }}>★★★★★</div>
//                 </div>
//               ))}
//             </motion.div>

//             {/* ── EXPLORE BUTTON — slides DOWN on exit ── */}
//             <motion.div
//               animate={isExiting ? {
//                 y: '50px',
//                 opacity: 0,
//               } : { y: 0, opacity: 1 }}
//               transition={{
//                 duration: EXIT_DURATION * 0.8,
//                 ease: [0.76, 0, 0.24, 1],
//                 delay: 0.03,
//               }}
//             >
//               <ExploreButton onClick={handleExplore} />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── Explore button with ticket-notch style ────────────────────────────────
// function ExploreButton({ onClick }: { onClick: () => void }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <button
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'stretch',
//         background: hovered ? 'white' : 'transparent',
//         border: 'none',
//         cursor: 'pointer',
//         minHeight: 46,
//         transition: 'background 0.25s ease',
//         // Ticket notch mask
//         WebkitMaskImage: [
//           'radial-gradient(circle at 0 0,    transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 100% 0, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 0 100%, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 100% 100%, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at calc(100% - 50px) 0%,   transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at calc(100% - 50px) 100%, transparent 5.5px, #000 6px)',
//         ].join(','),
//         maskImage: [
//           'radial-gradient(circle at 0 0,    transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 100% 0, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 0 100%, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at 100% 100%, transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at calc(100% - 50px) 0%,   transparent 5.5px, #000 6px)',
//           'radial-gradient(circle at calc(100% - 50px) 100%, transparent 5.5px, #000 6px)',
//         ].join(','),
//         WebkitMaskPosition: 'top left, top right, bottom left, bottom right, top, bottom',
//         maskPosition:        'top left, top right, bottom left, bottom right, top, bottom',
//         WebkitMaskSize: '51% 51%, 51% 51%, 51% 51%, 51% 51%, 100% 51%, 100% 51%',
//         maskSize:       '51% 51%, 51% 51%, 51% 51%, 51% 51%, 100% 51%, 100% 51%',
//         WebkitMaskRepeat: 'no-repeat',
//         maskRepeat:       'no-repeat',
//         WebkitMaskComposite: 'destination-in',
//         maskComposite:       'intersect',
//       }}
//     >
//       {/* Border overlay */}
//       <div style={{
//         position: 'absolute', inset: 0,
//         border: `1.5px solid ${hovered ? 'transparent' : 'rgba(255,255,255,0.4)'}`,
//         borderRadius: 2,
//         transition: 'border-color 0.25s ease',
//         pointerEvents: 'none',
//       }} />
//       {/* Dashed vertical perforation */}
//       <div style={{
//         position: 'absolute',
//         top: 5, bottom: 5, right: 50,
//         borderLeft: `1.5px dashed ${hovered ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)'}`,
//         transition: 'border-color 0.25s ease',
//         pointerEvents: 'none',
//       }} />

//       {/* Text */}
//       <span style={{
//         padding: '11px 28px 11px 24px',
//         fontFamily: "'Courier New', monospace",
//         fontSize: 10, fontWeight: 700,
//         letterSpacing: '0.35em', textTransform: 'uppercase',
//         color: hovered ? '#0a0908' : 'white',
//         whiteSpace: 'nowrap',
//         transition: 'color 0.25s ease',
//       }}>EXPLORE</span>

//       {/* Arrow */}
//       <span style={{
//         width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
//         color: hovered ? '#0a0908' : 'white',
//         transform: hovered ? 'translateX(3px)' : 'translateX(0)',
//         transition: 'transform 0.25s ease, color 0.25s ease',
//       }}>
//         <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
//         </svg>
//       </span>
//     </button>
//   );
// }