import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListApp from './components/MovieListApp';
import BasketPage from './components/BasketPage';
import MovieDetails from './components/MovieDetails'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MovieListApp />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/basket" element={<BasketPage />} />
      </Routes>
    </Router>
  );
}

export default App;



