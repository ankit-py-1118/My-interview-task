import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  const [cred, setCred] = useState({
    email: "",
    password: "",
    confirmPassword: ""
})

const handleChange = (e) => {
    setCred(pre => ({
        ...pre, 
        [e.target.name]: e.target.value 
    }))
}


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
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange}  name="email" type="email" placeholder="vertex@signage.com" />
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange}  name="password" type="password" placeholder="********" />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control onChange={handleChange}  name="confirmPassword" type="password" placeholder="********" />
          </Form.Group>
          <div style={{display: 'flex',alignContent:'center'}}>
            <p> Have account?</p>
            <Button onClick={() => navigate("/")} variant="link">Login </Button>
          </div>
          <Button >SignUp</Button>
        </Form>
      </div>
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
