import React from "react";
import { Comment } from "../../lib/definitions";
import Image from "next/image";
function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="bg-tertiary p-4 shadow rounded  relative">
      <div className="flex gap-2 items-center cursor-pointer w-fit">
        <Image
          src="https://picsum.photos/100"
          width={35}
          height={35}
          className="rounded-full overflow-hidden max-w-md border-2  border-slate-600"
          alt=""
        />
        <div className="text-black text-xs flex gap-2 items-center justify-center">
          <div className="font-semibold ">{comment.userName}</div>
          <div className="text-gray-400 ">{comment.date}</div>
        </div>
      </div>
      <div className="mt-2">{comment.comment}</div>
      {comment.isEdited && (
        <div className="absolute top-2 right-2 italic text-sm text-gray-400">
          Edited
        </div>
      )}
    </div>
  );
}

export default Comment;
