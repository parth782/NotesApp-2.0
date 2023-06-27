import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card, useAccordionButton } from 'react-bootstrap';
import { Link,Navigate } from 'react-router-dom';

import MainScreen from '../../components/MainScreen';
import axios from 'axios';

const MyNotes = () => {
 
  const user = JSON.parse(localStorage.getItem("userInfo"));
 

  const [data, setData] = useState([]);
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/notes/${id}`, config);
        alert('Note successfully deleted');
        getNotes();
      } catch (error) {
        alert('Invalid  Action');
        console.log(error);
      }
    }
  }
  const getNotes = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { data } = await axios.get(`/api/notes`, config);
    // console.log(_id);
    // console.log(data);
    setData(data);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <button
        type="button"
        style={{ backgroundColor: "white" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
 
  useEffect(() => {
    if(user){
    getNotes();
    }
  }, []);
  if(!user){
    return (<Navigate to="/login" />);
  }
  else{
 
  return (
    <MainScreen title={`Welcome back ${user.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6, marginLeft: 10 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {
        data.map((note, idx) => {
          return (
            <Accordion defaultActiveKey={`${idx}`}>
              <Accordion.Item eventKey={`${idx}`}>
                <Card key={`${idx}`}>
                  <CustomToggle eventKey={`${idx}`}>
                    <Card.Header style={{ display: "flex" }} key={`${idx}`}>
                      <span
                        style={{
                          color: "black",
                          textDecoration: "none",
                          cursor: "pointer",
                          flex: 1,
                          width: "100%",
                          alignSelf: "center",
                          fontSize: 18,
                        }} key={`${idx}`}
                      >
                        {note.title}
                      </span>
                      <div key={`${idx}`}>
                        <Link to={`/api/notes/${note._id}`} key={`${idx}`}>
                          <Button onClick={() => {
                            localStorage.setItem(
                              "noteId",
                              JSON.stringify(note._id)
                            );
                          }} key={`${idx}`}>Edit</Button>
                        </Link>
                        <Button
                          key={`${idx}`}
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandle(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                  </CustomToggle>
                  <Accordion.Collapse eventKey={`${idx}`}>
                    <Card.Body key={`${idx}`}>
                      <h4 key={`${idx}`}>
                        <Badge
                          bg="success"
                          color="white"
                          text="light"
                          key={`${idx}`}
                        >
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0" key={`${idx}`}>
                        <p>{note.content}</p>
                        <footer className="blockquote-footer" key={`${idx}`}>
                          Created on {note.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          );
        })
      }
    </MainScreen>
  );
    }
}

export default MyNotes