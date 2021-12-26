import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from "react-router-dom";
import { Alert, Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Login from './components/Login/Login';
import ContentList from './components/ContentList/ContentList';
import VideoContentComponent from './components/VideoContent/VideoContent';
import StoreState from './models/StoreState';
import DefaultState from './models/DefaultState';

import loading from './loading.svg'
import logo from './logo.svg'
import './App.css';

function App() {
  const defState = (useSelector(store => store) as any).defaultStore;
  const dispatch = useDispatch();

  console.log(defState.message) // Catch all status messages

  const closeError = () => {
    dispatch({
      type: 'CLEAR',
      payload: null
    });
  }

  return (
    <React.Fragment>
      <Navbar className="navbar" bg="light" variant="light" fixed="top" >
        <Container>
          <Navbar.Brand>
            <img src={logo} width={50} alt="logo" /> <Link to="/" style={{ textDecoration: "none" }}>YouTube</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Features</Nav.Link>
            {
              (defState as DefaultState).status === StoreState.LOADED_SUCCESSFULLY && (
                <Nav.Link href="/">Logout</Nav.Link>
                )
            }
            {
              (defState as DefaultState).status === StoreState.LOADED_ERROR && (
                <Nav.Link href="/login">Login</Nav.Link>
                )
            }
            {
              (defState as DefaultState).status === StoreState.LOADING && (
                <Nav.Link><img src={loading} width={16} alt="loading" /></Nav.Link>
              )
            }
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      {
        (defState as DefaultState).status === StoreState.LOADED_ERROR && (
          <Alert variant="danger" style={{ margin: '50px', marginTop: '80px' }} onClose={closeError} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{(defState as DefaultState).data}</p>
          </Alert>
        )
      }
      {
        (defState as DefaultState).status === StoreState.LOADING && (
          <div className="center-screen">
            <img src={loading} width={64} alt="loading" />
          </div>
        )
      }

      <Routes>
        <Route path="/" element={<ContentList />} />

        <Route path="/video">
          <Route path=":videoCODE" element={<VideoContentComponent />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  )
}

export default App;
