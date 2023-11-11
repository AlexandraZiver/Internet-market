import User from "../components/User";
import Register from "../components/Register";
import Login from "../components/Login";

const authRoutes = [
  {
    path: "/user",
    Component: User,
  },
];

const publicRoutes = [
  {
    path: "/auth",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
];

export { authRoutes, publicRoutes };
