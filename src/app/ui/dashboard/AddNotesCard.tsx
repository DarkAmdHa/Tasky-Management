import Button from "../Button";
import { PlusIcon } from "@heroicons/react/24/solid";
function AddNotesCard() {
  return (
    <div className="bg-white p-5 flex items-center justify-center  cursor-pointer rounded-2xl">
      <div className="flex flex-col items-center">
        <Button
          round={true}
          extraClasses="flex items-center justify-center w-fit mb-2"
        >
          <PlusIcon width={50} />
        </Button>
        <p className="text-primary font-bold  text-lg uppercase">Add Notes</p>
        <p className="text-gray-300 text-xs font-bold">Click here</p>
      </div>
    </div>
  );
}

export default AddNotesCard;
