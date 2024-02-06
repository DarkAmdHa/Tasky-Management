import React from "react";
import BackButton from "@/app/ui/BackButton";
import CreateTeam from "@/app/ui/teams/CreateTeam";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>
      <CreateTeam />
    </div>
  );
}

export default page;
