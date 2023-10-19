import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom"; // Import Link
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use navigate to programmatically navigate to the movie details page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length >= 3) {
        setIsLoading(true);

        const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=30f07167921fda1cca22ed506262c660&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
          const response = await fetch(SEARCH_URL);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          const filteredResults = data.results.filter((movie) => {
            const movieTitle = movie.title.toLowerCase();
            const lowerCaseQuery = query.toLowerCase();
            const correctLetters = [...movieTitle].filter((letter, index) => {
              return letter === lowerCaseQuery[index];
            }).length;
            return correctLetters >= 3;
          });

          setResults(filteredResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="bg-neutral-100 w-full">
      <div className="mx-28">
        <div className="mt-4 mb-6">
          <input
            type="text"
            className="bg-neutral-100 w-full border-b outline-none"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <TailSpin height={100} width={100} color="#14cce4" ariaLabel="tail-spin-loading" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4 mx-28">
          {results.slice(0, 10).map((movie) => (
            <Link
              to={`/movies/${movie.id}`} // Use Link to navigate to the movie details page
              key={movie.id}
            >
              <div className="flex items-center p-4 rounded shadow hover:bg-gray-400 sm:visible md:visible">
                <div className="w-1/4 h-20">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="w-3/4 text-lg">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
