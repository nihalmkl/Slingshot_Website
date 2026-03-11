// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from "framer-motion"
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// // ─── Animated line that draws itself ─────────────────────────────────────────
// function DrawLine({ delay = 0, dashed = false, className = '' }: { delay?: number; dashed?: boolean; className?: string; }) {
//   return (
//     <div className={`absolute left-0 right-0 h-[1.5px] ${className}`} style={{ overflow: 'hidden' }}>
//       <div
//         style={{
//           height: '100%',
//           background: dashed
//             ? 'repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 6px, transparent 6px, transparent 12px)'
//             : 'rgba(0,0,0,0.15)',
//           transformOrigin: 'left center',
//           animation: `drawLine 0.55s cubic-bezier(0.76,0,0.24,1) ${delay}s both`,
//         }}
//       />
//     </div>
//   );
// }

// // ─── Clip-reveal text item ────────────────────────────────────────────────────
// function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number; }) {
//   return (
//     <div style={{ overflow: 'hidden' }}>
//       <div style={{ animation: `slideUpReveal 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// // ─── Fade item ────────────────────────────────────────────────────────────────
// function FadeItem({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string; }) {
//   return (
//     <div className={className} style={{ animation: `fadeIn 0.5s ease ${delay}s both` }}>
//       {children}
//     </div>
//   );
// }

// export default function MenuDropdown({ isOpen, onClose }: Props) {
//   const [mounted, setMounted] = useState(false);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setMounted(true);
//       requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
//     } else {
//       setVisible(false);
//       const t = setTimeout(() => setMounted(false), 500);
//       return () => clearTimeout(t);
//     }
//   }, [isOpen]);

//   if (!mounted) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes drawLine {
//           from { transform: scaleX(0); }
//           to   { transform: scaleX(1); }
//         }
//         @keyframes slideUpReveal {
//           from { transform: translateY(110%); opacity: 0; }
//           to   { transform: translateY(0);    opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes popIn {
//           0%   { transform: scale(0); opacity: 0; }
//           60%  { transform: scale(1.3); }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes panelReveal {
//           from { clip-path: inset(0 0 100% 0); }
//           to   { clip-path: inset(0 0 0 0); }
//         }
//         @keyframes panelHide {
//           from { clip-path: inset(0 0 0 0); }
//           to   { clip-path: inset(0 0 100% 0); }
//         }
//       `}</style>

//       <div
//         className="absolute top-0 right-0 z-40 flex drop-shadow-2xl"
//         style={{
//           animation: visible
//             ? 'panelReveal 0.5s cubic-bezier(0.76,0,0.24,1) both'
//             : 'panelHide 0.4s cubic-bezier(0.76,0,0.24,1) both',
//           transformOrigin: 'top right',
//         }}
//       >
//         {/* ── MAIN DROPDOWN BODY (Left Side) ── */}
//         <div
//           className="bg-[#fcfaf5] text-black flex flex-col w-[250px] md:w-[280px]"
//           style={{
//              WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 12px, black 12.5px), radial-gradient(circle at 100% 0, transparent 12px, black 12.5px), radial-gradient(circle at 0 100%, transparent 12px, black 12.5px), radial-gradient(circle at 100% 100%, transparent 12px, black 12.5px)',
//              maskImage: 'radial-gradient(circle at 0 0, transparent 12px, black 12.5px), radial-gradient(circle at 100% 0, transparent 12px, black 12.5px), radial-gradient(circle at 0 100%, transparent 12px, black 12.5px), radial-gradient(circle at 100% 100%, transparent 12px, black 12.5px)',
//              WebkitMaskPosition: 'top left, top right, bottom left, bottom right',
//              maskPosition: 'top left, top right, bottom left, bottom right',
//              WebkitMaskSize: '51% 51%',
//              maskSize: '51% 51%',
//              WebkitMaskRepeat: 'no-repeat',
//              maskRepeat: 'no-repeat',
//           }}
//         >
//           {/* Top Empty Space to align with original header */}
//           <div className="h-[64px]"></div>
          
//           <div className="relative h-px mx-0"><DrawLine delay={0.08} dashed /></div>

//           {/* Nav Links */}
//           <div className="px-8 py-8 flex flex-col gap-1">
//             {[
//               { num: '01', label: 'WORK',    href: '#', delay: 0.18 },
//               { num: '02', label: 'ABOUT',   href: '#', delay: 0.26 },
//               { num: '03', label: 'CONTACT', href: '#', delay: 0.34 },
//             ].map(({ num, label, href, delay }) => (
//               <RevealItem key={label} delay={delay}>
//                 <Link href={href} className="flex items-baseline gap-4 group py-1" onClick={onClose}>
//                   <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors" style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em' }}>
//                     {num}
//                   </span>
//                   <span className="group-hover:underline transition-all" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}>
//                     {label}
//                   </span>
//                 </Link>
//               </RevealItem>
//             ))}
//           </div>

//           <div className="relative h-px mx-0"><DrawLine delay={0.42} dashed /></div>

//           {/* Footer Links */}
//           <FadeItem delay={0.52} className="px-8 py-5 flex gap-8">
//             {['COOKIE', 'TERMS', 'PRIVACY'].map((item) => (
//               <Link key={item} href="#" className="hover:text-black transition-colors" style={{ fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888' }}>
//                 {item}
//               </Link>
//             ))}
//           </FadeItem>

//           <div className="relative h-px"><DrawLine delay={0.55} dashed /></div>

//           {/* Social Icons */}
//           <FadeItem delay={0.62} className="px-8 py-5 flex gap-5 text-black">
//             <Link href="#" aria-label="Instagram" className="hover:opacity-60 transition-opacity">
//               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
//             </Link>
//             <Link href="#" aria-label="Facebook" className="hover:opacity-60 transition-opacity">
//               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
//             </Link>
//             <Link href="#" aria-label="LinkedIn" className="hover:opacity-60 transition-opacity">
//               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
//             </Link>
//           </FadeItem>

//           <div className="relative h-px"><DrawLine delay={0.62} dashed /></div>

//           {/* Copyright */}
//           <FadeItem delay={0.7} className="px-8 py-5">
//             <p className="text-gray-400 font-semibold" style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.1em' }}>
//               ©2024. SIENA FILM FOUNDATION.
//             </p>
//           </FadeItem>
//         </div>

//         {/* ── DROPDOWN STUB (Right Side with the X) ── */}
//         <div
//           className="bg-[#fcfaf5] text-black w-20 md:w-24 border-l border-dashed border-gray-400 flex items-start justify-center cursor-pointer hover:bg-[#f0eee9] transition-colors -ml-[1px]"
//           onClick={onClose}
//           style={{
//              WebkitMaskImage: 'radial-gradient(circle at top right, transparent 12px, black 12.5px), radial-gradient(circle at bottom right, transparent 12px, black 12.5px)',
//              maskImage: 'radial-gradient(circle at top right, transparent 12px, black 12.5px), radial-gradient(circle at bottom right, transparent 12px, black 12.5px)',
//              WebkitMaskPosition: 'top right, bottom right',
//              maskPosition: 'top right, bottom right',
//              WebkitMaskSize: '100% 51%',
//              maskSize: '100% 51%',
//              WebkitMaskRepeat: 'no-repeat',
//              maskRepeat: 'no-repeat',
//           }}
//         >
//           {/* Close 'X' Button - Positioned to match the height of the original hamburger */}
//           <div className="h-[64px] flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-black"
//               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
//               style={{ animation: 'spinIn 0.3s cubic-bezier(0.22,1,0.36,1) both 0.2s' }}
//             >
//               <style>{`@keyframes spinIn { from { transform: rotate(-90deg); opacity:0; } to { transform: rotate(0); opacity:1; } }`}</style>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
          
//           <div className="absolute top-[64px] left-0 right-0 h-px"><DrawLine delay={0.08} dashed /></div>
//         </div>

//         {/* ── Center hole punch dot (on seam) ── */}
//         <div
//           className="absolute top-[64px] right-20 md:right-24 z-50 pointer-events-none"
//           style={{
//             width: 24, height: 24, borderRadius: '50%', background: '#0a0a0a',
//             transform: 'translate(50%, -50%)',
//             animation: visible ? `popIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s both` : 'none',
//           }}
//         />
        
//         {/* Bottom Seam Hole punch */}
//         <div
//           className="absolute bottom-0 right-20 md:right-24 z-50 pointer-events-none"
//           style={{
//             width: 24, height: 24, borderRadius: '50%', background: '#0a0a0a',
//             transform: 'translate(50%, 50%)',
//             animation: visible ? `popIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.38s both` : 'none',
//           }}
//         />
//       </div>
//     </>
//   );
// }