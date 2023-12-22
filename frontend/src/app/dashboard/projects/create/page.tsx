"use client";
import React from "react";
import { useState } from "react";
import Button from "@/app/ui/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { createProject } from "@/app/lib/functions";
import Spinner from "@/app/ui/Spinner";
import { useRouter } from "next/navigation";

function page() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSaving) {
      setIsSaving(true);
      try {
        const createdProject = createProject(form);
        router.push(`/dashboard/projects/${createdProject.id}`);
        // TODO: Message that the task was created.
      } catch (e) {
        console.error(e);
      } finally {
        setIsSaving(false);
      }
    }
  };
  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Start a New Project
      </h1>

      <p className="text-gray-600 mb-4 text-lg max-w-3xl">
        Embark on your project journey with TaskyTasky, where every idea can
        become a reality. We&apos;re thrilled to see the incredible projects
        you&apos;ll bring to life! Please fill in the details below to kickstart
        your creative process.
      </p>
      <form>
        <div className="my-4 flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-700 text-lg">
            Project Title
          </label>
          <div className="flex gap-2 border-b border-gray-200">
            <input
              type="title"
              id="title"
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full border-gray-200 resize-none border transition focus:outline-none focus:shadow p-3"
            />
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-700 text-lg">
            Project Description
          </label>
          <div className="flex gap-2 border-b border-gray-200">
            <textarea
              className="min-h-[80px] w-full border border-gray-200 resize-none transition focus:outline-none focus:shadow p-3"
              name="description"
              id="description"
              placeholder="Project Description"
              value={form.description}
              cols={20}
              rows={10}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>

          <Button
            extraClasses={`mt-6 transition py-4 min-w-[250px] w-fit px-10 m-auto flex gap-1 justify-center ${
              isSaving && "opacity-75"
            }`}
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? (
              <Spinner />
            ) : (
              <>
                <PlusIcon width={25} />

                <p className="text-lg">Create Project</p>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default page;
