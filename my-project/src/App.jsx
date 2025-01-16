import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SignIn1 from "./components/SignIn1";
import Movies from "./components/NetflixAPI";
import SignUp from "./components/SignUp";

const App = () => {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn1 />} />
           <Route path="/signup" element={<SignUp />} />
          <Route path="/movies" element={<Movies />} />
          
        </Routes>
      </Router>
 
  );
};

export default App;
