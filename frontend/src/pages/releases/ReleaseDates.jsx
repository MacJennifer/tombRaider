import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ButtonRound from "../../components/buttons/ButtonRound";
// import ButtonAdd from "../../components/buttons/ButtonAdd";
import Footer from "../../components/Footer";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import ButtonEdit from "../../components/buttons/ButtonEdit";
const ReleaseDates = () => {
  const [releaseDates, setReleaseDates] = useState([]);

  useEffect(() => {
    const fetchReleaseDates = async () => {
      try {
        const releaseDatesResponse = await axios.get(
          "http://127.0.0.1:8000/api/releaseDates"
        );
        setReleaseDates(releaseDatesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchReleaseDates();
  }, []);

  const handleDelete = async (releaseDateId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/releaseDates/${releaseDateId}`
      );
      // Supprimer la date
      setReleaseDates(
        releaseDates.filter((releaseDate) => releaseDate.id !== releaseDateId)
      );
    } catch (error) {
      console.error("Error deleting releaseDates:", error);
    }
  };

  return (
    <div className="containerReleaseDates">
      <NavigationAdmin />
      <div className="formReleaseDate">
        <h2 className="text-center mb-4 display-4">Date de sortie</h2>
        <ButtonRound go={`/admin/addReleaseDate/`} />
        <div className="row">
          {releaseDates.map((releaseDate) => (
            <div className="col-md-4" key={releaseDate.id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="titleCard">
                    {releaseDate.date}
                  </Card.Title>

                  <ButtonEdit go={`/admin/editReleaseDate/${releaseDate.id}`} />
                  <ButtonDelete onClick={() => handleDelete(releaseDate.id)} />
                </Card.Body>
              </Card>
            </div>
          ))}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ReleaseDates;
