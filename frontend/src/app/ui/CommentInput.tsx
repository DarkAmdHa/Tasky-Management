"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { createComment } from "@/lib/functions";

function CommentInput({
  taskId,
  setTask,
  task,
}: {
  taskId: number;
  setTask: Dispatch<SetStateAction<undefined>>;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentValue != "") {
      try {
        const submittedComment = await createComment(taskId, commentValue);
        debugger;
        setTask((prev) => {
          if (prev.comments) {
            prev.comments.push(submittedComment);
          } else {
            prev.comments = [];
            prev.comments.push(submittedComment);
          }
          return prev;
        });
      } catch (error) {
        //TODO: Handle Error
        console.log(error);
      }
    } else {
      //TODO: Handle Empty comments
      alert("Comment can not be empty");
    }
  };
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
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            id="comment"
            className="border border-gray-300 w-full p-2 transition outline-none focus:shadow resize-none"
            rows={isClicked ? 6 : 2}
            placeholder="Add a comment"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onFocus={(e) => setIsClicked(true)}
            onBlur={(e) => commentValue == "" && setIsClicked(false)}
          />
          <div className="bg-white w-full flex justify-end">
            <button
              className="bottom-4 right-4 bg-primary font-semibold p-2 disabled:opacity-30 disabled:pointer-events-none text-white rounded-lg transition hover:bg-primaryDarker"
              disabled={commentValue != "" ? false : true}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentInput;
