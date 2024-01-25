import React from "react";

function CommentFormSkeleton() {
  return (
    <div className="flex pt-4 gap-2 items-start justify-center">
      <div className="rounded-full shadow-lg border-8 border-slate-100 overflow-hidden w-30 transition hover:shadow-xl shining">
        <div className="rounded w-[35px] h-[35px] bg-gray-200" />
      </div>

      <div className="relative w-full">
        <div className="w-full w-full h-40 bg-gray-200 shining" />
        <div className="bg-white w-full flex justify-end">
          <div className="bottom-4 right-4 p-2  w-full w-4 bg-gray-200 shining" />
        </div>
      </div>
    </div>
  );
}

export default CommentFormSkeleton;
