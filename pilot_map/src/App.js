import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Navbar from "./components/navbar.component";
import MyMap from "./components/mymap.component";
import GlobalMap from "./components/globalmap.component";
import Home from "./components/home.component";

//NPM i express-session- express-flash passport passport-local axios mongoose bcrypt



function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/my-map" component={MyMap} />
      <Route path="/global-map" component={GlobalMap} />
      <Route path="/users/login" component={Login} />
      <Route path="/users/register" component={SignUp} />
    </Router>
  );
}

export default App;
