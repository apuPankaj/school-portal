import { createHashRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { Home } from "./pages/Home";
import { PortalLogin } from "./pages/PortalLogin";
import { ParentDashboard } from "./pages/ParentDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admission } from "./pages/Admission";
import { GenericPage } from "./pages/GenericPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "portal-login", Component: PortalLogin },
      { 
        path: "parent-dashboard", 
        element: <ProtectedRoute allowedRole="parent"><ParentDashboard /></ProtectedRoute> 
      },
      { 
        path: "student-dashboard", 
        element: <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute> 
      },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "admission", Component: Admission },
      { path: "*", Component: GenericPage },
    ],
  },
]);
