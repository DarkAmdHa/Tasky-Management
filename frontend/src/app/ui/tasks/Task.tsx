"use client";
import { useEffect, useState } from "react";
import TaskSkeleton from "./TaskSkeleton";
import { getTask } from "@/lib/functions";
import CommentInput from "../CommentInput";
import Comment from "../Comment";
function Task({ id }: { id: number }) {
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingTask = async (id: number) => {
    setIsLoading(true);
    try {
      const { task } = await getTask(id);
      debugger;
      setTask(task);
    } catch (e) {
      //TODO: Handle Error
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleLoadingTask(id);
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <TaskSkeleton />
      ) : task ? (
        <>
          <h1 className="text-3xl font-bold text-gray-700  mb-4">
            {task.name}
          </h1>
          <div>{task.description}</div>
          <div>{task.status}</div>
          <div className="flex flex-col gap-1 mt-2">
            <h1 className="text-xl font-semibold text-gray-700">Comments</h1>
            <div className="flex flex-col gap-4">
              {!task.comments?.length ? (
                <p className="font-semibold italic text-gray-500">
                  No Comments.
                </p>
              ) : (
                task.comments.map((comment) => (
                  <Comment key={comment.userId} comment={comment} />
                ))
              )}
            </div>
            <CommentInput taskId={id} setTask={setTask} task={task} />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-red-500 font-bold text-xl text-center">
            404: No Task Found
          </p>
        </div>
      )}
    </div>
  );
}

export default Task;
