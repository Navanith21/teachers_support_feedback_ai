import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Write from "./pages/Write";
import View from "./pages/View";
import LessonPlanner from "./pages/LessonPlanner";
import Homework from "./pages/Homework";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/write" element={<Write />} />
        <Route path="/view" element={<View />} />
        <Route path="/lesson-planner" element={<LessonPlanner />} />
        <Route path="/homework" element={<Homework />} />

      </Routes>
    </BrowserRouter>
  );
}
