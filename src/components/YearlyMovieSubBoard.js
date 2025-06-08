import MovieCard from "./MovieCard";

const YearlyMovieSubBoard = ({ year, allMovies }) => {
  return (
    <>
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
    </>
  );
};

export default YearlyMovieSubBoard;
