import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/reducers/LoginReducer";
import * as Yup from "yup";
import { userSchema } from "../helpers/validator";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(store => store.login)
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrorMessage] = useState("");


  const handleChange = (e) => {
    setCred((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      const data = await userSchema.validate(cred, { abortEarly: false });
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
      dispatch(loginAction(payload, navigate));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(userData?.data?.data?.payload?.token) navigate("/home")
  }, [userData])

  console.log(cred, "crereaera",userData);
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
        <h1>Login To Vertex</h1>
        <p>Manage your task!</p>
        <Form>
          <Form
            noValidate
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="mt-3">Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="vertex@signage.com"
            />
                        {
                errMessage?.email ? <p className="text-danger">{ errMessage?.email}</p> : null
            }
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Label className="mt-3">Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="********"
            />
                        {
                errMessage?.password ? <p className="text-danger">{ errMessage?.password}</p> : null
            }
          </Form>
          <div style={{ display: "flex", alignContent: "center" }}>
            <p>Don't have account?</p>
            <Button onClick={() => navigate("/signup")} variant="link">
              Sign up
            </Button>
          </div>
          <Button onClick={onSubmit}>Login</Button>
        </Form>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "black",
  },
  cardContainer: {},
};
