"use client";

import React, { useState } from "react";
import Image from "next/image";

function CommentInput() {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <div className="flex pt-4 gap-2 items-start justify-center">
      <Image
        src="https://picsum.photos/100"
        width={35}
        height={35}
        className="rounded-full overflow-hidden max-w-md border-2  border-slate-600 cursor-pointer"
        alt=""
      />

      <div className="relative w-full">
        <textarea
          name="comment"
          id="comment"
          className="border border-gray-300 w-full p-2 transition outline-none focus:shadow resize-none"
          rows={6}
          placeholder="Add a comment"
        />
        <div className="bg-white w-full flex justify-end">
          <button className="bottom-4 right-4 bg-primary font-semibold p-2 text-white rounded-lg transition hover:bg-primaryDarker">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
