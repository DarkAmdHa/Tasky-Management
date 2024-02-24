export type PaginationObject<T> = {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  data: T[];
};
export type Project = {
  id: number;
  name: string;
  description: string;
  percentageCompleted?: number;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
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
  name: string;
  description: string;
};

export type Comment = {
  id: number;
  task_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  description: string;
  user: { avatar_src: string };
};

export type ProjectWithTasks = {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
};

export type Team = {
  id: number;
  name: string;
  projects: PaginationObject<Project>;
  users: UserObject[];
};

export type SearchResults = {
  isLoading: Boolean;
  projects: Project[];
  tasks: Task[];
  teams: Team[];
};

export type UserObject = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  profession: string;
  phone: string;
  teams?: [Team];
  avatar_src: string;
};

export type InviteObject = {
  id: number;
  status: string;
  invited_by: string;
  invited_by_name?: string; 
  invited_by_img?: string; 
  team:Team;
}
export type AuthObject = {
  user: UserObject;
  pendingInvites: InviteObject[];
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
