"use client";
import TaskCard from "@/app/ui/TaskCard";
import Title from "../Title";
import TaskCardSkeleton from "../TaskCardSkeleton";

function RecentTasks({ dashboardData }) {
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
