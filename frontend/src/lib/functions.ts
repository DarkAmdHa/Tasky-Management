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

export const registerUser = async (form: RegisterObject) => {
  await getXSRFToken();
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`,
    form
  );
  return resp.data.user;
  // Fetch XSRF token
};

export const loginUser = async (form: LoginObject) => {
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

export const getProjects = async (page: Number) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/projects?page=${page}`
  );
  return resp.data;
};
export const getProjectsWithTasks = async (page: Number) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks?page=${page}`
  );
  return resp.data;
};

export const getProjectWithTasks = async (id: number) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/projects/${id}`
  );
  return resp.data;
};
export const getTask = async (id: number) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/${id}`
  );
  return resp.data;
};

export const createTask = async ({
  name,
  description,
  projectId,
}: {
  name: string;
  description: string;
  projectId: number;
}) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks`,
    {
      projectId,
      name,
      description,
    }
  );
  return resp.data;
};

export const createProject = async ({ name, description }: projectForm) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/projects`,
    {
      name,
      description,
    }
  );
  return resp.data;
};

export const createComment = async (taskId: number, comment: string) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/comments`,
    {
      taskId,
      commentDescription: comment,
    }
  );
  return resp.data;
};

export const updateProfile = async (updateObj: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  profession?: string;
}) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/userProfile`,
    updateObj
  );
  return resp.data;
};

export const updateProfilePic = async (formData: FormData) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/userProfileImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return resp.data;
};
