import MovieCard from "./MovieCard"
import { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

const MovieBoard = ({ movies }) => {
    const [allMovies, setAllMovies] = useState([])
    const [year, setYear] = useState(2012)
    const [page, setPage] = useState(1)

    const fetchMoreData = async() => {
        const baseUrl = process.env.REACT_APP_BASEURL
        const apiKey = process.env.REACT_APP_APIKEY
        const url = `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=${year}&page=${page}&vote_count.gte=100&sort_by=popularity.desc`

        const res = await fetch(url)
        const response = await res.json()
        setAllMovies(allMovies.concat(response.results))
        setYear(() => year+1)
    }

    useEffect(() => {
        if (movies && movies.length > 0) {
            setAllMovies(movies);
        }
    },[movies])

    return (
        <div className="movie-board">
            <InfiniteScroll
                dataLength={allMovies}
                next={fetchMoreData}
                hasMore={Number(year) < 2024}
                loader={<h4>Loading...</h4>}
            >
                <label className="year-label white-label">{year}</label>
                <div className="yearly-movie">
                    {allMovies?.map((movie, index) => {
                        return <MovieCard key={`${movie.original_title}-${index}`} imgUrl={movie.poster_path} name={movie.original_title} rating={movie.vote_average} />
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default MovieBoard