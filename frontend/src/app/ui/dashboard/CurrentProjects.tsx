"use client";
import Title from "../Title";
import ProjectCard from "../ProjectCard";
import { getLatestActiveProjects } from "@/lib/functions";
import { useState, useEffect } from "react";
import ProjectCardSkeleton from "../ProjectCardSkeleton";
function CurrentProjects({ dashboardData, setDashboardData }) {
  // const currentProjects = [
  //   {
  //     id: 1,
  //     projectName: "Redesign Client's logo",
  //     projectDescription:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
  //     percentageCompleted: 0.68,
  //   },
  //   {
  //     id: 2,
  //     projectName: "Build Personal Website",
  //     projectDescription:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
  //     percentageCompleted: 0.5,
  //   },
  //   {
  //     id: 3,
  //     projectName: "Company X Branding",
  //     projectDescription:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
  //     percentageCompleted: 0.1,
  //   },
  // ];

  // useEffect(() => {
  //   const getLastProjects = async () => {
  //     const data = await getLatestActiveProjects(3);
  //     setCurrentProjects(data);
  //   };
  //   getLastProjects();
  // }, []);

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
