import React from "react";
import { Route, Link } from 'react-router-dom'
import Order from './components/Order'
import Home from './components/Home'
import './index.css';




const App = () => {
  return (
    <div className="App">
      <nav>
        <h1 className="header">Lambda Eats</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/Order">Order</Link>
          </div>
      </nav>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/Order" render={() => <Order />} />
    </div>


  );
};
export default App;
