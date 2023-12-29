import MovieCard from "./MovieCard"

const MovieBoard = ({movies}) => {
    return(
        <div className="movie-board">
            <label className="year-label white-label">2012</label>
            <div className="yearly-movie">
                {movies?.map((movie) => {
                    return <MovieCard imgUrl={movie.poster_path} name={movie.original_title} rating={movie.vote_average}/>
                })}
            </div>
        </div>
    )
}

export default MovieBoard