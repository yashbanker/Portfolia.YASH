export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_100%)]" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-float" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
}