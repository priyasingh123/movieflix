import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import YearlyMovieSubBoard from "./YearlyMovieSubBoard";

const MovieBoard = () => {
  const [categorizedMovies, setCategorizedMovies] = useState({ 2012: [] });
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);

  const d1 = new Date();
  const currentYear = d1.getFullYear();

  // TODO: move this function in common place
  const fetchMovieData = async () => {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const apiKey = process.env.REACT_APP_APIKEY;
    const url = `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=${year}&page=${page}&vote_count.gte=100&sort_by=popularity.desc`;

    const res = await fetch(url);
    const response = await res.json();
    setCategorizedMovies({ ...categorizedMovies, [year]: response.results });
    setYear(year + 1);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <div className="movie-board">
      <InfiniteScroll
        dataLength={Object.values(categorizedMovies).length * 20}
        next={fetchMovieData}
        hasMore={Number(year) <= currentYear}
        loader={<h4>Loading...</h4>}
      >
        {Object.keys(categorizedMovies).map((yearKey) => {
          return (
            <YearlyMovieSubBoard
              year={yearKey}
              allMovies={categorizedMovies[yearKey]}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default MovieBoard;
