'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'view' | 'navHover' | 'click' | 'text' | 'hidden' | 'drag';

export default function CustomScroll() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  const mouse  = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const rafId  = useRef<number>(0);

  const [state, setState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  /* ── rAF smooth follow ────────────────────────────────────────────────── */
  useEffect(() => {
    const LERP = 0.10;

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * LERP;
      smooth.current.y += (mouse.current.y - smooth.current.y) * LERP;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${smooth.current.x}px, ${smooth.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  /* ── Mouse event listeners ────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onDown = () => setState(s => s === 'text' ? 'text' : 'click');
    const onUp   = () => setState(s => (s === 'text' || s === 'drag') ? s : 'default');

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;

      const tag  = el.tagName.toLowerCase();
      const role = el.getAttribute('role');
      const isInput = tag === 'input' || tag === 'textarea';

      const isLink =
        tag === 'a' || tag === 'button' ||
        role === 'button' || role === 'link' ||
        el.closest('a') !== null ||
        el.closest('button') !== null ||
        el.style.cursor === 'pointer' ||
        getComputedStyle(el).cursor === 'pointer';

      const isNav = el.closest('header') !== null;

      if (isInput) {
        setState('text');
      } else if (isLink && isNav) {
        setState('navHover');
      } else if (isLink) {
        setState('view');
      } else {
        setState(s => s === 'drag' ? 'drag' : 'default');
      }
    };

    const onDragScroll = (e: Event) => {
      const custom = e as CustomEvent;
      setState(custom.detail.dragging ? 'drag' : 'default');
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseover',  onOver);
    window.addEventListener('dragScroll',   onDragScroll);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseover',  onOver);
      window.removeEventListener('dragScroll',   onDragScroll);
    };
  }, [isVisible]);

  /* ── Derived values ───────────────────────────────────────────────────── */
  const RING_SIZE = {
    default:  88,
    view:     60,
    navHover: 36,
    click:    88,
    text:     4,
    drag:     88,
    hidden:   88,
  }[state];

  const IS_DRAGGING_OR_CLICKING = state === 'drag' || state === 'click';
  const WRAPPER_SIZE = IS_DRAGGING_OR_CLICKING ? 140 : RING_SIZE;

  const OPACITY = {
    default:  isVisible ? 1 : 0,
    view:     isVisible ? 1 : 0,
    navHover: isVisible ? 1 : 0,
    click:    isVisible ? 1 : 0,
    text:     isVisible ? 0.7 : 0,
    drag:     isVisible ? 1 : 0,
    hidden:   0,
  }[state];

  const SHOW_TEXT = state === 'default'; 

  const BORDER_COLOR =
    state === 'view'     ? 'rgba(10,10,10,0.7)' :
    state === 'navHover' ? 'rgba(255,255,255,0.9)' :
    IS_DRAGGING_OR_CLICKING ? 'rgba(255,255,255,0.65)' :
                           'rgba(255,255,255,0.55)';

  const TEXT_COLOR =
    state === 'view' ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)';

  const BG_COLOR =
    state === 'view' ? 'rgba(240,230,210,0.12)' : 'transparent';

  const BLEND_MODE: React.CSSProperties['mixBlendMode'] =
    state === 'navHover' ? 'difference' : 'normal';

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes cursorPop {
          0%   { transform: scale(1);    }
          40%  { transform: scale(0.88); }
          100% { transform: scale(1);    }
        }
        @keyframes chevronLeft {
          0%, 100% { transform: translateX(0px); opacity: 0.5; }
          50%      { transform: translateX(-4px); opacity: 1;  }
        }
        @keyframes chevronRight {
          0%, 100% { transform: translateX(0px); opacity: 0.5; }
          50%      { transform: translateX(4px); opacity: 1;   }
        }
      `}</style>

      {/* ── OUTER WRAPPER ── */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          zIndex:         9999,
          pointerEvents:  'none',
          marginLeft:     -WRAPPER_SIZE / 2,
          marginTop:      -WRAPPER_SIZE / 2,
          width:          WRAPPER_SIZE,
          height:         WRAPPER_SIZE,
          overflow:       'visible',
          opacity:        OPACITY,
          mixBlendMode:   BLEND_MODE,
          transition:     'opacity 0.3s ease, margin 0.35s cubic-bezier(0.22,1,0.36,1)',
          willChange:     'transform',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        
        {/* ── LEFT CHEVRON ── */}
        {IS_DRAGGING_OR_CLICKING && (
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', animation: 'chevronLeft 1s ease-in-out infinite', lineHeight: 1 }}>
             <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="rgba(255,255,255,0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* ── THE RING ITSELF ── */}
        <div
          style={{
            position:       'relative',
            width:          RING_SIZE,
            height:         RING_SIZE,
            borderRadius:   '50%',
            border:         `1.5px solid ${BORDER_COLOR}`,
            background:     BG_COLOR,
            flexShrink:     0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            transition: [
              'width 0.35s cubic-bezier(0.22,1,0.36,1)',
              'height 0.35s cubic-bezier(0.22,1,0.36,1)',
              'border-color 0.25s ease',
              'background 0.25s ease',
            ].join(', '),
            animation: state === 'click' ? 'cursorPop 0.3s ease' : 'none',
          }}
        >
          {SHOW_TEXT && (
            <svg viewBox="0 0 88 88" width="88" height="88" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'rotateSlow 8s linear infinite', opacity: 0.9 }}>
              <defs><path id="textCircle" d="M 44,44 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" /></defs>
              <text style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.32em', fill: TEXT_COLOR }}>
                <textPath href="#textCircle" startOffset="0%">SCROLL</textPath>
              </text>
            </svg>
          )}

          <div style={{
            width:        state === 'text' ? 2 : 3,
            height:       state === 'text' ? 12 : 3,
            borderRadius: state === 'text' ? '1px' : '50%',
            background:   state === 'view' ? 'rgba(10,10,10,0.7)' : IS_DRAGGING_OR_CLICKING ? 'transparent' : 'rgba(255,255,255,0.8)',
            transition:   'all 0.25s ease',
          }} />
        </div>

        {/* ── RIGHT CHEVRON ── */}
        {IS_DRAGGING_OR_CLICKING && (
          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', animation: 'chevronRight 1s ease-in-out infinite', lineHeight: 1 }}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="rgba(255,255,255,0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

      </div>

      {/* ── Inner precise dot ────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          zIndex:        10000,
          pointerEvents: 'none',
          marginLeft:    -3,
          marginTop:     -3,
          width:         6,
          height:        6,
          borderRadius:  '50%',
          background:    state === 'view' ? 'rgba(10,10,10,0.6)' : 'rgba(255,255,255,0.9)',
          opacity:       isVisible && state !== 'text' && !IS_DRAGGING_OR_CLICKING ? 1 : 0,
          mixBlendMode:  BLEND_MODE,
          transition:    'opacity 0.2s ease, background 0.2s ease',
          willChange:    'transform',
        }}
      />
    </>
  );
}