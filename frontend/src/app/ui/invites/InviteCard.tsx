import { InviteObject } from "@/lib/definitions";
import { handleInvite } from "@/lib/functions";
function InviteCard({
  invite,
}: {
    invite: InviteObject;
}) {

  return (

      <div className="rounded-xl bg-tertiary shadow transition p-4 hover:shadow-lg flex gap-5 items-center cursor-pointer justify-between">
        <div className="w-9/12">
          <p className="font-semibold  mb-2">Team Invite</p>
          <p className="font-semibold  mb-2">By {invite.invited_by} to the team {invite.team?.name}</p>
          <div className="flex gap-4">
            <button
            onClick={handleInvite.bind(this,invite.team.id,invite.id,"Rejected")}
            className="border border-red-500 cursor-pointer text-gray-800 min-w-[60px] rounded h-fit w-fit p-2 font-semibold"
            >
            Cancel
            </button>
            <button
            onClick={handleInvite.bind(this,invite.team.id,invite.id,"Accepted")}
            className="bg-primary shadow-lg transition hover:shadow-xl min-w-[60px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
            >
            Accept
            </button>
          </div>
        </div>
      </div>
  );
}

export default InviteCard;
