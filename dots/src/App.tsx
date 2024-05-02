import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Board from "./components/Board/Board";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import About from "./components/About/About";
import Home from "./components/Home/Home";

function App() {
  return (
      <>
          <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route
                  path="/"
                  element={<Home />}
              />
              <Route
                  path="/about"
                  element={<About />}
              />
              <Route
                  path="/play/:player1/:player2"
                  element={<Board />}
              />
          </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
