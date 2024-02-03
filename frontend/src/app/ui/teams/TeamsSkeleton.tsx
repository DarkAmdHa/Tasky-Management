import React from "react";

function TeamsSkeleton({ count }: { count: number }) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {[...Array(count)].map((i, index) => (
        <div
          className="bg-tertiary p-4 shadow rounded  relative"
          key={`teamSkeleton-${index}`}
        >
          <div className="flex gap-2 items-center cursor-pointer w-fit">
            <div className="text-black text-xs flex gap-2 items-center justify-center">
              <div className="w-20 h-4 bg-gray-200 shining" />
              <div className="w-32 h-4  bg-gray-200 shining" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamsSkeleton;
