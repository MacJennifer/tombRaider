import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [titleGames, setTitleGames] = useState("");
  const [gender, setGender] = useState("");
  const [platform, setPlatform] = useState("");
  const [editor, setEditor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [release_id, setReleaseId] = useState("");
  const [releaseDates, setReleaseDates] = useState([]);

  const changeHandler = (event) => {
    console.log(event);
    setImage(event.target.files[0]);
    console.log("Updated image:", event.target.files[0]);
  };

  const handleChange = (event) => {
    setReleaseId(event.target.value);
  };

  useEffect(() => {
    getReleaseDates();
  }, []);

  const getReleaseDates = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/releaseDate");

      setReleaseDates(res.data.data);
    } catch (error) {
      console.error("Error fetching release dates:", error);
    }
  };
  const addArticles = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titleGames", titleGames);
    formData.append("gender", gender);
    formData.append("platform", platform);
    formData.append("editor", editor);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("release_id", release_id);

    await axios
      .post(`http://127.0.0.1:8000/api/games`, formData)
      .then(navigate("/admin/games"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Création d'un jeu</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Row>
                    <Col>
                      <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form onSubmit={addArticles}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleGames">
                          <Form.Label>Titre</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleGames}
                            onChange={(event) => {
                              setTitleGames(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="description">
                          <Form.Label>Description : </Form.Label>
                          <Form.Control
                            type="text"
                            value={description}
                            onChange={(event) => {
                              setDescription(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="gender">
                          <Form.Label>Genre : </Form.Label>
                          <Form.Control
                            type="text"
                            value={gender}
                            onChange={(event) => {
                              setGender(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="platform">
                          <Form.Label>Platform : </Form.Label>
                          <Form.Control
                            type="text"
                            value={platform}
                            onChange={(event) => {
                              setPlatform(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="editor">
                          <Form.Label>Editeur : </Form.Label>
                          <Form.Control
                            type="text"
                            value={editor}
                            onChange={(event) => {
                              setEditor(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Catégorie</Form.Label>
                          <Form.Control
                            as="select"
                            value={release_id}
                            onChange={handleChange}
                          >
                            {releaseDates.map((releaseDate) => (
                              <option
                                key={releaseDate.id}
                                value={releaseDate.id}
                              >
                                {releaseDate.releaseDate}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;
