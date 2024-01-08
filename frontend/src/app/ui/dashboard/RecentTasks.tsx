"use client";
import TaskCard from "@/app/ui/TaskCard";
import Title from "../Title";
import { useState, useEffect } from "react";
import { getLatestActiveTasks } from "@/lib/functions";
import TaskCardSkeleton from "../TaskCardSkeleton";

function RecentTasks({ dashboardData }) {
  // const tasks = [
  //   {
  //     id: 1,
  //     name: "Init Project",
  //     status: "ongoing",
  //     projectId: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Design About Page",
  //     status: "ongoing",
  //     projectId: 2,
  //   },
  //   {
  //     id: 3,

  //     name: "Prototype Design",
  //     status: "done",
  //     projectId: 3,
  //   },
  // ];

  // useEffect(() => {
  //   const getLastProjects = async () => {
  //     const currentTasks = await getLatestActiveTasks(3);
  //   };
  //   getLastProjects();
  // }, [currentTasks]);
  const { isLoading, currentTasks } = dashboardData;
  return (
    <div className="flex flex-col gap-4">
      <Title title="Active Tasks" />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <TaskCardSkeleton count={3} />
        ) : currentTasks.length ? (
          currentTasks.map((task) => <TaskCard task={task} key={task.name} />)
        ) : (
          <p>No tasks currently created.</p>
        )}
      </div>
    </div>
  );
}

export default RecentTasks;
