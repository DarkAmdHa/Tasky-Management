import Title from "../Title";
import ProjectCard from "../ProjectCard";
function CurrentProjects() {
  const currentProjects = [
    {
      projectName: "Redesign Client's logo",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.68,
    },
    {
      projectName: "Build Personal Website",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.5,
    },
    {
      projectName: "Company X Branding",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium dicta, inventore, sed tempora nostrum provident nesciunt cumque quis molestias odio eveniet. Pariatur aliquid, distinctio natus veritatis temporibus quasi aut illum necessitatibus quis officia voluptatibus sit est. Excepturi facilis, explicabo eaque, suscipit error iure nobis doloribus, quis tempora reprehenderit repudiandae.",
      percentageCompleted: 0.1,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Title title="Current Projects" />
      <div className="flex flex-col gap-4">
        {currentProjects.map((project) => (
          <ProjectCard project={project} key={project.projectName} />
        ))}
      </div>
    </div>
  );
}

export default CurrentProjects;
