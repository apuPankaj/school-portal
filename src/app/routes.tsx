import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { Home } from "./pages/Home";
import { PortalLogin } from "./pages/PortalLogin";
import { ParentDashboard } from "./pages/ParentDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { GenericPage } from "./pages/GenericPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "portal-login", Component: PortalLogin },
      { path: "parent-dashboard", Component: ParentDashboard },
      { path: "student-dashboard", Component: StudentDashboard },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: GenericPage },
    ],
  },
]);
