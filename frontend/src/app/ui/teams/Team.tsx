"use client";
import { useEffect, useState } from "react";
import { getTeamWithUsers } from "@/lib/functions";
import TeamSkeleton from "./TeamSkeleton";
import { Team } from "@/lib/definitions";
import TasksColumn from "../TasksColumn";
import PaginatedTasksColumn from "./PaginatedTasksColumn";

function Team({ id }: { id: number }) {
  const [team, setTeam] = useState<Team>();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingTeam = async (id: number) => {
    setIsLoading(true);
    try {
      const { team } = await getTeamWithUsers(id);
      setTeam(team);
    } catch (e) {
      //TODO: Handle Error
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleLoadingTeam(id);
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <TeamSkeleton />
      ) : team ? (
        <>
          <h1 className="text-3xl font-bold text-gray-700  mb-4">
            {team.name}
          </h1>

          {team.projects.data.length ? (
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 max-w-full py-10 overflow-auto">
                {team.projects.data.map((project) => (
                  <PaginatedTasksColumn project={project} key={project.id} />
                ))}
              </div>
            </div>
          ) : (
            <p>No Projects added yet.</p>
          )}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-red-500 font-bold text-xl text-center">
            404: No Team Found
          </p>
        </div>
      )}
    </div>
  );
}

export default Team;
