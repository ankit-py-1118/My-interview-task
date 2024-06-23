import React from "react";
import { Badge, Button } from "react-bootstrap";

const Home = () => {

    const handleLogOut = () => {

    };
    
  return (
    <div style={{ padding: 20 }}>
      <div style={{display: "flex", justifyContent:"space-between"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontFamily: "sans-serif" }}>Vertex Task Manager</h1>
          <img
            style={{ width: 50, height: 50, marginLeft: 10 }}
            src={require("../assets/task.png")}
          />
        </div>
        <Button variant="danger">Log out</Button>
      </div>
      <hr />
    </div>
  );
};

export default Home;
