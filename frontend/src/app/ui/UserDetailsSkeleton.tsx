function UserDetailsSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="flex gap-4 items-center cursor-pointer p-2 transition w-1/2 pointer-events-none opacity-60   relative">
        <div className="rounded-full shadow-lg border-8 border-slate-100 overflow-hidden w-30 transition hover:shadow-xl shining">
          <div className="rounded w-[100px] h-[100px] bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="w-20 h-4 bg-gray-200 shining" />
        <div className="w-32 h-4  bg-gray-200 shining" />
      </div>
    </>
  );
}

export default UserDetailsSkeleton;
