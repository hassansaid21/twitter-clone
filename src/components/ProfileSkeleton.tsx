export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-8 sticky top-0 h-max bg-black/60 backdrop-blur-md p-2 z-10">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-5 w-32 bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="relative w-full">
        <div className="w-full aspect-[3/1] bg-gray-700"></div>
        <div className="border-[4px] border-black rounded-full overflow-hidden absolute translate-y-[-50%] left-2 md:left-4">
          <div className="w-[140px] h-[140px] bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Follow button skeleton */}
      <div className="flex justify-end px-6 py-4">
        <div className="w-24 h-10 bg-gray-700 rounded-full"></div>
      </div>

      {/* Profile info skeleton */}
      <div className="px-4 py-2 flex flex-col border-b-[1px] border-borderGray gap-4">
        <div>
          <div className="h-8 w-40 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-28 bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-8">
          <div className="h-4 w-28 bg-gray-700 rounded"></div>
          <div className="h-4 w-28 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Feed skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b-[1px] border-borderGray p-4 flex gap-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0"></div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            <div className="flex justify-between mt-2">
              <div className="w-12 h-4 bg-gray-700 rounded"></div>
              <div className="w-12 h-4 bg-gray-700 rounded"></div>
              <div className="w-12 h-4 bg-gray-700 rounded"></div>
              <div className="w-12 h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
