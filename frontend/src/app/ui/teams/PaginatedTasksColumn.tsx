import { Project, Task } from "@/lib/definitions";
import { getPaginatedTasks } from "@/lib/functions";
import React, { useEffect, useState, useRef } from "react";
import Spinner from "../Spinner";
import TaskCard from "../TaskCard";
import Link from "next/link";

function PaginatedTasksColumn({ project }: { project: Project }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getTasks = async (projectId: number) => {
      try {
        const { tasks } = await getPaginatedTasks(projectId, page);
        if (page > 1) {
          setTasks((prevTasks) => [...prevTasks, ...tasks.data]);
        } else {
          setTasks(tasks.data);
        }
        setLastPage(tasks.last_page);
      } catch (e) {
        //TODO: HANDLE ERROR
      } finally {
        setIsLoading(false);
      }
    };
    getTasks(project.id);
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const el = scrollableDivRef.current;
      if (!el) return;

      if (el && el.scrollHeight - el.scrollTop <= el.clientHeight + 10) {
        if (lastPage > 1 && page !== lastPage) {
          setPage((currentPage) => currentPage + 1);
        }
      }
    };

    const el = scrollableDivRef.current;
    if (el) {
      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [lastPage, page]);

  return (
    <div
      ref={scrollableDivRef}
      className="flex border border-gray rounded basis-1/3 shrink-0 shadow max-h-[400px] overflow-auto flex-col"
    >
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="p-4 sticky top-0 bg-white shadow"
      >
        <p className="text-xl font-semibold">{project.name} Tasks</p>
      </Link>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-4 p-4">
          {isLoading ? (
            <Spinner customClass="regularSpinner" />
          ) : (
            <>
              {tasks.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
              {page != lastPage && <Spinner customClass="regularSpinner" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginatedTasksColumn;
