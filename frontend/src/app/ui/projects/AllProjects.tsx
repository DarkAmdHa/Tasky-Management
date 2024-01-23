"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/functions";
import ProjectCardSkeleton from "../ProjectCardSkeleton";
import Pagination from "@/app/ui/Pagination";
import ProjectCard from "@/app/ui/ProjectCard";

function AllProjects() {
  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") || "1");

  const [paginatedProjects, setPaginatedProjects] = useState({});
  const [projects, setProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoading = async (page: number) => {
      try {
        const projectData = await getProjects(page);
        setPaginatedProjects(projectData.paginatedProjects);
        setProjects(projectData.paginatedProjects.data);
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
      ) : projects.length ? (
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <ProjectCard
              project={project}
              key={project.name}
              excerptLength={200}
            />
          ))}
        </div>
      ) : (
        <p>No projects added yet.</p>
      )}

      {paginatedProjects?.last_page && (
        <Pagination
          currentPage={paginatedProjects.current_page}
          totalPages={paginatedProjects.last_page}
        />
      )}
    </>
  );
}

export default AllProjects;
