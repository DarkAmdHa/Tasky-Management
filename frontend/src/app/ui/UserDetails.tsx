"use client";
import { useContext } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import UserDetailsSkeleton from "./UserDetailsSkeleton";

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
            <div className="rounded-full shadow-lg border-8 border-slate-100 overflow-hidden w-30 transition hover:shadow-xl">
              <img
                src={
                  user.avatar_src
                    ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${user.avatar_src}`
                    : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/img/avatar.jpg`
                }
                width={100}
                height={100}
                className="rounded"
                alt=""
              />
            </div>
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
