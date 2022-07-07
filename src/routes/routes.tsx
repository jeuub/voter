import { Main, AuthPage, Polls, Poll, CreatePoll } from "@pages";
import { URL } from "@consts";
import type { RouteType } from "@consts";

export const routes: RouteType[] = [
  {
    path: URL.MAIN,
    element: <Main />,
  },
  {
    path: URL.LOGIN,
    element: <AuthPage authType="LOGIN" />,
  },
  {
    path: URL.REGISTER,
    element: <AuthPage authType="REGISTRATION" />,
  },
  {
    path: URL.ADMIN,
    element: <AuthPage authType="ADMIN" />,
  },
  {
    path: URL.POLLS,
    element: <Polls />,
  },
  {
    path: URL.POLL,
    element: <Poll />,
  },
  {
    path: URL.POLLS_CREATE,
    element: <CreatePoll />,
  },
];
