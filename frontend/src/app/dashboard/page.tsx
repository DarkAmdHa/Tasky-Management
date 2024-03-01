"use client";
import RecentTasks from "../ui/dashboard/RecentTasks";
import RecentUploads from "../ui/dashboard/RecentUploads";
import CurrentProjects from "../ui/dashboard/CurrentProjects";
import AddProjectsCard from "../ui/dashboard/AddProjectsCard";
import AddFilesCard from "../ui/AddFilesCard";
import { useState, useEffect } from "react";
import { getDashboardData } from "@/lib/functions";

export default function Page() {
  const [dashboardData, setDashboardData] = useState({
    latestProjects: [],
    latestUploads: [],
    currentTasks: [],
    isLoading: true,
    errorMessage: {},
  });

  useEffect(() => {
    const getDashboardDataAsync = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(prev=>({
          ...prev,
          isLoading: false,
          latestProjects: data.latestProjects,
          currentTasks: data.latestProjects.length && data.latestProjects[0].latest_tasks,
          latestUploads: data.latestUploads,
        }));
      } catch (e) {
        //TODO: Implement Alert
      }
    };
    getDashboardDataAsync();
  }, []);
  return (
    <div className="flex gap-4  px-6 py-8  rounded-lg bg-white shadow-lg">
      <div className="flex flex-col w-5/12 gap-10">
        <RecentTasks dashboardData={dashboardData} />
        <RecentUploads dashboardData={dashboardData} />
      </div>
      <div className="w-5/12">
        <CurrentProjects
          dashboardData={dashboardData}
          setDashboardData={setDashboardData}
        />
      </div>
      <div className="flex gap-4 flex-col  w-2/12">
        <div className="mt-6"></div>
        <AddProjectsCard />
        <AddFilesCard />
      </div>
    </div>
  );
}
