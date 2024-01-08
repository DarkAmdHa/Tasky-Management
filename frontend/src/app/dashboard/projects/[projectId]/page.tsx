import React from "react";
import BackButton from "@/app/ui/BackButton";
import TaskCard from "@/app/ui/TaskCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
function page({ params }: { params: { projectId: string } }) {
  const project = {
    id: 2,
    projectName: "Build Personal Website",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
    percentageCompleted: 0.5,
    tasks: [
      {
        id: 0,
        name: "Init Project",
        status: "ongoing",
      },
      {
        id: 1,
        name: "Design About Page",
        status: "ongoing",
      },
      {
        id: 2,
        name: "Prototype Design",
        status: "done",
      },
    ],
  };

  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard" />
      </div>
      <h1 className="text-3xl font-bold text-gray-700  mb-4">
        {project.projectName}
      </h1>
      <div>{project.projectDescription}</div>
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="text-xl font-semibold text-gray-700">Tasks</h1>
        <div className="flex flex-col gap-4">
          {!project.tasks.length ? (
            <p className="font-semibold italic text-gray-500">
              No Tasks Added.
            </p>
          ) : (
            project.tasks.map((task) => <TaskCard task={task} key={task.id} />)
          )}
        </div>

        <Link
          className="mt-4"
          href={`/dashboard/projects/${params.projectId}/create-task`}
        >
          <button className="bg-primary text-white font-semibold py-2 text-sm shadow transition hover:shadow-lg min-w-[150px] w-fit px-4 rounded-lg flex gap-2 items-center">
            <PlusCircleIcon width={25} />
            <p className="text-lg">Add Task</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
