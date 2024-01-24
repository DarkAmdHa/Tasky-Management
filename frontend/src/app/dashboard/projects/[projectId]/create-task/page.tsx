import React from "react";
import BackButton from "@/app/ui/BackButton";
import CreateTask from "@/app/ui/tasks/CreateTask";

function page({ params }: { params: { projectId: number } }) {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>
      <CreateTask projectId={params.projectId} />
    </div>
  );
}

export default page;
