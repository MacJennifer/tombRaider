import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../assets/images/avatarAdmin.jpg";

const NavigationAdmin = () => {
  return (
    <Navbar className="barAdmin">
      <div className="containerBarAdmin">
        <Link to="/admin">
          <img src={image} alt="Lara Croft" className="imgAdmin" />
        </Link>
        <Navbar.Brand href="/home">Accueil</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin">
              Tableau de bord
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationAdmin;
