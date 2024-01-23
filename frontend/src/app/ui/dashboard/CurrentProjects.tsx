"use client";
import Title from "../Title";
import ProjectCard from "../ProjectCard";
import ProjectCardSkeleton from "../ProjectCardSkeleton";
function CurrentProjects({ dashboardData, setDashboardData }) {
  const { latestProjects, isLoading } = dashboardData;
  const handleMouseOver = (id) => {
    setDashboardData({
      ...dashboardData,
      currentTasks: dashboardData.latestProjects.find((proj) => proj.id === id)
        ?.latest_tasks,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Title title="Current Active Projects" />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <ProjectCardSkeleton count={3} />
        ) : latestProjects.length ? (
          latestProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              handleMouseOver={handleMouseOver.bind(this, project.id)}
            />
          ))
        ) : (
          <p>No projects added yet.</p>
        )}
      </div>
    </div>
  );
}

export default CurrentProjects;
