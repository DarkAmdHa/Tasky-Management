import { InviteObject } from "@/lib/definitions";
import { handleInvite } from "@/lib/functions";
import ProfilePicture from "../ProfilePicture";
import { useState,useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import {toast} from 'react-toastify'
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
function InviteCard({
  invite,
}: {
    invite: InviteObject;
}) {
  const router = useRouter();
  const [ishandling,setIsHandling] = useState(false);
  const {authObject,setAuthObject} = useContext(AuthContext);
  const handleInviteFnc = async (team_id: number, invite_id: number, status: "Accepted" | "Rejected")=>{
    setIsHandling(true)
    try{
      const res = await handleInvite(team_id,invite_id,status);
      if(res.success){
        if(status === "Accepted"){
          toast.success(`${invite.team?.name} team joined`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
          router.push(`/dashboard/teams/${team_id}`)
        }else{
          toast.success(`${invite.team?.name} team request rejected`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
        }
        //Remove invite from context:
        setAuthObject(prev=>({...prev, pendingInvites: prev.pendingInvites.filter(i=>i.id != invite_id)}))
      }else if(res.error){
        toast.success(`You are already in the team`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
      }
    }catch(e){
      console.log(e)
      toast.error(`Something went wrong`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }finally{
    setIsHandling(false)

    }

  }

  return (
      <div className={`rounded-xl w-fit bg-tertiary shadow transition py-5 pl-5 pr-16 flex gap-5 items-center justify-between isLoadingDiv  ${ishandling && " isLoading"}`}>
        {ishandling && <Spinner customClass="customSpinner"/>}
        <div className="flex-1">
          <div className="flex gap-2 items-center mb-6">
            <ProfilePicture imgSrc={invite.invited_by_img ?? "" } size={50} border={2} />
            <div>
            <p className="font-semibold text-primary">{invite.invited_by_name}</p>
            <p className="text-xs text-gray-500">{invite.invited_by}</p>
            </div>
          </div>
          <p className="mb-3">{invite.invited_by_name} invited you to the {invite.team?.name} team</p>
          <div className="flex gap-4">
            <button
            onClick={handleInviteFnc.bind(this,invite.team.id,invite.id,"Rejected")}
            className="border border-red-500 cursor-pointer text-gray-800 min-w-[60px] rounded transition hover:text-white hover:bg-red-500 h-fit w-1/2 p-2 font-semibold"
            >
            Reject
            </button>
            <button
            onClick={handleInviteFnc.bind(this,invite.team.id,invite.id,"Accepted")}
            className="bg-primary shadow-lg transition hover:shadow-xl min-w-[60px] text-white rounded h-fit w-1/2 p-2 font-semibold cursor-pointer"
            >
            Accept
            </button>
          </div>
        </div>
      </div>
  );
}

export default InviteCard;
