import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

function AddFilesCard() {
  return (
    <div className="border-2 bg-tertiary border-dashed p-5 flex items-center justify-center  cursor-pointer rounded-2xl">
      <div className="flex flex-col items-center text-gray-300">
        <CloudArrowUpIcon width={50} />
        <p className=" font-bold  text-lg uppercase">Add Files</p>
        <p className=" text-xs font-bold">Drag Files</p>
      </div>
    </div>
  );
}

export default AddFilesCard;
