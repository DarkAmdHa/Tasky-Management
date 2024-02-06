"use client";
import { useEffect, useState, useRef } from "react";
import { getTeamWithUsers } from "@/lib/functions";
import TeamSkeleton from "./TeamSkeleton";
import { Team } from "@/lib/definitions";
import PaginatedTasksColumn from "./PaginatedTasksColumn";
import Spinner from "../Spinner";

function Team({ id }: { id: number }) {
  const [teamObject, setTeamObject] = useState<Team>({
    name: "",
    projects: {
      data: [],
    },
    users: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const [projectPage, setProjectPage] = useState(1);
  const [lastProjectPage, setLastProjectPage] = useState(1);

  const projectsRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoadingTeam = async (id: number, projectPage: number) => {
      setIsLoading(true);
      try {
        const { team } = await getTeamWithUsers(id, projectPage);
        if (projectPage > 1) {
          setTeamObject((prev) => ({
            ...prev,
            projects: {
              ...team.projects,
              data: [...prev?.projects.data, ...team.projects.data],
            },
          }));
        } else {
          setTeamObject(team);
        }
        setLastProjectPage(team.projects.last_page);
      } catch (e) {
        //TODO: Handle Error
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    handleLoadingTeam(id, projectPage);
  }, [id, projectPage]);

  useEffect(() => {
    const el = projectsRow.current;
    if (!el) return; // Exit if el is null

    const onScroll = () => {
      if (el.scrollWidth - el.scrollLeft <= el.clientWidth + 10) {
        if (lastProjectPage > 1 && projectPage !== lastProjectPage) {
          setTimeout(() => {
            setProjectPage((currentPage) => currentPage + 1);
          }, 1500);
        }
      }
    };

    if (el) {
      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [lastProjectPage, projectPage]);
  return (
    <div>
      {isLoading ? (
        <TeamSkeleton />
      ) : teamObject ? (
        <>
          <h1 className="text-3xl font-bold text-gray-700  mb-4">
            {teamObject.name}
          </h1>

          <div className="">
            <h2 className="text-xl font-semi">Team Users</h2>
            <div className="flex gap-3 overflow-auto pt-2">
              {teamObject.users.map((user) => (
                <div key={user.id} className="flex flex-col items-center gap-2">
                  <div className="rounded-full shadow-lg border-4 border-slate-100 overflow-hidden w-14 transition hover:shadow-xl">
                    <img
                      src={
                        user.avatar_src
                          ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${user.avatar_src}`
                          : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/img/avatar.jpg`
                      }
                      width={100}
                      height={100}
                      className="rounded"
                      alt=""
                    />
                  </div>
                  <p className="text-sm ">{user.first_name}</p>
                </div>
              ))}
            </div>
          </div>

          {teamObject.projects.data.length ? (
            <div className="flex flex-col gap-5">
              <div
                className="flex gap-0 max-w-full py-10 overflow-auto"
                ref={projectsRow}
              >
                {teamObject.projects.data.map((project) => (
                  <PaginatedTasksColumn project={project} key={project.id} />
                ))}
                {projectPage < lastProjectPage && (
                  <Spinner customClass="regularSpinner pr-10 pl-5" />
                )}
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
