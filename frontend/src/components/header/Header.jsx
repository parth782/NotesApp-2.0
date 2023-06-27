import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">NoteZipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          {localStorage.getItem("userInfo") !== null && (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

              <NavDropdown
                title={JSON.parse(localStorage.getItem("userInfo")).name}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item>
                  <Link to='/mynotes'>My Notes</Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    // console.log(localStorage.getItem("userInfo"));
                    // const x = JSON.parse(localStorage.getItem("userInfo"));
                    // console.log(x);
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("noteId");
                    // console.log(localStorage.getItem("userInfo"));
                    navigate("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header