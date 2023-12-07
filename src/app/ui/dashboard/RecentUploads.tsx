import UploadItem from "@/app/ui/UploadItem";
import Title from "../Title";

function RecentUploads() {
  const uploadedItems = [
    {
      name: "Background.png",
      date: new Date(),
      image: "https://picsum.photos/100",
    },
    {
      name: "Notes(2).pdf",
      date: new Date("12/2/2023"),
      image: "https://picsum.photos/101",
    },
    {
      name: "Notes.pdf",
      date: new Date("9/2/2023"),
      image: "https://picsum.photos/102",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Title title="Recent Uploads" />

      <div className="flex flex-wrap justify-between">
        {uploadedItems.map((item) => (
          <UploadItem
            name={item.name}
            key={item.name}
            date={item.date}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentUploads;
