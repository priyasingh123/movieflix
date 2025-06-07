import img from "../utils/image/movie-logo.jpg";
import "../utils/styles/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ setMovies }) => {
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState([]);
  const [page] = useState(1);

  const baseUrl = process.env.REACT_APP_BASEURL;
  const apiKey = process.env.REACT_APP_APIKEY;

  const fetchMovies = async () => {
    // const url = `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=2012&page=${page}&vote_count.gte=100&sort_by=popularity.desc&with_genres=${filter}`
    const url = `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=2012&page=${page}&vote_count.gte=100&sort_by=popularity.desc`;
    const res = await fetch(url);
    const response = await res.json();
    setMovies(response.results);
  };

  const fetchGenres = async () => {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    const res = await fetch(url);
    const response = await res.json();
    setGenres(response.genres);
  };
  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);
  // },[filter])

  const handleFilter = (e) => {
    setFilter(e.target.id);
  };

  let count = 0;
  return (
    <div className="navbar">
      <img className="navbar-img" src={img} alt="logo" />
      <label className="logo-title">MOVIEFIX</label>
      <div className="menu-items">
        <ul onClick={(e) => handleFilter(e)}>
          {genres.map((genre) => {
            count++;
            if (count <= 10) {
              return (
                <Link className={`list-item`} to={"/"}>
                  <li
                    key={genre.name}
                    id={genre.name}
                    className={` category ${
                      filter === genre.name ? "background-red" : ""
                    }`}
                  >
                    {genre.name}
                  </li>
                </Link>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
