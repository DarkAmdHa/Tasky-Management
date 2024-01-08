import { RegisterObject, projectForm, LoginObject } from "@/lib/definitions";
import axios from "./axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

class CustomError extends Error {
  serverErrors: boolean;
  errors: any;

  constructor(serverErrors: boolean, errors: any) {
    super("Custom error occurred");
    this.serverErrors = serverErrors;
    this.errors = errors;
  }
}

export const registerUser = async (
  form: RegisterObject,
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
  initialErrorState: Record<string, string[]>
) => {
  try {
    await getXSRFToken();
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`,
      form
    );
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      throw new CustomError(true, error.response.data.errors);
    } else {
      throw new Error("Server Error");
    }
  }
  // Fetch XSRF token
};

export const loginUser = async (
  form: LoginObject,
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
  initialErrorState: Record<string, string[]>
) => {
  await getXSRFToken();
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
    form
  );
  return resp.data.user;
};

export const getXSRFToken = () => {
  try {
    return axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sanctum/csrf-cookie`
    );
  } catch (e) {
    throw new Error("Error while fetching XSRF token");
  }
};

export const taskUpdate = (taskId: number, taskStatus: string) => {
  taskStatus = taskStatus === "done" ? "ongoing" : "done";
};

export const createProject = (form: projectForm) => {
  console.log("creating");
};

export const createTask = (form: projectForm) => {
  console.log("creating");
};

export const getUser = async () => {
  try {
    await getXSRFToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.log(error);

    throw new Error("Server Error");
  }
};

export const getLatestActiveProjects = async (count: number) => {
  try {
    await getXSRFToken();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/latestProjects`,
      {
        count,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Server Error");
  }
};

export const getLatestActiveTasks = async (count: number) => {
  try {
    await getXSRFToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/latestTasks`,
      {
        credentials: "include",
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          count,
        }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);

    throw new Error("Server Error");
  }
};

export const getLatestUploads = async (count: number) => {
  try {
    await getXSRFToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/latestUploads`,
      {
        credentials: "include",
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({
          count,
        }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);

    throw new Error("Server Error");
  }
};

export const getDashboardData = async () => {
  try {
    await getXSRFToken();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardData`
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Server Error");
  }
};

export const logoutUser = async () => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logout`
    );
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      throw new CustomError(true, error.response.data.errors);
    } else {
      throw new Error("Server Error");
    }
  }
};
