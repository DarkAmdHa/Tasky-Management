import AllInvites from "@/app/ui/invites/AllInvites";
function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Invites</h1>
      </div>
      <AllInvites />
    </div>
  );
}

export default page;
