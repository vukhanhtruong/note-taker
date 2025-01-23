import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { ProtectedRoute } from "./PrivateRoute";
import { SignUp } from "../pages/SignUp";
import { Dashboard } from "../pages/Dashboard";
import { AuthProvider } from "@/contexts/AuthContext";
import { NoteProvider } from "@/contexts/NoteContext";
import { Share } from "@/pages/Share";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/signin" />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/share/:id", // Dynamic segment for an ID
    element: <Share />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <NoteProvider>
            <Dashboard />
          </NoteProvider>
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
