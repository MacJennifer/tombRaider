import React from "react";
import Button from "react-bootstrap/Button";

const ButtonDelete = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      Supprimer
    </Button>
  );
};

export default ButtonDelete;
