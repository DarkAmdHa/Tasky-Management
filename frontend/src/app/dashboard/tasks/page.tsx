import React from "react";
import TaskCard from "@/app/ui/TaskCard";
import BackButton from "@/app/ui/BackButton";

function page() {
  const tasks = [
    {
      id: 1,
      name: "Init Project",
      status: "ongoing",
      projectId: 1,
    },
    {
      id: 2,
      name: "Design About Page",
      status: "ongoing",
      projectId: 2,
    },
    {
      id: 3,
      name: "Prototype Design",
      status: "done",
      projectId: 3,
    },
  ];
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard/projects" />
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-700">Tasks</h1>
        <p className="text-gray-500">
          Define the next steps for your project and keep track of your progress
          by adding tasks.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.name} excerptLength={200} />
        ))}
      </div>
    </div>
  );
}

export default page;
