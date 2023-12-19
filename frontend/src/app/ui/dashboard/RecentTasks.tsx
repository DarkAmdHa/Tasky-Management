import TaskCard from "@/app/ui/TaskCard";
import Title from "../Title";

function RecentTasks() {
  const tasks = [
    {
      id: 1,
      name: "Init Project",
      status: "ongoing",
      projectId: 1,
    },
    {
      id: 2,
      name: "Design About Page",
      status: "ongoing",
      projectId: 2,
    },
    {
      id: 3,

      name: "Prototype Design",
      status: "done",
      projectId: 3,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Title title="Active Tasks" />
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.name} />
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;
