"use client";
import { CheckCircleIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import clsx from "clsx";
function TaskCard({ name, status }: { name: string; status: string }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={clsx(
        "bg-white flex items-center gap-4 text-semibold rounded-xl shadow p-4 text-gray-500 transition hover:shadow-lg hover:text-primary",
        {
          "line-through": status === "done",
        }
      )}
    >
      <CheckCircleIcon width={35} className="mr-2" />
      <p className="mr-auto">{name}</p>

      {isHovering ? (
        <DocumentPlusIcon width={20} />
      ) : (
        <div className="w-4 h-2 bg-gray-500 rounded" />
      )}
    </div>
  );
}

export default TaskCard;
