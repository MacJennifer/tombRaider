import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/TombRaiderRegister.jpg";
function RegisterForm() {
  document.title = "Inscription au site";

  let navigate = useNavigate();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const email = watch("email", "");
  const password = watch("password", "");
  const pseudoUsers = watch("pseudoUsers", "");
  const role_id = watch("role_id", "1");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => registerForm();

  let registerForm = async () => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("pseudoUsers", pseudoUsers);
      formData.append("role_id", role_id);
      let res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Réponse du serveur :", res);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 422) {
        setError("Email déjà utilisé.");
      } else {
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerRegister">
      <div className="imgRegister">
        <img src={image} alt="Lara Croft" />
      </div>
      <div className="formRegister">
        <Card.Body>
          <Card.Title className="titleRegister">Créer un compte</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicText">
              <Form.Label className="labelRegister">Pseudo</Form.Label>
              <Controller
                name="pseudoUsers"
                control={control}
                defaultValue=""
                rules={{ required: "Pseudo obligatoire" }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Votre pseudo"
                    {...field}
                  />
                )}
              />
              {errors.pseudoUsers && (
                <Form.Text className="text-danger">
                  {errors.pseudoUsers.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="labelRegister">Adresse mail</Form.Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Adresse mail obligatoire" }}
                render={({ field }) => (
                  <Form.Control
                    type="email"
                    placeholder="johndoe@unknown.fr"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="labelRegister">Mot de passe</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiTwotoneEyeInvisible />
                    )}
                  </i>
                </InputGroup.Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Mot de passe est obligatoire",
                    minLength: {
                      value: 8,
                      message: "Longueur minimale de 8 caractères",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                      message:
                        "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe"
                      {...field}
                    />
                  )}
                />
              </InputGroup>
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Créer un compte
            </Button>
          </Form>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Card.Body>
      </div>
    </div>
  );
}

export default RegisterForm;
