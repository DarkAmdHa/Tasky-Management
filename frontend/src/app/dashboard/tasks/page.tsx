import React from "react";
import TaskCard from "@/app/ui/TaskCard";
import BackButton from "@/app/ui/BackButton";
import TasksColumn from "@/app/ui/TasksColumn";
import AllTasks from "@/app/ui/tasks/AllTasks";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard" />
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-700">Tasks</h1>
        <p className="text-gray-500">
          Define the next steps for your project and keep track of your progress
          by adding tasks.
        </p>
      </div>

      <AllTasks />
    </div>
  );
}

export default page;
