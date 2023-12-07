import Image from "next/image";
function UploadItem({
  image,
  name,
  date,
}: {
  image: string;
  name: string;
  date: Date;
}) {
  return (
    <div className="flex gap-4 items-center opacity-80 cursor-pointer p-2 transition hover:opacity-100 w-1/2">
      <Image
        src="https://picsum.photos/100"
        width={50}
        height={50}
        className="rounded-2xl overflow-hidden w-3/12"
        alt=""
      />
      <div className="w-9/12">
        <p className="text-semibold text-sm break-words">{name}</p>
        <p className="text-gray-500 text-sm">{date.toDateString()}</p>
      </div>
    </div>
  );
}

export default UploadItem;
