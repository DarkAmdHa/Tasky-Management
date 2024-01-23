import React from "react";
import BackButton from "@/app/ui/BackButton";
import { useState } from "react";
import Spinner from "@/app/ui/Spinner";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/functions";
import Button from "@/app/ui/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateTask from "@/app/ui/tasks/CreateTask";

function page() {
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="./dashboard" />
      </div>
      <CreateTask />
    </div>
  );
}

export default page;
