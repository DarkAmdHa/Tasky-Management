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
      href: "/projects",
      icon: HomeIcon,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: DevicePhoneMobileIcon,
    },
    {
      name: "Planning",
      href: "/planning",
      icon: DocumentDuplicateIcon,
    },
    {
      name: "Team",
      href: "/team",
      icon: RadioIcon,
    },
  ];

  return (
    <div className="flex gap-4 w-1/5 bg-white p-10">
      <div className="w-full flex flex-col gap-5 items-center text-center">
        <div className="font-bold text-gray-500 pb-5">
          Tasky<span className="text-primary">Tasky</span>.
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
                    "bg-secondary text-primary": path === link.href,
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
