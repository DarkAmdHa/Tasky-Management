function ProjectCardSkeleton({ count }: { count: number }) {
  const array = [...Array(count)];
  return (
    <>
      {array.map((item: number) => (
        <div
          key={item}
          className="shining rounded-xl bg-tertiary opacity-75 transition py-8 px-4 pointer-events-none flex gap-5 items-center justify-between"
        >
          <div className="w-9/12 flex flex-col gap-2 ">
            <div className="w-52 h-2 bg-gray-200"></div>
            <div className="w-96 h-2 bg-gray-200"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      ))}
    </>
  );
}

export default ProjectCardSkeleton;
