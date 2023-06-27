import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate,Navigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import './EditNote.css';

const EditNote = () => {


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const noteId = JSON.parse(localStorage.getItem("noteId"));
  



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        `/api/notes/${noteId}`,
        { title, category, content },
        config
      );
      alert("Successfully Updated");
      navigate("/mynotes");
    } catch (error) {
      alert('Please fill all the fields');
    }
  };

  const fetchnote = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes/${noteId}`, config);
      //console.log(data);
      setTitle(data.title);
      setCategory(data.category);
      setContent(data.content);
    } catch (error) {
      console.log(error);
      alert('Please fill all the fields');

    }
  }
  useEffect(() => {
    if (user) {
      fetchnote();
    }
  }, [])
  if (!user) {
    return (<Navigate to="/login" />);
  }
  else {

    return (
      <MainScreen title="Update a Note">
        <div className="mainEditNote">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              />
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              EDIT
            </Button>
          </Form>
        </div>
      </MainScreen>
    );
  }
}

export default EditNote