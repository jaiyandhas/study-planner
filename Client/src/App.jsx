import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePlan from "./pages/CreatePlan";
import EditPlan from "./pages/EditPlan";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="create" element={<CreatePlan />} />
          <Route path="edit/:id" element={<EditPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
