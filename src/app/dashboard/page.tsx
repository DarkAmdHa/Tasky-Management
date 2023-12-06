import UserDetails from "../ui/UserDetails";
import SearchBar from "../ui/SearchBar";
import NotificationBell from "../ui/dashboard/NotificationBell";
import RecentTasks from "../ui/dashboard/RecentTasks";
import RecentUploads from "../ui/dashboard/RecentUploads";
import CurrentProjects from "../ui/dashboard/CurrentProjects";
import AddNotesCard from "../ui/dashboard/AddNotesCard";
import AddFilesCard from "../ui/AddFilesCard";

export default function Page() {
  return (
    <div className="p-5 gap-5 flex flex-col">
      <div className="flex justify-between items-center">
        <UserDetails />
        <div className="flex gap-4 h-fit">
          <NotificationBell />
          <SearchBar />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <RecentTasks />
          <RecentUploads />
        </div>
        <CurrentProjects />
        <div className="flex gap-4 flex-col">
          <AddNotesCard />
          <AddFilesCard />
        </div>
      </div>
    </div>
  );
}
