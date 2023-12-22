import RecentTasks from "../ui/dashboard/RecentTasks";
import RecentUploads from "../ui/dashboard/RecentUploads";
import CurrentProjects from "../ui/dashboard/CurrentProjects";
import AddProjectsCard from "../ui/dashboard/AddProjectsCard";
import AddFilesCard from "../ui/AddFilesCard";

export default function Page() {
  return (
    <div className="flex gap-4  px-6 py-8  rounded-lg bg-white shadow-lg">
      <div className="flex flex-col w-5/12 gap-10">
        <RecentTasks />
        <RecentUploads />
      </div>
      <div className="w-5/12">
        <CurrentProjects />
      </div>
      <div className="flex gap-4 flex-col  w-2/12">
        <div className="mt-6"></div>
        <AddProjectsCard />
        <AddFilesCard />
      </div>
    </div>
  );
}
