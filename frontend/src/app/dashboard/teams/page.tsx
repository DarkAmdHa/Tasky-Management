import BackButton from "@/app/ui/BackButton";
import Button from "@/app/ui/Button";
import AllTeams from "@/app/ui/teams/AllTeams";
import Link from "next/link";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Teams</h1>
        <Link href="/dashboard/teams/create">
          <Button extraClasses="flex items-center justify-center w-fit gap-2 cursor-pointer">
            Create Team
          </Button>
        </Link>
      </div>
      <AllTeams />
    </div>
  );
}

export default page;
