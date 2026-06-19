export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-[4/3] bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        
        {/* Rating/Time row */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded-md w-1/4" />
          <div className="h-4 bg-gray-200 rounded-md w-1/4" />
        </div>
        
        {/* Price/Button row */}
        <div className="flex justify-between items-end pt-3">
          <div className="h-5 bg-gray-200 rounded-md w-1/3" />
          <div className="h-10 bg-gray-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}
