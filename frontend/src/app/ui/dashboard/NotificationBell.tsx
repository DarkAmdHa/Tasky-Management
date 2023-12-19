"use client";
import { BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import clsx from "clsx";

function NotificationBell() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <BellIcon
      className={clsx("cursor-pointer w-6 text-gray-500  transition", {
        "text-primary": isActive,
        "hover:text-primary": !isActive,
      })}
      onClick={handleClick}
    />
  );
}

export default NotificationBell;
