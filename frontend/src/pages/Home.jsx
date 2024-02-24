import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import image from "../assets/images/header.png";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "../styles/style.scss";
const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse = await axios.get(
          "http://127.0.0.1:8000/api/games"
        );
        setGames(gamesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="background">
      <div className="containerHome">
        <Navigation />

        <div className="imgHeader">
          <img src={image} alt="Lara Croft" />
        </div>

        <div className="games">
          {games.map((game) => (
            <div key={game.id}>
              <Card className="cardHome">
                <Card.Body>
                  <Card.Title className="titleCard">
                    {game.titleGames}
                  </Card.Title>
                  <Link to={`/details/${game.id}`}>
                    <img
                      src={`http://localhost:8000/storage/uploads/${game.image}`}
                      alt="Lara Croft"
                      className="imgHome"
                    />
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
