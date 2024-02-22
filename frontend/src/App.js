import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"; //Navigate
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddGame from "./pages/games/AddGame";
import EditGame from "./pages/games/EditGame";
import Game from "./pages/games/Games";
import AddReleaseDate from "./pages/releases/AddReleaseDate";
import EditReleaseDate from "./pages/releases/EditReleaseDate";
import ReleaseDates from "./pages/releases/ReleaseDates";
// import Users from "./pages/users/Users";
import auth from "./services/token";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route
          path="/admin"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Admin />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin/games"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Game />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin/addGame"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddGame />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/admin/editGame/:gameId"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <EditGame />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/admin/releaseDates"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <ReleaseDates />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

        <Route
          path="/admin/addReleaseDate"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddReleaseDate />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin/editReleaseDate/:releaseDateId"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <EditReleaseDate />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
