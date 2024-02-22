import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";

const AddReleaseDate = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [date, setDate] = useState("");

  const addReleaseDates = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("date", date);

    await axios
      .post(`http://127.0.0.1:8000/api/releaseDates`, formData)
      .then(navigate("/admin/releaseDates"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <div className="containerAddReleaseDate">
        <NavigationAdmin />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body ">
                <h4 className="card-title">Création d'une date</h4>
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
                  <Form onSubmit={addReleaseDates}>
                    <Row>
                      <Col>
                        <Form.Group controlId="date">
                          <Form.Label>date</Form.Label>
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

export default AddReleaseDate;
