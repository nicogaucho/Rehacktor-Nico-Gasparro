import { Outlet } from "react-router";
import NavbarUI from "../components/NavbarUI";

export default function AppLayout() {
  return (
    <div className="reset">
      <NavbarUI />
      <Outlet />
    </div>
  );
}
