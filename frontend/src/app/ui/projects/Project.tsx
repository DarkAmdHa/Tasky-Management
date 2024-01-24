"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/app/ui/TaskCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getProjectWithTasks } from "@/lib/functions";
import ProjectSkeleton from "./ProjectSkeleton";
function Project({ id }: { id: number }) {
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingProject = async (id: number) => {
    setIsLoading(true);
    try {
      const { project } = await getProjectWithTasks(id);
      setProject(project);
    } catch (e) {
      //TODO: Handle Error
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleLoadingProject(id);
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <ProjectSkeleton />
      ) : project ? (
        <>
          <h1 className="text-3xl font-bold text-gray-700  mb-4">
            {project.name}
          </h1>
          <div>{project.description}</div>
          <div className="flex flex-col gap-2 mt-2">
            <h1 className="text-xl font-semibold text-gray-700">Tasks</h1>
            <div className="flex flex-col gap-4">
              {!project.tasks.length ? (
                <p className="font-semibold italic text-gray-500">
                  No Tasks Added.
                </p>
              ) : (
                project.tasks.map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))
              )}
            </div>

            <Link
              className="mt-4"
              href={`/dashboard/projects/${project.id}/create-task`}
            >
              <button className="bg-primary text-white font-semibold py-2 text-sm shadow transition hover:shadow-lg min-w-[150px] w-fit px-4 rounded-lg flex gap-2 items-center">
                <PlusCircleIcon width={25} />
                <p className="text-lg">Add Task</p>
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-red-500 font-bold text-xl text-center">
            404: No Project Found
          </p>
        </div>
      )}
    </div>
  );
}

export default Project;
