import img from "../utils/image/movie-logo.jpg";
import "../utils/styles/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState([]);
  const [page] = useState(1);

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
    setFilter(e.target.id);
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
              id={genre.name}
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
