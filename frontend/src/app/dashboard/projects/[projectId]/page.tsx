import React from "react";
import BackButton from "@/app/ui/BackButton";
import Project from "@/app/ui/projects/Project";
function page({ params }: { params: { projectId: string } }) {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>

      <Project id={+params.projectId} />
    </div>
  );
}

export default page;
