import React from 'react';
import './LandingPage.css';
import { Navigate } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  
  if (user) {
    return (<Navigate to="/mynotes" />);
  }
  else {

    return (
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to Note Zipper</h1>
                <p className="subtitle">One Safe place for all your notes</p>
              </div>
              {localStorage.getItem("userInfo") === null && (
                <div className="buttonContainer">
                  <Link to="/login">
                    <Button size="lg" className="landingButton">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="landingButton"
                      variant="outline-primary"
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LandingPage