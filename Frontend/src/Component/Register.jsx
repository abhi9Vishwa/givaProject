import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import  axios  from "axios";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  

  function validateForm() {
    return email.length > 0 && password.length > 0 && cPassword === password;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios("http://localhost:5000/createU",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password
      })
      })
      .then(function(response) {
        //redirect logic
        if (response.status === 200) {
                window.location = "/login" 
        }
    })
    } catch (error) {
      console.error(error);
    }
  }
    
  


  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
      
    </div>
  );
}