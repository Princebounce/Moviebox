import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PopularMovies from "./components/PopularMovies/PopularMovies"; 

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </Router>
    
  );
}

export default App;
