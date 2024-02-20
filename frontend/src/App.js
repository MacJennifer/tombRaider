import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Navigate
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import AddGame from "./pages/games/AddGame";
import EditGame from "./pages/games/EditGame";
import Game from "./pages/games/Games";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/games" element={<Game />} />
        <Route path="/admin/AddGame" element={<AddGame />} />
        <Route path="/admin/EditGame/:gameId" element={<EditGame />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
