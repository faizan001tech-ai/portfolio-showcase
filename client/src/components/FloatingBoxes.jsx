export default function FloatingBoxes() {
  const boxes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {boxes.map((b) => (
        <div
          key={b.id}
          className="absolute border border-white/[0.08] rounded-lg animate-float bg-white/[0.02]"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 grid-bg opacity-50" />
    </div>
  );
}
