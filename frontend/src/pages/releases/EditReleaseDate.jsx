import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";

const EditReleaseDate = () => {
  const { releaseDateId } = useParams();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [date, setDate] = useState("");

  useEffect(() => {
    getReleaseDates();
  }, []);

  const getReleaseDates = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/releaseDates/${releaseDateId}`
      );
      const { date } = response.data;
      setDate(date);
    } catch (error) {
      console.error("Error fetching releaseDates:", error);
    }
  };

  const updateReleaseDate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("date", date);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/releaseDates/${releaseDateId}`,
        formData
      );
      navigate("/admin/releaseDates");
    } catch (error) {
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Error updating releaseDates:", error);
      }
    }
  };

  return (
    <div>
      <div className="containerEditReleaseDate">
        <NavigationAdmin />

        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
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

                  <Form onSubmit={updateReleaseDate}>
                    <Row>
                      <Col>
                        <Form.Group controlId="date">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="text"
                            value={date}
                            onChange={(event) => {
                              setDate(event.target.value);
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

export default EditReleaseDate;
