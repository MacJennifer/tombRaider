import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import ButtonAdd from "../../components/buttons/ButtonAdd";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import ButtonEdit from "../../components/buttons/ButtonEdit";

const Games = () => {
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

  const handleDelete = async (gameId) => {
    try {
      await axios.delete(`http://localhost:8000/api/games/${gameId}`);
      // Supprimer l'article
      setGames(games.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <div className="containerGames">
      <h2 className="text-center mb-4 display-4">Games</h2>
      <ButtonAdd go="/admin/addGame" />
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4" key={game.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{game.titleGames}</Card.Title>
                <Card className="mb-4">
                  <img
                    src={`http://localhost:8000/storage/uploads/${game.image}`}
                    alt="Lara Croft"
                    style={{ width: "50%", height: "50%" }}
                  />
                </Card>
                <Card.Text>{game.gender}</Card.Text>
                <Card.Text>{game.platform}</Card.Text>
                <Card.Text>{game.editor}</Card.Text>
                <Card.Text>{game.description}</Card.Text>
                <ButtonEdit go={`/admin/editGame/${game.id}`} />
                <ButtonDelete onClick={() => handleDelete(game.id)} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;