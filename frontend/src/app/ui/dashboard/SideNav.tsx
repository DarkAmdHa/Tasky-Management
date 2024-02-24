"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DevicePhoneMobileIcon,
  RadioIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import Upsell from "@/app/ui/Upsell";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { logoutUser } from "@/lib/functions";

function SideNav() {
  const path = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: UserGroupIcon,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: HomeIcon,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: DevicePhoneMobileIcon,
    },
    {
      name: "Edit Profile",
      href: "/dashboard/user",
      icon: DocumentDuplicateIcon,
    },
    {
      name: "Teams",
      href: "/dashboard/teams",
      icon: RadioIcon,
    },
    {
      name: "Pending Invites",
      href: "/dashboard/invites",
      icon: ReceiptPercentIcon,
    }
  ];

  const [isSaving, setIsSaving] = useState(false);
  const { authObject, setAuthObject } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    if (isSaving) return false;
    if (window.confirm("Are you sure ?")) {
      setIsSaving(true);
      try {
        await logoutUser();
        setAuthObject({
          ...authObject,
          user: {
            first_name: "",
            last_name: "",
            email: "",
            profession: "",
            phone: "",
            avatar_src: "",
          },
        });
        router.push("/");
      } catch (e) {
        alert("Something went wrong!");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="flex gap-4 w-2/12 bg-white py-10 px-5  sticky max-h-screen top-0 shadow-xl">
      <div className="w-full flex flex-col gap-5 items-center text-center">
        <div className="font-bold text-gray-500 pb-5">
          <Link href="/">
            Tasky<span className="text-primary">Tasky</span>.
          </Link>
        </div>
        <div className="flex gap-2 flex-col">
          {links.map((link, index) => {
            const LinkIcon = link.icon;
            return (
              <Link
                href={link.href}
                className={clsx(
                  "flex py-2 px-5 gap-5 transition hover:bg-secondary rounded-lg font-bold text-gray-500",
                  {
                    "bg-secondary text-primary":
                      path == link.href ||
                      (path.includes(link.href) && link.href != "/dashboard"),
                  }
                )}
                key={link.name}
              >
                <LinkIcon className="w-5" />
                {link.name}
              </Link>
            );
          })}
          <div
            onClick={handleLogout}
            className="flex py-2 px-5 gap-5 transition hover:bg-red-700 hover:text-white rounded-lg font-bold text-gray-500 cursor-pointer"
          >
            <ExclamationCircleIcon className="w-5" />
            Logout
          </div>
        </div>
        <Upsell />
      </div>
    </div>
  );
}

export default SideNav;
