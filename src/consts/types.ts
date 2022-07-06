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