function UploadItemSkeleton({ count }: { count: number }) {
  return (
    <>
      {[...Array(count)].map((item: number) => (
        <div
          className="flex gap-4 items-center cursor-pointer p-2 transition w-1/2 pointer-events-none opacity-60  shining"
          key={item}
        >
          <div className="rounded-2xl overflow-hidden w-3/12 w-16 h-16 bg-gray-200" />
          <div className="w-9/12 flex flex-col gap-2">
            <div className="w-20 h-4 bg-gray-200" />
            <div className="w-32 h-4  bg-gray-200" />
          </div>
        </div>
      ))}
    </>
  );
} 

export default UploadItemSkeleton;
