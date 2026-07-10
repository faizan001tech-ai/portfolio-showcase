import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Store mouse positions history for trailing dots
    const history = [];
    const HISTORY_SIZE = 30;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Push position to history
      history.unshift({ x: mouseX, y: mouseY });
      if (history.length > HISTORY_SIZE) history.pop();
    };

    const animate = () => {
      // Smooth outer ring follow
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      outer.style.left = `${cursorX}px`;
      outer.style.top = `${cursorY}px`;

      // Three dots in one line behind cursor (trail effect)
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const historyIndex = (i + 1) * 6; // Spread dots evenly in history
        const point = history[historyIndex] || history[history.length - 1] || { x: mouseX, y: mouseY };
        dot.style.left = `${point.x}px`;
        dot.style.top = `${point.y}px`;
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', move);
    const rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ring cursor */}
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[9999] hidden md:flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25"
        style={{ transition: 'width 0.2s, height 0.2s' }}
      />

      {/* Three trailing dots in a line */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          className="fixed pointer-events-none z-[9999] hidden md:block w-[6px] h-[6px] rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: 1 - i * 0.3,
            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          }}
        />
      ))}
    </>
  );
}
