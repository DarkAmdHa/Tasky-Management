import React from "react";
import Link from "next/link";
import Button from "./Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function BackButton({ href }: { href: string }) {
  return (
    <Link href={href} className="w-fit">
      <Button extraClasses="flex items-center justify-center w-fit mb-2 gap-2 px-4">
        <ArrowLeftIcon width={25} />
        Back
      </Button>
    </Link>
  );
}

export default BackButton;
