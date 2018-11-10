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

export interface IAccessCookie {
  email: string;
  position: string;
}

// this is needed since it is transformed to a JSON post request
// export interface IMessage {
//   recipients: string[];
//   sender: string;
//   text: string;
// }
export interface IMessage {
  email: string;
}
