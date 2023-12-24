import React from "react";
import TaskCard from "@/app/ui/TaskCard";
import BackButton from "@/app/ui/BackButton";
import TasksColumn from "@/app/ui/TasksColumn";

function page() {
  const projectsAndTasks = [
    {
      id: 1,
      projectName: "Redesign Client's logo",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.68,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 2,
      projectName: "Build Personal Website",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.5,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
      tasks: [
        {
          id: 1,
          name: "Init Project",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Design About Page",
          status: "ongoing",
        },
        {
          id: 3,
          name: "Prototype Design",
          status: "done",
        },
      ],
    },
  ];

  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="mb-4">
        <BackButton href="/dashboard" />
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-700">Tasks</h1>
        <p className="text-gray-500">
          Define the next steps for your project and keep track of your progress
          by adding tasks.
        </p>
      </div>

      <div className="flex gap-5 max-w-full py-10 overflow-auto">
        {projectsAndTasks.map((project) => (
          <TasksColumn project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}

export default page;
