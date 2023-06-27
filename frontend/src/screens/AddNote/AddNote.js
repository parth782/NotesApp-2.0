import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen'
import './AddNote.css';

const AddNote = () => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('/api/notes/create', { title, category, content }, config);
      // console.log(data);
      alert("Successfully Added");
      navigate('/mynotes');
    } catch (err) {
      alert('Fill all the details');
    }
  };

  return (
    <MainScreen title="Add a new Note">
      <div className="mainAddNote">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e)=>{setTitle(e.target.value)}} value={title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter category" onChange={(e)=>{setCategory(e.target.value)}} value={category} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter content" onChange={(e)=>{setContent(e.target.value)}} value={content} />
          </Form.Group>
          <Button variant="primary" size="lg" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
}

export default AddNote