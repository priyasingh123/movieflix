import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import YearlyMovieSubBoard from "./YearlyMovieSubBoard";

const MovieBoard = ({ genreFilter }) => {
  const [categorizedMovies, setCategorizedMovies] = useState({ 2012: [] });
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);

  const d1 = new Date();
  const currentYear = d1.getFullYear();

  const fetchMovieData = async () => {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const apiKey = process.env.REACT_APP_APIKEY;
    const url = new URL(`${baseUrl}/discover/movie`);
    url.searchParams.append("api_key", apiKey);
    url.searchParams.append("primary_release_year", year);
    url.searchParams.append("page", page);
    url.searchParams.append("vote_count.gte", "100");
    url.searchParams.append("sort_by", "popularity.desc");
    genreFilter && url.searchParams.append("with_genres", genreFilter);

    const res = await fetch(url);
    const response = await res.json();
    setCategorizedMovies({ ...categorizedMovies, [year]: response.results });
    setYear(year + 1);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  useEffect(() => {
    if (genreFilter !== undefined) {
      setYear(2012);
      setCategorizedMovies({ 2012: [] });
    }
  }, [genreFilter]);

  // Separate useEffect to trigger after state updates
  useEffect(() => {
    if (year === 2012 && Object.keys(categorizedMovies).includes("2012")) {
      fetchMovieData();
    }
  }, [year]);

  return (
    <div className="movie-board">
      {/* TODO: add scroll up logic and show movies of year prior to 2012 */}
      <InfiniteScroll
        dataLength={Object.values(categorizedMovies).reduce(
          (total, movies) => total + movies.length,
          0
        )}
        next={fetchMovieData}
        hasMore={Number(year) <= currentYear}
        loader={<h4>Loading...</h4>}
      >
        {Object.keys(categorizedMovies).map((yearKey) => {
          return (
            <YearlyMovieSubBoard
              year={yearKey}
              key={yearKey}
              allMovies={categorizedMovies[yearKey]}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default MovieBoard;
