import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // ✅ import your Navbar
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CreatePoll from "./Pages/CreatePoll";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import MyPolls from "./Pages/MyPolls";
import PollResult from "./Pages/PollResult";
import VotePoll from "./Pages/VotePoll";
function App() {
  return (
    <>
      <Navbar /> {/* ✅ Always render navbar outside <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createpoll"
          element={
            <ProtectedRoute>
              <CreatePoll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mypolls"
          element={
            <ProtectedRoute>
              <MyPolls />
            </ProtectedRoute>
          }
        />

        <Route
          path="/poll/:id/result"
          element={
            <ProtectedRoute>
              <PollResult />
            </ProtectedRoute>
          }
        />

        <Route path="/poll/:id/vote" element={<VotePoll />} />

      </Routes>
    </>
  );
}

export default App;
