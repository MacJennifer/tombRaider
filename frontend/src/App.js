import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Navigate
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Details from "./pages/details";
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
          path="/details/:id"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Details />
              ) : (
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Admin />
              ) : (
                <redirect to="/admin" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
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
                <redirect to="/home" replace={true} />
              )
            ) : (
              <redirect to="/" replace={true} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
