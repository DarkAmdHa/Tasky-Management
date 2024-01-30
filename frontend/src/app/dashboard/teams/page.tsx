import BackButton from "@/app/ui/BackButton";
import AllTeams from "@/app/ui/teams/AllTeams";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-700">Teams</h1>
        <AllTeams />
      </div>
    </div>
  );
}

export default page;
