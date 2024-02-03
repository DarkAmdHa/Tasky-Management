import { Task } from "@/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";

function TasksSearchResult({ tasks }: { tasks: Task[] }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="tasks">
      <p className="font-semi text-lg border-b border-gray-200 border-width-1 py-2 px-4 ">
        Tasks
      </p>
      <div className="flex flex-col">
        {tasks?.length ? (
          <>
            {tasks.slice(0, 3).map((task) => (
              <Link
                key={`task-${task.id}`}
                href={`/dashboard/tasks/${task.id}`}
                className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary"
              >
                {task.name}
              </Link>
            ))}
            {tasks.length > 3 && (
              <div className="flex flex-col-reverse">
                <input
                  type="checkbox"
                  checked={showMore}
                  id="showMoreTasks"
                  className="hidden"
                  onChange={(e) => setShowMore((prevState) => !prevState)}
                />
                <label
                  htmlFor="showMoreTasks"
                  className="cursor-pointer text-primary p-2 px-4 w-fit hover:underline"
                >
                  Show {showMore ? "Less" : "More"}
                </label>

                {showMore &&
                  tasks.slice(3).map((task, index) => (
                    <Link
                      key={`task-${task.id}-${index}`}
                      href={`/dashboard/tasks/${task.id}`}
                      className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary showMoreTasks"
                    >
                      {task.name}
                    </Link>
                  ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center">No Tasks Found</p>
        )}
      </div>
    </div>
  );
}

export default TasksSearchResult;
