import { Project } from "@/app/lib/definitions";
import CompletionPercentage from "./CompletionPercentage";
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl bg-white shadow-none transition p-4 hover:shadow-2xl flex gap-5 items-center cursor-pointer">
      <div className="w-9/12">
        <p className="font-semibold  mb-2">{project.projectName}</p>
        <p className="font-semibold text-xs text-gray-500">
          {project.projectDescription.length > 80
            ? project.projectDescription.slice(0, 80) + `...`
            : project.projectDescription}
        </p>
      </div>
      <CompletionPercentage percentageCompleted={project.percentageCompleted} />
    </div>
  );
}

export default ProjectCard;
