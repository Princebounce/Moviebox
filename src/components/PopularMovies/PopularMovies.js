import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import SearchResults from "../SearchResults/SearchResults"
import { TailSpin } from "react-loader-spinner"; 

const API_KEY = "30f07167921fda1cca22ed506262c660";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;

const PopularMovies = () => {
  const navigate = useNavigate();
  const [topMovies, setTopMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Step 2: Add isLoading state

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const fetchPopularMovies = async (page) => {
    try {
      const response = await fetch(
        `${POPULAR_MOVIES_URL}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");

      }
      const data = await response.json();

      const moviePromises = data.results.map(async (movie) => {
        const movieDetailsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
        );
        if (!movieDetailsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const movieDetailsData = await movieDetailsResponse.json();
        return { ...movie, runtime: movieDetailsData.runtime };
      });

      const newMoviesWithDetails = await Promise.all(moviePromises);
      setTopMovies((prevMovies) => [...prevMovies, ...newMoviesWithDetails]);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false when data is loaded or when an error occurs
    }
  };

  const handleScroll = () => {
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (scrolledToBottom) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full bg-neutral-100">
      <div className="mx-28">
        <div className="decoration-from-font leading-5 tracking-wide font-semibold text-3xl p-9"> Popular Movies</div>
        <div className="mt-4 mb-6 flex">
        <SearchResults />
        </div>
       
      </div>

      <div className="container mx-auto sm:px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-8 shadow-2xl">
          {isLoading ? (
            // Step 3: Display TailSpin when loading
            <div className="col-span-3 flex items-center justify-center">
              <TailSpin
                height={100}
                width={100}
                color="#14cce4"
                ariaLabel="tail-spin-loading"
              />
            </div>
          ) : (
            topMovies.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
