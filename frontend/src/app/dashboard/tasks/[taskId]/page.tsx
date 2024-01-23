import React from "react";
import BackButton from "@/app/ui/BackButton";
import Comment from "@/app/ui/Comment";
import CommentInput from "@/app/ui/CommentInput";
import Task from "@/app/ui/tasks/Task";

function page({ params }: { params: { taskId: number } }) {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard" />
      </div>
      <Task id={params.taskId} />
    </div>
  );
}

export default page;
