export interface IProjectData {
  id: string;
  name: string;
  status: string;
  manager: string;
  developers: IUserData[];
}

export interface IUserData {
  id: string;
  name: string;
  position: string;
  email: string;
  assignment: string;
}
