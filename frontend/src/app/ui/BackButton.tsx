"use client";
import React from "react";
import Button from "./Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  const headBack = () => {
    router.back();
  };
  return (
    <div onClick={headBack}>
      <Button extraClasses="flex items-center justify-center w-fit mb-2 gap-2 px-4">
        <ArrowLeftIcon width={25} />
        Back
      </Button>
    </div>
  );
}

export default BackButton;
