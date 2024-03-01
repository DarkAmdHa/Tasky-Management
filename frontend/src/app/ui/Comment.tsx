import React from "react";
import { Comment } from "../../lib/definitions";
import Image from "next/image";
import ProfilePicture from "./ProfilePicture";
function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="bg-tertiary p-4 shadow rounded  relative">
      <div className="flex gap-2 items-center cursor-pointer w-fit">
        <ProfilePicture imgSrc={comment.user.avatar_src ?? ""} size={35} border={2} />
        
        <div className="text-black text-xs flex gap-2 items-center justify-center">
          <div className="font-semibold ">{comment.user_id}</div>
          <div className="text-gray-400 ">{comment.created_at}</div>
        </div>
      </div>
      <div className="mt-2">{comment.description}</div>
      {comment.created_at != comment.updated_at && (
        <div className="absolute top-2 right-2 italic text-sm text-gray-400">
          Edited: {comment.updated_at}
        </div>
      )}
    </div>
  );
}

export default Comment;
