'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/* ─────────────────────────────────────────────────────────────────────────────
   SIENA FILM FOUNDATION — Cinematic Intro / Page Transition
   
   Animation sequence (matches video exactly):
   1. IDLE        — Black screen, cream SIENA logo centred, ENTER ticket button
   2. FADE-OUT    — Logo + button fade to pure black  (0.4s)
   3. FLASH       — Screen flashes to warm cream      (0.15s)
   4. STRIPES-IN  — 20 vertical black stripes grow from top+bottom simultaneously,
                    covering the cream bg. Logo is rendered twice (black on cream 
                    bg layer + cream on stripe layer) creating a sliced illusion.
                    Stripes ease in over 0.7s with a staggered cubic-bezier.
   5. HOLD        — Full black for a brief moment     (0.2s)
   6. STRIPES-OUT — Stripes collapse back, revealing black. Cream logo re-emerges. (0.5s)
   7. DONE        — router.push('/home') or onEnter() callback
   
   Usage:
     <IntroAnimation onEnter={() => router.push('/home')} />
   
   Or drop it at the top of your root page.tsx and it self-routes.
───────────────────────────────────────────────────────────────────────────── */

const CREAM  = '#f0ece3';
const BLACK  = '#0a0908';
const STRIPE_COUNT = 20;

/* ── Keyframe injection helper ─────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap');

  .siena-intro-root {
    position: fixed; inset: 0; z-index: 9999;
    background: ${BLACK};
    overflow: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .siena-cursor {
    position: fixed; top: 0; left: 0; pointer-events: none; z-index: 10000;
    width: 10px; height: 10px; border-radius: 50%;
    background: ${CREAM}; mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
  }
  .siena-cursor.hovering {
    width: 48px; height: 48px;
    background: transparent; border: 1.5px solid ${CREAM};
    mix-blend-mode: normal;
  }

  /* Logo letter animation on load */
  @keyframes letterDrop {
    0%   { opacity: 0; transform: translateY(-32px) scaleY(1.15); }
    60%  { opacity: 1; transform: translateY(4px)   scaleY(0.97); }
    100% { opacity: 1; transform: translateY(0)     scaleY(1); }
  }
  @keyframes subtitleReveal {
    0%   { opacity: 0; letter-spacing: 0.55em; }
    100% { opacity: 1; letter-spacing: 0.38em; }
  }
  @keyframes btnFadeUp {
    0%   { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Ticket ENTER button */
  .enter-ticket {
    display: flex; align-items: stretch;
    border: 1.5px solid rgba(240,236,227,0.5);
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.25s;
    animation: btnFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.5s both;
  }
  .enter-ticket:hover { border-color: ${CREAM}; }
  .enter-ticket:hover .ticket-label { letter-spacing: 0.45em; }
  .enter-ticket:hover .ticket-arrow { background: ${CREAM}; color: ${BLACK}; }

  .ticket-label {
    padding: 12px 28px;
    font-family: 'Courier New', monospace;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.38em; text-transform: uppercase;
    color: ${CREAM};
    transition: letter-spacing 0.3s ease;
  }
  .ticket-divider {
    width: 1.5px; background: rgba(240,236,227,0.4); 
    border-left: 1.5px dashed rgba(240,236,227,0.4);
  }
  .ticket-arrow {
    display: flex; align-items: center; justify-content: center;
    padding: 12px 18px;
    color: ${CREAM};
    transition: background 0.25s, color 0.25s;
  }

  /* Stripe bars */
  .stripe-bar {
    position: absolute; top: 0; width: calc(100% / ${STRIPE_COUNT});
    background: ${BLACK};
    transform-origin: top center;
  }

  /* Phase: stripes entering (growing from top and bottom) */
  @keyframes stripeGrowTop {
    0%   { height: 0%; }
    100% { height: 100%; }
  }
  @keyframes stripeGrowBot {
    0%   { height: 0%; bottom: 0; top: auto; }
    100% { height: 100%; bottom: 0; top: auto; }
  }
  @keyframes stripeCollapseTop {
    0%   { height: 100%; }
    100% { height: 0%; }
  }

  /* Grain overlay */
  .grain {
    position: absolute; inset: -50%; width: 200%; height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
    opacity: 0.12; pointer-events: none; mix-blend-mode: overlay;
    animation: grainShift 0.12s steps(1) infinite;
  }
  @keyframes grainShift {
    0%  { transform: translate(0,0); }
    25% { transform: translate(-2%,-3%); }
    50% { transform: translate(3%, 1%); }
    75% { transform: translate(-1%, 2%); }
  }
`;

/* ── SIENA wordmark as inline SVG ─────────────────────────────────────────── */
function SienaWordmark({ color = CREAM, size = 320 }: { color?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 260"
      width={size}
      fill={color}
      style={{ display: 'block' }}
    >
      {/* S */}
      <text
        x="20" y="220"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        fontSize="230"
        letterSpacing="-6"
      >
        SIENA
      </text>
    </svg>
  );
}

/* ── Animated letter-by-letter SIENA title ──────────────────────────────────── */
function AnimatedTitle({ color }: { color: string }) {
  const letters = ['S', 'I', 'E', 'N', 'A'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
      {letters.map((ch, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(96px, 14vw, 180px)',
            color,
            display: 'inline-block',
            animation: `letterDrop 0.65s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s both`,
            willChange: 'transform, opacity',
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */
interface IntroAnimationProps {
  /** Called when the animation fully completes. Use to route to main page. */
  onEnter?: () => void;
}

type Phase =
  | 'idle'          // black screen, logo visible, ENTER button ready
  | 'fade-out'      // logo fading out
  | 'flash'         // cream flash
  | 'stripes-in'    // black stripes grow over cream
  | 'hold'          // full black hold
  | 'stripes-out'   // stripes collapse revealing black
  | 'done';         // hand off

export default function IntroAnimation({ onEnter }: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Track mouse for custom cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  const delay = (fn: () => void, ms: number) => {
    clearTimer();
    timerRef.current = setTimeout(fn, ms);
  };

  const handleEnter = useCallback(() => {
    if (phase !== 'idle') return;

    // Phase sequence
    setPhase('fade-out');
    delay(() => {
      setPhase('flash');
      delay(() => {
        setPhase('stripes-in');
        delay(() => {
          setPhase('hold');
          delay(() => {
            setPhase('stripes-out');
            delay(() => {
              setPhase('done');
              onEnter?.();
            }, 700);
          }, 300);
        }, 900);
      }, 200);
    }, 450);
  }, [phase, onEnter]);

  useEffect(() => () => clearTimer(), []);

  if (phase === 'done') return null;

  /* ── Background color by phase ── */
  const bgColor =
    phase === 'flash' || phase === 'stripes-in' || phase === 'hold' || phase === 'stripes-out'
      ? CREAM
      : BLACK;

  /* ── Logo color by phase ── */
  const logoOnBlack = phase === 'idle' || phase === 'fade-out' || phase === 'stripes-out';
  const logoOnCream = phase === 'flash' || phase === 'stripes-in';
  const logoColor =
    phase === 'hold' ? 'transparent' :
    logoOnCream ? BLACK :
    CREAM;

  /* ── Logo + button opacity ── */
  const contentOpacity =
    phase === 'fade-out' ? 0 :
    phase === 'flash' || phase === 'stripes-in' || phase === 'hold' ? 0 :
    phase === 'stripes-out' ? 0 :
    1;

  const contentTransition =
    phase === 'fade-out' ? 'opacity 0.4s ease' :
    phase === 'stripes-out' ? 'opacity 0.5s ease 0.3s' :
    'none';

  /* ── Stripe visibility ── */
  const showStripes = phase === 'stripes-in' || phase === 'hold' || phase === 'stripes-out';
  const stripesGrowing = phase === 'stripes-in';
  const stripesShrinking = phase === 'stripes-out';

  return (
    <>
      <style>{CSS}</style>

      {/* Custom cursor */}
      <div
        className={`siena-cursor ${hovering ? 'hovering' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
      />

      <div
        className="siena-intro-root"
        style={{
          background: bgColor,
          transition:
            phase === 'flash' ? 'background 0.15s ease' :
            phase === 'hold' ? 'background 0.1s ease' :
            'background 0.3s ease',
        }}
      >
        {/* Film grain */}
        <div className="grain" />

        {/* ── STRIPE LAYER ─────────────────────────────────────────────── */}
        {showStripes && (
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 20,
              display: 'flex',
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: STRIPE_COUNT }).map((_, i) => {
              const stagger = i * 0.022;       // stagger per stripe
              const dur = 0.65;

              const growStyle: React.CSSProperties = stripesGrowing
                ? {
                    animation: `stripeGrowTop ${dur}s cubic-bezier(0.76,0,0.24,1) ${stagger}s both`,
                    height: 0,
                  }
                : stripesShrinking
                ? {
                    animation: `stripeCollapseTop ${dur * 0.75}s cubic-bezier(0.76,0,0.24,1) ${stagger * 0.5}s both`,
                    height: '100%',
                  }
                : { height: '100%' };

              return (
                <div
                  key={i}
                  style={{
                    flex: '1 1 0',
                    background: BLACK,
                    position: 'relative',
                    ...growStyle,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ── LOGO ON STRIPE LAYER (black logo shows through cream gaps) ── */}
        {(phase === 'stripes-in' || phase === 'hold') && (
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 25,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(96px, 14vw, 180px)',
              color: CREAM,
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              mixBlendMode: 'difference',
              userSelect: 'none',
            }}>
              SIENA
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT (logo + subtitle + enter button) ─────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0px',
            opacity: contentOpacity,
            transition: contentTransition,
          }}
        >
          {/* SIENA wordmark */}
          <div style={{ marginBottom: '10px' }}>
            <AnimatedTitle color={logoColor !== 'transparent' ? logoColor : CREAM} />
          </div>

          {/* FILM FOUNDATION subtitle */}
          <div
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 'clamp(10px, 1.2vw, 15px)',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: phase === 'idle' || phase === 'stripes-out' ? CREAM : logoColor,
              marginBottom: '80px',
              animation: 'subtitleReveal 1s cubic-bezier(0.22,1,0.36,1) 0.7s both',
              userSelect: 'none',
            }}
          >
            FILM&nbsp;&nbsp;FOUNDATION
          </div>

          {/* ENTER ticket button */}
          <div
            className="enter-ticket"
            onClick={handleEnter}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ cursor: 'pointer' }}
          >
            <span className="ticket-label">ENTER</span>
            <span className="ticket-divider" />
            <span className="ticket-arrow">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── FILM STRIP decoration top + bottom ── */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '8px',
            background: `repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 18px, ${BLACK} 18px, ${BLACK} 26px)`,
            zIndex: 30, opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px',
            background: `repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 18px, ${BLACK} 18px, ${BLACK} 26px)`,
            zIndex: 30, opacity: 0.7,
          }}
        />

        {/* Frame counter — cinematic detail */}
        <div
          style={{
            position: 'absolute', bottom: '20px', left: '28px',
            fontFamily: "'Courier New', monospace",
            fontSize: '9px', letterSpacing: '0.3em',
            color: 'rgba(240,236,227,0.2)',
            zIndex: 30,
          }}
        >
          SIENA FILM FOUNDATION © 2024
        </div>
        <div
          style={{
            position: 'absolute', bottom: '20px', right: '28px',
            fontFamily: "'Courier New', monospace",
            fontSize: '9px', letterSpacing: '0.2em',
            color: 'rgba(240,236,227,0.2)',
            zIndex: 30,
          }}
        >
          001 / 001
        </div>
      </div>
    </>
  );
}