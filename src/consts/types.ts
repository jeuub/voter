export type RouteType = {
  path: string;
  element: any;
};

export type UserAuthorizationType = {
  username: string;
  password: string;
}

export type UserType = {
  username: string;
  id: string;
  admin?: boolean;
}

export type Option = {
  votes: number;
  _id: string;
  option: string;
}

export type Poll = {
  voted: string[];
  _id: string;
  question: string;
  user: UserType;
  options: Option;
  created: string;
}

export type CreatingPoll = {
  question: string;
  options: string[];
}