import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useEffect } from "react";


export default function MyVerticallyCenteredModal(props) {

    const [auth, setAuth] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    console.log(props);
    function validateForm() {
        return desc.length > 0 && title.length > 0;
    }

    async function handleSubmit(event) {
        setAuth(props.cid);
        console.log(auth);
        event.preventDefault();
        try {
            await axios("http://localhost:5000/editPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    auth,
                    title,
                    desc
                })
            }).then(function (response) {
                //redirect logic
                if (response.status === 300) {
                    alert('Invalid Credentials')
                    // window.location = "/login"
                }
                if (response.status === 200) {
                    // alert('Invalid Credentials')
                    window.location = "/post"
                }
            })
        } catch (error) {
            console.error(error);
        }

    }
    function wrap() {
        handleSubmit();
        props.onHide();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            role={4}
                            type="password"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>

                    <Button onClick={wrap} block="true" size="lg" type="submit" disabled={!validateForm()}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
