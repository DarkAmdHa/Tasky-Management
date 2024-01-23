import React from "react";
import TaskCardSkeleton from "../TaskCardSkeleton";

function ProjectSkeleton() {
  return (
    <div className="shining flex flex-col gap-2">
      <div className="w-52 h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-20 h-4 bg-gray-200"></div>
      <TaskCardSkeleton count={3} />
    </div>
  );
}

export default ProjectSkeleton;
