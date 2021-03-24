import React from 'react';
import './App.css';
import FormData from './components/FormData';
import { Container } from "react-bootstrap";
import { FormLivrer } from './components/FormLivrer';

function App() {

  const query = window.location.search;
  const urlParam = new URLSearchParams(query);
  return (
    <div className="App bg-secondary">
      <Container>
        <div className="col-sm-6 d-flex flex-column justify-content-center align-items-center w-100 my-5 bg-dark text-white rounded shadow-lg">
          {urlParam.has('beecee-livraison')? <FormData/> : <FormLivrer/>}
        </div>
      </Container>
    </div>
  );
}

export default App;
