import React from "react";
import { ProjectWithTasks } from "../lib/definitions";
import TaskCard from "./TaskCard";
import Link from "next/link";

function TasksColumn({ project }: { project: ProjectWithTasks }) {
  return (
    <div className="flex border border-gray rounded p-4 min-w-[340px] shadow max-h-[400px] overflow-auto">
      <div className="flex flex-col gap-4 w-full">
        <Link href={`/dashboard/projects/${project.id}`}>
          <p className="text-xl font-semibold">{project.projectName} Tasks</p>
        </Link>
        <div className="flex flex-col gap-4">
          {project.tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TasksColumn;
