"use client";
import TaskCardSkeleton from "../TaskCardSkeleton";

function TeamSkeleton() {
  return (
    <div>
      <div className="w-6/12 h-6 mb-2 bg-gray-200 shining" />
      <div className="w-9/12 h-6 bg-gray-200 shining" />

      <div className="flex flex-col gap-5">
        <div className="flex gap-0 max-w-full py-10 overflow-hidden">
          {[...Array(3)].map((i: unknown) => (
            <div
              key={`${i}-skeleton`}
              className="flex border border-gray rounded basis-1/3 shrink-0 shadow max-h-[400px] overflow-auto flex-col"
            >
              <div className="p-5 shadow">
                <div className="w-full h-4 bg-gray-200 shining " />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 p-4">
                  <TaskCardSkeleton count={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamSkeleton;
