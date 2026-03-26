import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";

// vérifier si connecté
const isAuthenticated = () => {
  return localStorage.getItem("user");
};

// protéger les routes
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#333", color: "white" }}>
        <Link to="/" style={{ margin: 10, color: "white" }}>Home</Link>
        <Link to="/register" style={{ margin: 10, color: "white" }}>Register</Link>
        <Link to="/login" style={{ margin: 10, color: "white" }}>Login</Link>
        <Link to="/admin" style={{ margin: 10, color: "white" }}>Admin</Link>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          style={{ marginLeft: 10 }}
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;