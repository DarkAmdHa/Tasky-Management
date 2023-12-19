import ProjectCard from "@/app/ui/ProjectCard";
import Button from "@/app/ui/Button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

function page() {
  const currentProjects = [
    {
      id: 1,
      projectName: "Redesign Client's logo",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.68,
    },
    {
      id: 2,
      projectName: "Build Personal Website",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.5,
    },
    {
      id: 3,

      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.15,
    },
    {
      id: 4,
      projectName: "Company2  Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.12,
    },
    {
      id: 5,
      projectName: "Company 3 Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.4,
    },
    {
      id: 6,
      projectName: "Company4 Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.23,
    },
    {
      id: 7,
      projectName: "Company5 Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.54,
    },
  ];

  return (
    <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Projects</h1>
        <Link href="/dashboard/projects/create">
          <Button extraClasses="flex items-center justify-center w-fit gap-2 cursor-pointer">
            <PlusIcon width={25} />
            New Project
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {currentProjects.map((project) => (
          <ProjectCard
            project={project}
            key={ProjectCard.name}
            excerptLength={200}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
