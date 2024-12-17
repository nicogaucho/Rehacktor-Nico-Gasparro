/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../pages/AppHome";
import { preLoadedFilters, fetchGame } from "../lib/fetch";
import AppSignIn from "../pages/AppSignIn";
import AppSignUp from "../pages/AppSignUp";
import AppGenre from "../pages/AppGenre";
import AppGame from "../pages/AppGame";
import AppProfile from "../pages/AppProfile";
import AppAccount from "../pages/AppAccount";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

export function ProtectedRoutes() {
  const session = useContext(SessionContext);

  if (!session) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<AppHome />} loader={preLoadedFilters} />
      <Route path="/signin" element={<AppSignIn />} />
      <Route path="/signup" element={<AppSignUp />} />
      <Route path="/games/:genre_slug" element={<AppGenre />} />
      <Route path="/game/:id" element={<AppGame />} loader={fetchGame} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<AppProfile />} />
        <Route path="/account" element={<AppAccount />} />
      </Route>
    </Route>
  )
);

export default router;
