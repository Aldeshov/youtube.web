import React, { useReducer, useState } from "react"
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'
import { BiLogIn } from 'react-icons/bi'

import { APIRequest } from '../../tools/API';
import { BASE_URL } from "../../tools/Config";

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'loading':
            return { loading: true, error: false, data: "" };
        case 'successful':
            return { loading: false, error: false, data: action.payload };
        case 'error':
            return { loading: false, error: true, data: action.payload };
        default:
            throw new Error('Undefined value')
    }
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const globalDispatch = useDispatch();

    const [state, dispatch] = useReducer(reducer, {
        loading: false, error: false, data: null
    })

    function onSubmit(event: any) {
        event.preventDefault();
        dispatch({ type: 'loading', payload: "" });
        
        APIRequest<any>(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(data => {
                dispatch({ type: 'successful', payload: data.token });
                globalDispatch({ type: 'PUT', payload: data.token })
                navigate('/', { replace: true })
            })
            .catch((error: Error) => {
                if (error.message === 'Bad Request') {
                    dispatch({ type: 'error', payload: "Username or password is incorrect" });
                }
                else {
                    dispatch({ type: 'error', payload: error.message });
                }
            })
    }

    return (
        <React.Fragment>
            <Stack gap={2} className="col-md-5 mx-auto" style={{ marginTop: "50px" }}>
                <h1 style={{ textAlign: "center", marginTop: "32px" }}>
                    <Badge bg="secondary">Login page</Badge>
                </h1>
                <Container>
                    <Form method="POST" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else. <Link to='/login'>Privacy policy and Terms of use</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCheckbox">
                            <Form.Check type="checkbox" label="Stay logged in" />
                        </Form.Group>

                        {state.error && (
                            <Alert variant="danger">
                                {state.data}
                            </Alert>
                        )}

                        <Button variant="primary" type="submit">
                            <BiLogIn style={{ marginBottom: '4px' }} /> Submit
                        </Button>
                    </Form>
                </Container>
            </Stack>
        </React.Fragment>
    )
}