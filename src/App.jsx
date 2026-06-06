import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateReport from "./pages/CreateReport";
import ChatBot from "./pages/ChatBot";
import AdminPengaduan from "./pages/AdminPengaduan";
import AdminMasyarakat from "./pages/AdminMasyarakat";
import CSAdmin from "./pages/CSAdmin";
import AdminChat from "./pages/AdminChat";
import Profile from "./pages/Profile";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* USER */}
        <Route
          path="/userdashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/create-report"
          element={<CreateReport />}
        />

        <Route
          path="/chatbot"
          element={<ChatBot />}
        />

        <Route
          path="/cs-admin"
          element={<CSAdmin />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ADMIN */}
        <Route
          path="/admindashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/pengaduan"
          element={<AdminPengaduan />}
        />

        <Route
          path="/admin/masyarakat"
          element={<AdminMasyarakat />}
        />

        <Route
          path="/admin/chat"
          element={<AdminChat />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;