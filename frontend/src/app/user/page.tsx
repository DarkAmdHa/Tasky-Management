import SideNav from "@/app/ui/dashboard/SideNav";
import ProfileEdit from "../ui/profile/ProfileEdit";

function page() {
  return (
    <div className="flex min-h-screen m-auto">
      <SideNav />
      <div className="w-full">
        <div className="p-7 gap-5 flex flex-col">
          <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
            <div className="max-w-4xl m-auto">
              <ProfileEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
