import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Recommendations from "../Recommendations/Recommendations";
import { TailSpin } from "react-loader-spinner"; 
import SearchResults from "../SearchResults/SearchResults";


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [searchPaperOpen, setSearchPaperOpen] = useState(true);

  useEffect(() => {
    // Fetch movie details using the movie ID (id) from the URL
    // Update the state with the fetched movie data
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=30f07167921fda1cca22ed506262c660`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data); // Update movie data in state
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return  <div className="flex items-center justify-center">
    <TailSpin height={100} width={100} color="#14cce4" ariaLabel="tail-spin-loading" />
  </div>;
  }


  return (
    <>
    <div className="h-full bg-neutral-100">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 mb-6 flex">
        <SearchResults />
      </div>
      <div className="container mx-auto bg-neutral-100">
        <div className="  flex ">
          <div className="w-1/4 p-4 shadow-2xl rounded-xl bg-gray-100">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="w-3/4 p-4 shadow-2xl rounded-xl bg-gray-200">
            <div>
              <h3 className="font-bold text-2xl">{movie.title}</h3>
              <p className="text-xl mt-2">
                Release: <br /> {movie.release_date}
              </p>
              <p className="text-xl mt-2">
                Runtime: <br /> {movie.runtime} min
              </p>
              <p className="text-xl mt-2">
                Synopsis: <br /> {movie.overview}
              </p>
            </div>
            <div className="mt-4 text-xl">
              Rating: <br />{" "}
              <span className={`text-xl p-2  rounded-md shadow-sm ${
  movie.vote_average >= 7
    ? "bg-black border-green-500 text-green-500"
    : movie.vote_average >= 5
    ? "bg-black border-orange-500 text-orange-500"
    : "bg-black border-red-500 text-red-500"
}`}>
  {movie.vote_average.toFixed(1)}
</span>
            </div>
          </div>
        </div>
        <div className=" text-3xl font-extrabold mt-10">Recommended Movies</div>
        <Recommendations movieId={id} />
      </div>
      </div>
    </>
  );
};

export default MovieDetails;
