"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function Nav() {
  const links = [
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Register",
      href: "/register",
    },
  ];

  const pathname = usePathname();
  return (
    <nav className="w-full min-h-[50px] shadow flex bg-white sticky top-0">
      <div className="max-w-7xl flex m-auto w-full justify-between h-full ">
        <Link href="/" className="text-2xl font-bold text-gray-500 flex">
          Tasky<span className="text-primary">Tasky</span>.
        </Link>
        <div className="flex gap-4 items-center">
          {links.map((link) => (
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
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
