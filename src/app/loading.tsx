export default function Loading() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24">
      <span className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/30 font-latin text-2xl text-gold">
        K
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/20" />
      </span>
      <div className="h-px w-40 overflow-hidden bg-sand/15">
        <div className="sheen relative h-full w-1/2 bg-gold" />
      </div>
      <p className="text-[0.68rem] tracking-[0.3em] text-cream/35">در حال آماده‌سازی آتلیه…</p>
    </div>
  );
}
