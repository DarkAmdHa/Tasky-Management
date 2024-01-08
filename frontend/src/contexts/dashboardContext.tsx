"use client";
import { DashboardObject } from "@/lib/definitions";
import { getDashboardData } from "@/lib/functions";
import { createContext, useState, useEffect } from "react";

type DashboardContextType = {
  dashboardData: DashboardObject;
};

const defaultDashboardObject: DashboardObject = {
  latestProjects: [],
  latestUploads: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: {},
};

export const DashboardContext = createContext<DashboardContextType>({
  dashboardData: defaultDashboardObject,
});

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboardData, setDashboardData] = useState({
    latestProjects: [],
    latestUploads: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    errorMessage: {},
  });

  useEffect(() => {
    const getDashboardDataAsync = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData({
          ...dashboardData,
          isLoading: false,
          isSuccess: true,
          latestProjects: data.latestProjects,
          latestUploads: data.latestUploads,
        });
      } catch (e) {
        //TODO: Implement Alert
      }
    };
    getDashboardDataAsync();
  }, []);
  return (
    <DashboardContext.Provider value={{ dashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}
