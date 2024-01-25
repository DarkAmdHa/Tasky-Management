function CommentSkeleton({ count }: { count: number }) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {[...Array(count)].map((i, index) => (
        <div
          className="bg-tertiary p-4 shadow rounded  relative"
          key={`commentSkeleton-${index}`}
        >
          <div className="flex gap-2 items-center cursor-pointer w-fit">
            <div className="flex gap-4 items-center cursor-pointer p-2 transition w-1/2 pointer-events-none opacity-60   relative">
              <div className="rounded-full shadow-lg border-8 border-slate-100 overflow-hidden w-30 transition hover:shadow-xl shining">
                <div className="rounded w-[35px] h-[35px] bg-gray-200" />
              </div>
            </div>
            <div className="text-black text-xs flex gap-2 items-center justify-center">
              <div className="w-20 h-4 bg-gray-200 shining" />
              <div className="w-32 h-4  bg-gray-200 shining" />
            </div>
          </div>
          <div className="mt-2 w-full h-4 bg-gray-200 shining" />
          <div className="mt-2 w-full w-20 h-4 bg-gray-200 shining" />
          <div className="mt-2 w-full w-20 h-4 bg-gray-200 shining" />
        </div>
      ))}
    </div>
  );
}

export default CommentSkeleton;
