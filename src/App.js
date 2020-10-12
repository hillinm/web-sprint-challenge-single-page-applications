import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import './index.css';




const App = () => {
  return (
    <>
    <Header />
    <Router path="/pizza" >
    </Router>,
    <Form />
    <Footer />
    </>
  );
};
export default App;
