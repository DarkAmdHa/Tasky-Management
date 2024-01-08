function TaskCardSkeleton({ count }: { count: number }) {
  return (
    <>
      {[...Array(count)].map((item: number) => (
        <div
          key={item}
          className="bg-tertiary flex items-center gap-4 rounded-xl p-4 transition pointer-events-none opacity-75  shining"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-52 h-2 bg-gray-200"></div>
        </div>
      ))}
    </>
  );
}

export default TaskCardSkeleton;
