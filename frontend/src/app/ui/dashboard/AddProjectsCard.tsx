import Button from "../Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
function AddProjectsCard() {
  return (
    <div className="bg-white p-5 flex items-center justify-center  cursor-pointer rounded-2xl">
      <div className="flex flex-col items-center">
        <Link href="/dashboard/projects/create">
          <Button
            round={true}
            extraClasses="flex items-center justify-center w-fit mb-2"
          >
            <PlusIcon width={50} />
          </Button>
        </Link>
        <p className="text-primary font-bold uppercase">Add Project</p>
        <p className="text-gray-300 text-xs font-bold">Click here</p>
      </div>
    </div>
  );
}

export default AddProjectsCard;
