import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom"; // Import Link from React Router


  const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const API_KEY = "30f07167921fda1cca22ed506262c660";
        const BASE_URL = "https://api.themoviedb.org/3";
        const RECOMMENDATIONS_URL = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`;

        const response = await fetch(RECOMMENDATIONS_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecommendations(data.results);
      } catch (error) {
        console.error("Error fetching movie recommendations:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data is loaded or when an error occurs
      }
    };

    fetchRecommendations();
  }, [movieId]);

  // Slice the recommendations to limit to the first 10 items
  const limitedRecommendations = recommendations.slice(0, 10);

  return (
    <div className="grid grid-cols-5 gap-4">
      {isLoading ? (
        <div className="col-span-5 w-full h-full flex items-center justify-center">
          <TailSpin
            height={100}
            width={100}
            color="#14cce4"
            ariaLabel="tail-spin-loading"
          />
        </div>
      ) : (
        limitedRecommendations.map((movie) => (
          // Wrap each card in a Link component
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="mt-10 shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="text-center mt-2">{movie.title}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Recommendations;




