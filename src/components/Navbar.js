import img from "../utils/image/movie-logo.jpg";
import "../utils/styles/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileNavBar from "./MobileNavBar";

const Navbar = ({ setGenreFilter }) => {
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  const baseUrl = process.env.REACT_APP_BASEURL;
  const apiKey = process.env.REACT_APP_APIKEY;

  const fetchGenres = async () => {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    const res = await fetch(url);
    const response = await res.json();
    setGenres(response.genres);
  };
  const checkScreenSize = () => {
    setIsMobile(window.matchMedia("(max-width: 700px)").matches);
  };

  useEffect(() => {
    fetchGenres();
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleFilter = (e) => {
    if (isMobile) {
      setFilter(e.target.name);
      setTimeout(() => {
        setShowMobileNavbar(false);
        setGenreFilter(e.target.id);
      }, 500);
    } else {
      setFilter(e.target.name);
      setGenreFilter(e.target.id);
    }
  };

  const mobileGenres = ["Action", "Comedy", "Drama", "Horror"];
  return (
    <div className="navbar">
      <img className="navbar-img" src={img} alt="logo" />
      <label className="logo-title">MOVIEFLIX</label>
      <div className="menu-items">
        <Link
          className={`category ${filter === "All" ? "background-red" : ""}`}
          to={"#"}
          name="All"
          key="all"
          onClick={(e) => handleFilter(e)}
        >
          All
        </Link>
        {!isMobile &&
          genres.map((genre) => {
            return (
              <Link
                className={`category ${
                  filter === genre.name ? "background-red" : ""
                }`}
                to={"#"}
                name={genre.name}
                id={genre.id}
                key={genre.id}
                onClick={(e) => handleFilter(e)}
              >
                {genre.name}
              </Link>
            );
          })}
        {/* for mobile only  */}
        {isMobile &&
          genres
            .filter((genre) => {
              return mobileGenres.includes(genre.name);
            })
            .map((genre) => {
              return (
                <Link
                  className={`category ${
                    filter === genre.name ? "background-red" : ""
                  }`}
                  to={"#"}
                  name={genre.name}
                  id={genre.id}
                  key={genre.id}
                  onClick={(e) => handleFilter(e)}
                >
                  {genre.name}
                </Link>
              );
            })}
        {isMobile && (
          <label
            onClick={() => setShowMobileNavbar(!showMobileNavbar)}
            className="white-label more-btn"
          >
            More &darr;
          </label>
        )}
        {isMobile && showMobileNavbar && (
          <MobileNavBar
            genres={genres}
            mobileGenres={mobileGenres}
            filter={filter}
            handleFilter={handleFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
