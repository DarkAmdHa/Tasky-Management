export type Project = {
  id: number;
  projectName: string;
  projectDescription: string;
  percentageCompleted: number;
};

export type Task = {
  id: number;
  name: string;
  status: string;
};

export type AlertObject = {
  message: string;
  severity: "info" | "success" | "warning" | "error";
  timeout?: number;
  handleDismiss: () => void;
};

export type RegisterObject = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type projectForm = {
  title: string;
  description: string;
};
