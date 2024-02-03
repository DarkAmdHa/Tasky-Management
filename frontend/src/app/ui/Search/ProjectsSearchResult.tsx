import { Project } from "@/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";

function ProjectsSearchResult({ projects }: { projects: Project[] }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="projects">
      <p className="font-semi text-lg border-b border-gray-200 border-width-1 py-2 px-4 ">
        Projects
      </p>
      <div className="flex flex-col">
        {projects?.length ? (
          <>
            {projects.slice(0, 3).map((project) => (
              <Link
                key={`project-${project.id}`}
                href={`/dashboard/projects/${project.id}`}
                className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary"
              >
                {project.name}
              </Link>
            ))}
            {projects.length > 3 && (
              <div className="flex flex-col-reverse">
                <input
                  type="checkbox"
                  checked={showMore}
                  id="showMoreProjects"
                  className="hidden"
                  onChange={(e) => setShowMore((prevState) => !prevState)}
                />
                <label
                  htmlFor="showMoreProjects"
                  className="cursor-pointer text-primary p-2 px-4 w-fit hover:underline"
                >
                  Show {showMore ? "Less" : "More"}
                </label>

                {showMore &&
                  projects.slice(3).map((project, index) => (
                    <Link
                      key={`project-${project.id}-${index}`}
                      href={`/dashboard/projects/${project.id}`}
                      className="p-2 border-l border-l-8 border-l-transparent hover:border-l-primary hover:bg-secondary showMoreProjects"
                    >
                      {project.name}
                    </Link>
                  ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center">No Projects Found</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsSearchResult;
