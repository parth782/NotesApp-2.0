import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '..//../components/MainScreen';
import './LoginScreen.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            setLoading(true);
            const { data } = await axios.post('/api/users/login', { email, pass }, config);
            // console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setEmail("");
            setPass("");
            setLoading(false);
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                navigate("/mynotes");
            }
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    return (
        <>
            <MainScreen title="LOGIN">
                <div className="loginContainer">
                    {error && <ErrorMessage variant="danger">{"Invalid Credentials"}</ErrorMessage>}
                    {loading && <Loading/>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value);}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={pass}
                                onChange={(e)=>{setPass(e.target.value);}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Row className="py-3">
                            <Col>
                                New Customer? &nbsp;
                                <Link to='/register'>
                                    Register Here
                                </Link>     
                            </Col>
                        </Row>
                    </Form>
                </div>
            </MainScreen>
        </>
    );
}

export default LoginScreen