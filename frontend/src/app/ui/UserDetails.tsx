"use client";
import { useContext } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import UserDetailsSkeleton from "./UserDetailsSkeleton";
import ProfilePicture from "./ProfilePicture";

function UserDetails() {
  const hasNotification = true;
  const { authObject } = useContext(AuthContext);
  const { user, isLoading } = authObject;
  return (
    <div className="flex gap-2 items-center justify-center">
      {isLoading ? (
        <UserDetailsSkeleton />
      ) : (
        <>
          <Link
            href="/user"
            className={clsx("relative", {
              "before:absolute before:w-5 before:h-5 before:rounded-full before:bg-primary before:bottom-2 before:right-0 before:border-2 before:border-white":
                hasNotification === true,
            })}
          >
            <ProfilePicture imgSrc={user.avatar_src} size={100} />
          </Link>

          <Link href="/user">
            <p className="text-gray-900 font-semibold">
              {user.first_name} {user.last_name}
            </p>
            {user.profession && (
              <p className="text-gray-500 text-sm font-semibold">
                {user.profession}
              </p>
            )}
          </Link>
        </>
      )}
    </div>
  );
}

export default UserDetails;
