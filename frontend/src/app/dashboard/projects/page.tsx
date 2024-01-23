import Button from "@/app/ui/Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import AllProjects from "@/app/ui/projects/AllProjects";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Projects</h1>
        <Link href="/dashboard/projects/create">
          <Button extraClasses="flex items-center justify-center w-fit gap-2 cursor-pointer">
            <PlusIcon width={25} />
            New Project
          </Button>
        </Link>
      </div>
      <AllProjects />
    </div>
  );
}

export default page;
