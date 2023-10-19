import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";

const Card = ({ movie }) => {
  const placeholderImageUrl = `${placeholderImage}`;

 

  return (
    <div className="container p-3 mt-10 bg-gray-200 group overflow-hidden whitespace-truncate w-72 sm:w-48 md:w-72 shadow-2xl rounded-lg">
      <div>
        <Link to={`/movies/${movie.id}`}>
          <img
            className="w-full"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : placeholderImageUrl
            }
            alt={movie.title}
            onError={(e) => {
              e.target.src = placeholderImageUrl;
            }}
          />
        </Link>
      </div>
      <div className="sm:h-36 md:h-48 lg:h-28 p-4">
        <h3 className="truncate text-lg font-bold">{movie.title}</h3>
        <p className="truncate">Release: {movie.release_date}</p>
        <p className="truncate">Runtime: {movie.runtime} min</p>
        <p
          className={`p-4 truncate transform translate-y-full group-hover:translate-y-[-100%] bg-slate-300 whitespace-normal transition-all duration-300`}
        >
          {movie.overview}
        </p>
      
      </div>
    </div>
  );
};

export default Card;