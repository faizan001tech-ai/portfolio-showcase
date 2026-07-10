export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-6 animate-pulse">
            <div className="h-40 bg-white/5 rounded-xl mb-4" />
            <div className="h-4 bg-white/5 rounded w-3/4 mb-3" />
            <div className="h-3 bg-white/5 rounded w-full mb-2" />
            <div className="h-3 bg-white/5 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 animate-pulse">
          <div className="h-4 bg-white/5 rounded w-1/2 mb-2" />
          <div className="h-3 bg-white/5 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
