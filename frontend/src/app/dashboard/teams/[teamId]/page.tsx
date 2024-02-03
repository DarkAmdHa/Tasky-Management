import React from "react";
import BackButton from "@/app/ui/BackButton";
import Team from "@/app/ui/teams/Team";
import TeamUsers from "@/app/ui/teams/TeamUsers";
function page({ params }: { params: { teamId: string } }) {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>

      <Team id={+params.teamId} />
    </div>
  );
}

export default page;
