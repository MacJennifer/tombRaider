import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Navigate
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/games" element={<Game />} />
        <Route path="/admin/addGame" element={<AddGame />} />
        <Route path="/admin/editGame/:gameId" element={<EditGame />} />
        <Route path="/admin/releaseDates" element={<ReleaseDates />} />
        <Route path="/admin/addReleaseDate" element={<AddReleaseDate />} />
        <Route
          path="/admin/editReleaseDate/:releaseDateId"
          element={<EditReleaseDate />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
