import './App.css';
import MovieBoard from './components/MovieBoard';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([])
  return (
    <Router>
      <Navbar setMovies={setMovies}/>
      <MovieBoard movies={movies}/>
    </Router>
  );
}

export default App;
