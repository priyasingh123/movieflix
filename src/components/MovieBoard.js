import { Virtuoso } from "react-virtuoso";
import YearlyMovieSubBoard from "./YearlyMovieSubBoard";
import { useState, useEffect, useCallback } from "react";

const MovieBoard = ({ genreFilter }) => {
  const [categorizedMovies, setCategorizedMovies] = useState({});
  const [year, setYear] = useState(2012);
  const [isFetching, setIsFetching] = useState(false);

  const currentYear = new Date().getFullYear();

  const fetchMovieData = useCallback(
    async (fetchYear, page) => {
      if (fetchYear > currentYear || isFetching) return;
      setIsFetching(true);
      try {
        const baseUrl = process.env.REACT_APP_BASEURL;
        const apiKey = process.env.REACT_APP_APIKEY;
        const url = new URL(`${baseUrl}/discover/movie`);
        url.searchParams.append("api_key", apiKey);
        url.searchParams.append("primary_release_year", fetchYear);
        url.searchParams.append("vote_count.gte", "100");
        url.searchParams.append("sort_by", "popularity.desc");
        url.searchParams.append("page", page.toString());
        genreFilter && url.searchParams.append("with_genres", genreFilter);

        const res = await fetch(url);
        const response = await res.json();
        setCategorizedMovies((prev) => ({
          ...prev,
          [fetchYear]: {
            movies: [
              ...(prev[fetchYear]?.movies || []),
              ...(response?.results || []),
            ],
            page,
            totalPages: response?.total_pages || 1,
          },
        }));
        if (page === 1) {
          setYear(fetchYear + 1);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsFetching(false);
      }
    },
    [genreFilter, isFetching, currentYear],
  );

  useEffect(() => {
    fetchMovieData(2012, 1);
  }, []);

  useEffect(() => {
    if (genreFilter !== undefined) {
      setCategorizedMovies({});
      setYear(2012);
      fetchMovieData(2012, 1);
    }
  }, [genreFilter]);

  const yearKeys = Object.keys(categorizedMovies);

  return (
    <div className="movie-board">
      <Virtuoso
        useWindowScroll
        style={{ height: "90vh" }}
        data={yearKeys} //it is virtualizing based on year
        endReached={() => fetchMovieData(year, 1)} // loads next year when you reach bottom
        overscan={200}
        itemContent={(index, yearKey) => (
          <YearlyMovieSubBoard
            year={yearKey}
            allMovies={categorizedMovies[yearKey].movies || []}
            page={categorizedMovies[yearKey].page}
            totalPages={categorizedMovies[yearKey].totalPages}
            onShowMore={() =>
              fetchMovieData(
                Number(yearKey),
                categorizedMovies[yearKey].page + 1,
              )
            }
          />
        )}
        components={{
          Footer: () =>
            isFetching ? (
              <h4 style={{ textAlign: "center" }}>Loading...</h4>
            ) : null,
        }}
      />
    </div>
  );
};

export default MovieBoard;
