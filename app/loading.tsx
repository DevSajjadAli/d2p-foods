export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      style={{ background: '#F7F3EA' }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-ash border-t-ember animate-spin"
          style={{ borderTopColor: '#D62828', borderColor: '#E7E1D3' }}
          aria-hidden="true"
        />
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
