import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [cred, setCred] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setCred(pre => ({
            ...pre, 
            [e.target.name]: e.target.value 
        }))
    }

    console.log(cred, "crereaera")
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" onChange={handleChange} type="email" placeholder="vertex@signage.com" />
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name="password" type="password" placeholder="********" />
          </Form.Group>
          <div style={{display: 'flex',alignContent:'center'}}>
            <p>Don't have account?</p>
            <Button onClick={() => navigate("/signup")} variant="link">Sign up</Button>
          </div>
          <Button >Login</Button>
        </Form>
      </div>
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
