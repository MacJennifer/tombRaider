import React from "react";
import { Nav } from "react-bootstrap";
// import "../../styles/style.sccs";
import { Link } from "react-router-dom";
import image from "../../assets/images/avatarAdmin.jpg";

function Sidebar() {
  return (
    <div className="containerAdmin">
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Link to="/admin">
            <img src={image} alt="Lara Croft" className="imgAdmin" />
          </Link>
          <Nav.Link href="/home" className="navBar">
            Accueil
          </Nav.Link>
          <Nav.Link href="admin/games" className="navBar">
            Games
          </Nav.Link>
          <Nav.Link href="admin/releaseDates" className="navBar">
            ReleaseDate
          </Nav.Link>
        </Nav>
      </div>
      <div className="imgBackground">
        <div className="background-image"></div>
      </div>
    </div>
  );
}

export default Sidebar;
