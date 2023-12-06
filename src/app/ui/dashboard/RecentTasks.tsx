import TaskCard from "@/app/ui/TaskCard";

function RecentTasks() {
  const tasks = [
    {
      name: "Init Project",
      status: "ongoing",
    },
    {
      name: "Design About Page",
      status: "ongoing",
    },
    {
      name: "Prototype Design",
      status: "done",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-gray-900">Recent Tasks</p>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.name} name={task.name} status={task.status} />
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;
