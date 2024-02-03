import { Team } from "@/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";

function TeamsSearchResult({ teams }: { teams: Team[] }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="teams">
      <p className="font-semi text-lg border-b border-gray-200 border-width-1 py-2 px-4 ">
        Teams
      </p>
      <div className="flex flex-col">
        {teams?.length ? (
          <>
            {teams.slice(0, 3).map((team) => (
              <Link
                key={`team-${team.id}`}
                href={`/dashboard/teams/${team.id}`}
                className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary"
              >
                {team.name}
              </Link>
            ))}
            {teams.length > 3 && (
              <div className="flex flex-col-reverse">
                <input
                  type="checkbox"
                  checked={showMore}
                  id="showMoreTeams"
                  className="hidden"
                  onChange={(e) => setShowMore((prevState) => !prevState)}
                />
                <label
                  htmlFor="showMoreTeams"
                  className="cursor-pointer text-primary p-2 px-4 w-fit hover:underline"
                >
                  Show {showMore ? "Less" : "More"}
                </label>

                {showMore &&
                  teams.slice(3).map((team, index) => (
                    <Link
                      key={`team-${team.id}-${index}`}
                      href={`/dashboard/teams/${team.id}`}
                      className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary showMoreTeams"
                    >
                      {team.name}
                    </Link>
                  ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center">No Teams Found</p>
        )}
      </div>
    </div>
  );
}

export default TeamsSearchResult;
