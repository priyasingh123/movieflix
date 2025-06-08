import img from "../utils/image/movie-logo.jpg";
import "../utils/styles/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ setGenreFilter }) => {
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState([]);

  const baseUrl = process.env.REACT_APP_BASEURL;
  const apiKey = process.env.REACT_APP_APIKEY;

  const fetchGenres = async () => {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    const res = await fetch(url);
    const response = await res.json();
    setGenres(response.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.name);
    setGenreFilter(e.target.id);
  };

  return (
    <div className="navbar">
      <img className="navbar-img" src={img} alt="logo" />
      <label className="logo-title">MOVIEFLIX</label>
      <div className="menu-items" onClick={(e) => handleFilter(e)}>
        {genres.map((genre) => {
          return (
            <Link
              className={`category ${
                filter === genre.name ? "background-red" : ""
              }`}
              to={"#"}
              name={genre.name}
              id={genre.id}
            >
              {genre.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
