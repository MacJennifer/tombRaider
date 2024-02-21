import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";

const EditGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [titleGames, setTitleGames] = useState("");
  const [gender, setGender] = useState("");
  const [platform, setPlatform] = useState("");
  const [editor, setEditor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getGame();
  }, []);

  const getGame = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/games/${gameId}`
      );
      const { titleGames, gender, platform, editor, description, image } =
        response.data;
      setTitleGames(titleGames);
      setGender(gender);
      setPlatform(platform);
      setEditor(editor);
      setDescription(description);
      setImage(image);
    } catch (error) {
      console.error("Error fetching game:", error);
    }
  };

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  };
  const updatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("titleGames", titleGames);
    formData.append("gender", gender);
    formData.append("platform", platform);
    formData.append("editor", editor);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post(`http://127.0.0.1:8000/api/games/${gameId}`, formData);
      navigate("/admin/games");
    } catch (error) {
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Error updating game:", error);
      }
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un jeu</h4>
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
                      <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form onSubmit={updatePlace}>
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
                        <Form.Group controlId="gender">
                          <Form.Label>Gender</Form.Label>
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
                          <Form.Label>Platform</Form.Label>
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
                          <Form.Label>Editor</Form.Label>
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
                        <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
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
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Modifier
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

export default EditGame;
