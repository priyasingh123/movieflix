import MovieCard from "./MovieCard";

const YearlyMovieSubBoard = ({
  year,
  allMovies,
  setPage,
  page,
  setSelectedYear,
  setViewMoreMovies,
}) => {
  const viewAllMovies = () => {
    setPage(page + 1);
    setSelectedYear(year);
    setViewMoreMovies(true);
  };

  return (
    <section className="positioned-yearly-movie">
      <label className="year-label white-label">{year}</label>
      <div className="yearly-movie">
        {allMovies?.map((movie, index) => {
          return (
            <MovieCard
              key={`${movie.original_title}-${index}`}
              imgUrl={movie.poster_path}
              name={movie.original_title}
              rating={movie.vote_average}
            />
          );
        })}
        <button className="category view-more-btn" onClick={viewAllMovies}>
          View More
        </button>
      </div>
    </section>
  );
};

export default YearlyMovieSubBoard;
