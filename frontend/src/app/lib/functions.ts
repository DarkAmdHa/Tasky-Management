import { RegisterObject, projectForm } from "@/app/lib/definitions";
import axios, { AxiosError } from "axios";

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
