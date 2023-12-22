import { Project } from "@/app/lib/definitions";
import CompletionPercentage from "./CompletionPercentage";
import Link from "next/link";
function ProjectCard({
  project,
  excerptLength,
}: {
  project: Project;
  excerptLength?: number;
}) {
  const maxExcerpt = excerptLength ?? 80;
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <div className="rounded-xl bg-tertiary shadow transition p-4 hover:shadow-lg flex gap-5 items-center cursor-pointer justify-between">
        <div className="w-9/12">
          <p className="font-semibold  mb-2">{project.projectName}</p>
          <p className="font-semibold text-xs text-gray-500">
            {project.projectDescription.length > maxExcerpt
              ? project.projectDescription.slice(0, maxExcerpt) + `...`
              : project.projectDescription}
          </p>
        </div>
        <CompletionPercentage
          percentageCompleted={project.percentageCompleted}
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
