const MovieCard = ({ imgUrl, name, rating }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w154/${imgUrl}`} />
      <label className="movie-title white-label">{name}</label>
      <label className="movie-rating white-label">{rating} ⭐</label>
    </div>
  );
};

export default MovieCard;
