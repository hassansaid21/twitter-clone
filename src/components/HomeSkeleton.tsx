export default function HomeSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Tabs skeleton */}
      <div className="flex text-textGray border-borderGray border-b-[1px] font-bold text-center">
        <div className="flex-1 py-4">
          <div className="h-4 w-16 bg-gray-700 rounded mx-auto"></div>
        </div>
        <div className="flex-1 py-4">
          <div className="h-4 w-20 bg-gray-700 rounded mx-auto"></div>
        </div>
        <div className="hidden md:block flex-1 py-4">
          <div className="h-4 w-16 bg-gray-700 rounded mx-auto"></div>
        </div>
        <div className="hidden md:block flex-1 py-4">
          <div className="h-4 w-20 bg-gray-700 rounded mx-auto"></div>
        </div>
        <div className="hidden md:block flex-1 py-4">
          <div className="h-4 w-12 bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>

      {/* Publish skeleton */}
      <div className="border-b-[1px] border-borderGray flex p-4 gap-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
          <hr className="border-borderGray" />
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-5 h-5 bg-gray-700 rounded"></div>
              <div className="w-5 h-5 bg-gray-700 rounded"></div>
              <div className="w-5 h-5 bg-gray-700 rounded"></div>
            </div>
            <div className="w-16 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Feed skeleton - multiple posts */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b-[1px] border-borderGray p-4 flex gap-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0"></div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
              <div className="h-4 w-12 bg-gray-700 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            <div className="h-48 w-full bg-gray-700 rounded-xl mt-2"></div>
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
