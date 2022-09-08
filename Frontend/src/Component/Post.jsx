import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useEffect } from "react";
import MyVerticallyCenteredModal from './modal';


export default function Posts(props) {
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [auth, setAuth] = useState("");

    const [posts, setPosts] = useState([
        {
            email: "",
            title: "",
            desc: "",
        }
    ]);

    useEffect(() => {
        fetch("http://localhost:5000/getPost")
            .then((res) => res.json())
            .catch((error) => {
                console.log(error);
            })
            .then((jres) => {
                // always executed
                setPosts(jres);
            });

    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    function validateForm() {
        return desc.length > 0 && title.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios("http://localhost:5000/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    // email,
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
    async function editPost(event) {
        event.preventDefault();
        try {
            await axios("http://localhost:5000/editPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    // email,
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


    async function deletePost(event, id) {
        event.preventDefault();
        console.log(id);
        try {
            await axios("http://localhost:5000/deletePost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    id
                })
            }).then(function (response) {
                //redirect logic
                if (response.status === 500) {
                    console.log(id);
                    // window.location = "/login"
                }
                if (response.status === 200) {
                    // alert('Invalid Credentials')
                    window.location = "/post"

                }
            })
                .then((jres) => {
                    // always executed
                    console.log(id);
                })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="Login">
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

                <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </Form>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => {

                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.desc}</td>
                                <td><Button size="sm" variant="primary" onClick={() => { setAuth(post._id); setModalShow(true) }}>Update</Button></td>
                                <td><Button onClick={event => deletePost(event, post._id)} size="sm" variant="danger">Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
                cid={auth}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}