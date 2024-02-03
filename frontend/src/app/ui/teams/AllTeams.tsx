"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTeams } from "@/lib/functions";
import Pagination from "@/app/ui/Pagination";
import TeamsSkeleton from "./TeamsSkeleton";
import TeamCard from "./TeamCard";
import { Team } from "@/lib/definitions";

function AllTeams() {
  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") || "1");

  const [paginatedTeams, setPaginatedTeams] = useState({});
  const [teams, setTeams] = useState<Team[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoading = async (page: number) => {
      try {
        setIsLoading(true);
        const teamData = await getTeams(page);
        setPaginatedTeams(teamData.teams);
        setTeams(teamData.teams.data);
      } catch (e) {
        console.log(e);
        //TODO: Add Error Handler
      } finally {
        setIsLoading(false);
      }
    };
    handlePageLoading(page);
  }, [page]);

  return (
    <>
      {isLoading ? (
        <TeamsSkeleton count={3} />
      ) : teams.length ? (
        <div className="mt-8 flex flex-col gap-4">
          {teams.map((team) => (
            <TeamCard team={team} key={team.name} />
          ))}
        </div>
      ) : (
        <p>No teams added yet.</p>
      )}

      {paginatedTeams?.last_page && (
        <Pagination
          currentPage={paginatedTeams.current_page}
          totalPages={paginatedTeams.last_page}
        />
      )}
    </>
  );
}

export default AllTeams;
