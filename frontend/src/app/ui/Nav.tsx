"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { logoutUser } from "@/lib/functions";

function Nav() {
  const { authObject, setAuthObject } = useContext(AuthContext);

  const isLoggedIn = Object.keys(authObject.user).length ? true : false;
  const links = [
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "About Us",
      href: "/about",
    },
  ];

  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthObject({ ...authObject, user: {} });
      router.push("/");
    } catch (e) {
      alert("Something went wrong!");
    }
  };

  const pathname = usePathname();
  return (
    <nav className="w-full min-h-[50px] shadow flex bg-white sticky top-0 text-sm">
      <div className="max-w-7xl flex m-auto w-full justify-between h-full ">
        <Link href="/" className="text-2xl font-bold text-gray-500 flex">
          Tasky<span className="text-primary">Tasky</span>.
        </Link>

        <div className="flex gap-4 items-center">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-gray-500 flex hover:underline transition hover:text-black",
                  pathname === link.href && "text-black font-medium"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          {authObject.isLoading && (
            <div className="flex items-center gap-2 cursor-pointer relative animation-fade transition">
              <div className="rounded-full w-[35px] h-[35px] bg-gray-200 overflow-hidden max-w-md border-2  shining" />
              <div className="flex gap-2 flex-col">
                <div className="flex gap-1 w-6 h-2 bg-gray-200 shining"></div>
                <div className="flex gap-1 w-9 h-2 bg-gray-200 shining"></div>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onMouseEnter={(e) => setHovering(true)}
              onMouseLeave={(e) => setHovering(false)}
            >
              <Image
                src="https://picsum.photos/100"
                width={35}
                height={35}
                className="rounded-full overflow-hidden max-w-md border-2  border-slate-600"
                alt={authObject.user.first_name}
              />
              <p className="flex gap-1">
                {authObject.user.first_name}
                <ChevronDownIcon
                  width={12}
                  className={clsx("mt-0.5 transition", {
                    "rotate-180": hovering,
                  })}
                />
              </p>
              <div
                className={clsx(
                  "shadow-lg absolute top-full bg-white m-w-sm h-fit flex flex-col gap-1 transition opacity-0 -translate-y-1 ",
                  {
                    "pointer-events-none": !hovering,
                    "translate-y-0 opacity-100 ": hovering,
                  }
                )}
              >
                <Link
                  className="block transition bg-white hover:bg-gray-100 px-5 text-sm py-2 "
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <div
                  onClick={handleLogout}
                  className="block transition bg-white hover:bg-gray-100 cursor-pointer text-red-500 px-5 text-sm py-2"
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            !authObject.isLoading && (
              <>
                <Link
                  href="/login"
                  className={clsx(
                    "text-gray-500 flex hover:underline transition hover:text-black",
                    pathname === "/login" && "text-black font-medium"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={clsx(
                    "text-gray-500 flex hover:underline transition hover:text-black",
                    pathname === "/register" && "text-black font-medium"
                  )}
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
