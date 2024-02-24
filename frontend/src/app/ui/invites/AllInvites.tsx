"use client";
import { useEffect, useContext, useState } from "react";

import { AuthContext } from "@/contexts/authContext";
import Spinner from "../Spinner";
import InviteCard from "./InviteCard";

function AllInvites() {
  const [isLoading, setIsLoading] = useState(true);
  const { authObject } = useContext(AuthContext);

  useEffect(() => {
    if (authObject && authObject.pendingInvites) {
      setIsLoading(false);
    }
  }, [authObject]);

  if (isLoading) return <Spinner />;

  return (
    <>
       {authObject.pendingInvites.length ? (
        <div className="flex flex-col gap-5">
          {authObject.pendingInvites.map((invite) => (
            <InviteCard
              invite={invite}
              key={invite.id}
            />
          ))}
        </div>
      ) : (
        <p>No invites found.</p>
      )}
    </>
  );
}

export default AllInvites;
