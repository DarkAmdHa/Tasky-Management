"use client";
import { CheckCircleIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Task } from "../lib/definitions";
import { taskUpdate } from "../lib/functions";

function TaskCard({
  task,
  excerptLength,
}: {
  task: Task;
  excerptLength?: number;
}) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link href={`/dashboard/tasks/${task.id}`}>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={clsx(
          "bg-tertiary flex items-center gap-4 text-semibold rounded-xl shadow p-4 text-gray-500 transition hover:shadow-lg",
          {
            "line-through": task.status === "done",
          }
        )}
      >
        <CheckCircleIcon
          width={35}
          className="mr-2 cursor-pointer text-gray-500 hover:text-primary"
          onClick={async (e) => {
            e.preventDefault();
            await taskUpdate(task.id, task.status);
            task.status = task.status === "done" ? "ongoing" : "done";
          }}
        />
        <p className="mr-auto">{task.name}</p>
      </div>
    </Link>
  );
}

export default TaskCard;
