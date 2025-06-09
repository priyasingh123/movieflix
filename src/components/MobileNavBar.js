import { Link } from "react-router-dom";

const MobileNavBar = ({ genres, mobileGenres, filter, handleFilter }) => {
  return (
    <div className="mobile-navbar">
      {genres
        .filter((genre) => {
          return !mobileGenres.includes(genre.name);
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
              onClick={(e) => handleFilter(e)}
            >
              {genre.name}
            </Link>
          );
        })}
    </div>
  );
};

export default MobileNavBar;
