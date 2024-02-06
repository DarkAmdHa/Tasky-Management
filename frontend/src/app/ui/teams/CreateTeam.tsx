"use client";
import { useState } from "react";
import Spinner from "@/app/ui/Spinner";
import { useRouter } from "next/navigation";
import { createTeam } from "@/lib/functions";
import Button from "@/app/ui/Button";
import { PlusIcon } from "@heroicons/react/24/solid";

function CreateTeam() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSaving) {
      setIsSaving(true);
      try {
        const { team } = await createTeam(form);
        router.push(`/dashboard/teams/${team.id}`);
        // TODO: Message that the team was created.
      } catch (e) {
        console.error(e);
        //TODO: Handle Error
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-700  mb-4">
        Create A New Team
      </h1>

      <form>
        <div className="my-4 flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 text-lg">
            Team Name
          </label>
          <div className="flex gap-2 border-b border-gray-200">
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Team Title"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full border-gray-200 resize-none border transition focus:outline-none focus:shadow p-3"
            />
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-700 text-lg">
            Team Description
          </label>
          <div className="flex gap-2 border-b border-gray-200">
            <textarea
              className="min-h-[80px] w-full border-gray-200 resize-none border transition focus:outline-none focus:shadow p-3"
              name="description"
              id="description"
              placeholder="Team Description"
              value={form.description}
              cols={20}
              rows={10}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div onClick={handleSubmit}>
            <Button
              extraClasses={`mt-6 transition py-4 min-w-[250px] w-fit px-10 m-auto flex gap-1 justify-center ${
                isSaving && "opacity-75"
              }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <Spinner />
              ) : (
                <>
                  <PlusIcon width={25} />

                  <p className="text-lg">Create Team</p>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTeam;
