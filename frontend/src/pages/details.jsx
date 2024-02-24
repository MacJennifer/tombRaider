import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import image from "../assets/images/header.png";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "../styles/style.scss";

const Details = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [releaseDate, setReleaseDate] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameResponse = await axios.get(
          `http://127.0.0.1:8000/api/games/${id}`
        );
        setGame(gameResponse.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du jeu :",
          error
        );
      }
    };
    fetchGame();
  }, [id]);

  useEffect(() => {
    const fetchReleaseDate = async () => {
      try {
        const releaseDateResponse = await axios.get(
          `http://127.0.0.1:8000/api/releaseDates/${game.release_id}`
        );
        console.log("Release Date Response:", releaseDateResponse.data.date);
        setReleaseDate(releaseDateResponse.data.date);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la date de sortie :",
          error
        );
      }
    };
    if (game) {
      fetchReleaseDate();
    }
  }, [game]);

  return (
    <div className="backgroundDetails">
      <div className="containerDetails">
        <Navigation />
        <div className="imgHeader">
          <img src={image} alt="Lara Croft" />
        </div>

        <div className="details">
          {game && (
            <>
              <Card.Title className="titleCard">{game.titleGames}</Card.Title>
              <img
                src={`http://localhost:8000/storage/uploads/${game.image}`}
                alt={game.titleGames}
                className="imgDetails"
              />
              <p>
                <strong>Genre :</strong> {game.gender}
              </p>
              <p>
                <strong>Plateformes : </strong>
                {game.platform}
              </p>
              <p>
                <strong>Editeur :</strong> {game.editor}
              </p>
              <p>
                <strong>Description :</strong> {game.description}
              </p>

              <p>
                <strong>Date de sortie :</strong>
                {releaseDate}
              </p>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Details;
