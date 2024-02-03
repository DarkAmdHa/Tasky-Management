import { SearchResults } from "@/lib/definitions";
import React from "react";
import Spinner from "./Spinner";
import Link from "next/link";
import ProjectsSearchResult from "./Search/ProjectsSearchResult";
import TasksSearchResult from "./Search/TasksSearchResult";
import TeamsSearchResult from "./Search/TeamsSearchResult";

function SearchResults({ results }: { results: SearchResults }) {
  return (
    <div className="absolute top-full bg-white w-full shadow-lg flex flex-col gap-2 max-h-[600px] overflow-auto">
      {results.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ProjectsSearchResult projects={results.projects} />
          <TasksSearchResult tasks={results.tasks} />
          <TeamsSearchResult teams={results.teams} />
        </div>
      )}
    </div>
  );
}

export default SearchResults;
