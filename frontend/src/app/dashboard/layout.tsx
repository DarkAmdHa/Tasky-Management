import SideNav from "@/app/ui/dashboard/SideNav";
import UserDetails from "../ui/UserDetails";
import SearchBar from "../ui/SearchBar";
import NotificationBell from "../ui/dashboard/NotificationBell";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen m-auto">
      <SideNav />
      <div className="w-10/12 bg-backgroundColor">
        <div className="p-7 gap-5 flex flex-col">
          <div className="flex justify-between items-center">
            <UserDetails />
            <div className="flex gap-4 h-fit">
              <NotificationBell />
              <SearchBar />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
