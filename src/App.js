import "./App.css";
import MovieBoard from "./components/MovieBoard";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [genreFilter, setGenreFilter] = useState();
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="movieflix"
          element={
            <>
              <Navbar setGenreFilter={setGenreFilter} />
              <MovieBoard genreFilter={genreFilter} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
