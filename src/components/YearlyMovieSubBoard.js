import MovieCard from "./MovieCard";

const YearlyMovieSubBoard = ({
  year,
  allMovies,
  onShowMore,
  totalPages,
  page,
}) => {
  return (
    <div className="yearly-movie-sub-board">
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
      </div>
      {totalPages === page ? (
        ""
      ) : (
        <button className="show_more_btn" onClick={() => onShowMore()}>
          Show More {">"}
          {">"}
        </button>
      )}
    </div>
  );
};

export default YearlyMovieSubBoard;
