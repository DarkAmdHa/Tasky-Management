"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectsWithTasks } from "@/lib/functions";
import ProjectCardSkeleton from "../ProjectCardSkeleton";
import Pagination from "@/app/ui/Pagination";
import TasksColumn from "../TasksColumn";

function AllTasks() {
  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") || "1");

  const [paginatedProjectsWithTasks, setPaginatedProjectsWithTasks] = useState(
    {}
  );
  const [projectsWithTasks, setProjectsWithTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoading = async (page: number) => {
      try {
        const projectData = await getProjectsWithTasks(page);
        setPaginatedProjectsWithTasks(projectData.paginatedProjectsWithTasks);
        setProjectsWithTasks(projectData.paginatedProjectsWithTasks.data);
      } catch (e) {
        console.log(e);
        //TODO: Add Error Handler
      }
    };

    setIsLoading(true);
    handlePageLoading(page).finally(() => setIsLoading(false));
  }, [page]);

  return (
    <>
      {isLoading ? (
        <ProjectCardSkeleton count={3} />
      ) : projectsWithTasks.length ? (
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 max-w-full py-10 overflow-auto">
            {projectsWithTasks.map((project) => (
              <TasksColumn project={project} key={project.id} />
            ))}
          </div>
        </div>
      ) : (
        <p>No Projects added yet.</p>
      )}

      {paginatedProjectsWithTasks?.last_page && (
        <Pagination
          currentPage={paginatedProjectsWithTasks.current_page}
          totalPages={paginatedProjectsWithTasks.last_page}
        />
      )}
    </>
  );
}

export default AllTasks;
