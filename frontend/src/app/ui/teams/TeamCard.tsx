import { Team } from "@/lib/definitions";
import Link from "next/link";
import React from "react";

function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/dashboard/teams/${team.id}`}>
      <div className="bg-tertiary p-4 shadow transition hover:shadow-lg rounded  relative">
        <div className="flex gap-2 items-center cursor-pointer w-fit">
          <div className="text-black flex gap-2 items-center justify-center text-primary">
            {team.name}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TeamCard;
