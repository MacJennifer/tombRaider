import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ButtonRound({ go }) {
  return (
    <>
      <Link to={go} className="buttonLink">
        <Button variant="dark" className="buttonRound">
          <span>+</span>
        </Button>
      </Link>{" "}
    </>
  );
}

export default ButtonRound;
