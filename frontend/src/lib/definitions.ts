export type Project = {
  id: number;
  name: string;
  description: string;
  percentageCompleted?: number;
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

export type LoginObject = {
  email: string;
  password: string;
};

export type projectForm = {
  title: string;
  description: string;
};

export type Comment = {
  userId: number;
  userName: string;
  comment: string;
  date: string;
  isEdited: boolean;
};

export type ProjectWithTasks = {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
};

export type UserObject = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthObject = {
  user: UserObject | {};
  isLoading: boolean;
  isAuthenticating: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: Object;
};

export type DashboardObject = {
  latestProjects: Project[] | [];
  latestUploads: Upload[] | [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: Object;
};

export type Upload = {};
