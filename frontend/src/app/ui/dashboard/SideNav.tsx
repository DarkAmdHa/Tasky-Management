"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DevicePhoneMobileIcon,
  RadioIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import Upsell from "@/app/ui/Upsell";

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
      name: "Planning",
      href: "/dashboard/planning",
      icon: DocumentDuplicateIcon,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: RadioIcon,
    },
  ];

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
        </div>
        <Upsell />
      </div>
    </div>
  );
}

export default SideNav;
