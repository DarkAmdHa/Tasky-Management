import React from "react";
import BackButton from "@/app/ui/BackButton";

function page() {
  const task = {
    id: 1,
    name: "Prototype Design",
    status: "done",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, esse, est excepturi cum nesciunt ad aliquid quis a natus provident obcaecati quia expedita repudiandae enim quasi repellat numquam doloremque praesentium aliquam atque. Nobis ipsum sint ratione, magnam quaerat molestias vel veniam laudantium hic vitae, tenetur blanditiis natus ipsa dolore iusto.",
    comments: [
      {
        userId: 1,
        comment: "COMENT",
        date: "Comment",
        isEdited: false,
      },
      {
        userId: 1,
        comment: "COMENT",
        date: "Comment",
        isEdited: false,
      },
      {
        userId: 1,
        comment: "COMENT",
        date: "Comment",
        isEdited: false,
      },
    ],
  };

  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard/tasks" />
      </div>
      <h1 className="text-3xl font-bold text-gray-700  mb-4">{task.name}</h1>
      <div>{task.description}</div>
      <div>{task.status}</div>
      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-xl font-semibold text-gray-700">Comments</h1>
        {!task.comments.length ? (
          <p className="font-semibold italic text-gray-500">No Comments.</p>
        ) : (
          task.comments.map((comment) => (
            <div key={comment.userId}>{comment.comment}</div>
          ))
        )}
      </div>
    </div>
  );
}

export default page;
