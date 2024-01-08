import { Project } from "@/lib/definitions";
import CompletionPercentage from "./CompletionPercentage";
import Link from "next/link";
function ProjectCard({
  project,
  excerptLength,
  handleMouseOver,
}: {
  project: Project;
  excerptLength?: number;
}) {
  const maxExcerpt = excerptLength ?? 80;
  return (
    <Link
      onMouseOver={handleMouseOver}
      href={`/dashboard/projects/${project.id}`}
    >
      <div className="rounded-xl bg-tertiary shadow transition p-4 hover:shadow-lg flex gap-5 items-center cursor-pointer justify-between">
        <div className="w-9/12">
          <p className="font-semibold  mb-2">{project.name}</p>
          <p className="font-semibold text-xs text-gray-500">
            {project.description.length > maxExcerpt
              ? project.description.slice(0, maxExcerpt) + `...`
              : project.description}
          </p>
        </div>
        <CompletionPercentage percentageCompleted={0.5} />
      </div>
    </Link>
  );
}

export default ProjectCard;
