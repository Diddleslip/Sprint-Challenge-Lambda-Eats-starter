import React from "react";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import Form from "./Components/Form";

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <Route exact path="/">
        <Home/>
      </Route>

      <Route path="/pizza">
        <Form/>
      </Route>
    </div>
  );
};
export default App;
