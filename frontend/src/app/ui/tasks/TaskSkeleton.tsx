import CommentFormSkeleton from "./CommentFormSkeleton";
import CommentSkeleton from "./CommentSkeleton";

function TaskSkeleton() {
  return (
    <div className="shining flex flex-col gap-2">
      <div className="w-52 h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-20 h-4 bg-gray-200"></div>
      <CommentSkeleton count={2} />
      <CommentFormSkeleton />
    </div>
  );
}

export default TaskSkeleton;
