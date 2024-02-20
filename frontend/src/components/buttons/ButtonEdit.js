import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function ButtonEdit({ go }) {
  return (
    <>
      <Link to={go}>
        <Button variant="success">Modifier</Button>
      </Link>{" "}
    </>
  );
}

export default ButtonEdit;
