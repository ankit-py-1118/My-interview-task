import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Card, Toast} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "../redux/reducers/SignUpReducer";
import { signUpSchema, userSchema } from "../helpers/validator";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setCred((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      const data = await signUpSchema.validate(cred, { abortEarly: false });
      setSuccess(true);
      setError(false);

      handleLogin(data);
    } catch (err) {
      setSuccess(false);
      setError(true);
      if (err instanceof Yup.ValidationError) {
        const yupError = {};
        console.log(err.inner[0], "yuperror");
        err.inner.forEach((innerError) => {
          yupError[innerError.path] = innerError.message;
        });
        setErrorMessage(yupError);
      }
      console.log(error);
    }
  };

  const handleLogin = (payload) => {
    console.log("login", payload);
    try {
      dispatch(signUpAction(payload));
      // setCred({
      //   email: "",
      //   password: "",
      // })
    } catch (err) {
      console.error(err);
    }
  };

  console.log(cred, "jgklhk",errMessage);
  return (
    <div style={styles.container}>
      <img
        style={{ width: "30%", height: "100%" }}
        src={require("../assets/login.jpg")}
      />
      <div
        style={{
          padding: "1rem",
          borderWidth: 10,
          borderColor: "white",
          margin: 20,
          borderTopWidth: 1,
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <h1>Sign UP To Vertex</h1>
        <p>Manage your task!</p>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control onChange={handleChange}  name="name" type="text" placeholder="John Doe" />
            {
                errMessage?.name ? <p className="text-danger">{ errMessage?.name}</p> : null
            }
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange}  name="email" type="email" placeholder="vertex@signage.com" />
            {
                errMessage?.email ? <p className="text-danger">{ errMessage?.email}</p> : null
            }
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange}  name="password" type="password" placeholder="********" />
            {
                errMessage?.password ? <p className="text-danger">{ errMessage?.password}</p> : null
            }
          </Form.Group>
          <div style={{display: 'flex',alignContent:'center'}}>
            <p> Have account?</p>
            <Button onClick={() => navigate("/")} variant="link">Login </Button>
          </div>
          <Button onClick={onSubmit} >SignUp</Button>
        </Form>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default SignUp;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "black",
  },
  cardContainer: {},
};
