import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import './RegisterScreen.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const RegisterScreen = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      setMessage("Passwords doesn't match");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        setLoading(true);
        const { data } = await axios.post('/api/users', { name, email, pass, pic }, config);
        // console.log(data);
        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setEmail("");
        setName("");
        setPass("");
        setConfirmPass("");
        setPic("");
        setLoading(false);
        navigate('/');
        alert('Successfully registered');
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
  }
  if (user) {
    return (<Navigate to="/mynotes" />);
  }
  else {

    return (
      <>
        <MainScreen title="REGISTER">
          <div className="loginContainer">
            {error && (
              <ErrorMessage variant="danger">{"User Already Exist"}</ErrorMessage>
            )}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </Form.Group>
              <Row className="py-3">
                <Col>
                  Have an Account ? <Link to="/login">Login</Link>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </MainScreen>
      </>
    );
  }
}

export default RegisterScreen