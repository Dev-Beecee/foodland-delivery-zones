import React from 'react';
import './App.css';
import FormData from './components/FormData';
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <div className="col-sm-6 d-flex flex-column justify-content-center align-items-center w-100 my-5 bg-dark text-white rounded shadow-lg">
          <FormData/>
        </div>
      </Container>
    </div>
  );
}

export default App;
