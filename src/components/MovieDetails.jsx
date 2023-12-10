import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'; 
import "./MovieDetails.css"

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const api_key = '1b3ecc3';
  const {id} = useParams(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${api_key}`); 
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]); 

  const goToIMDb = () => {
    window.open(`https://www.imdb.com/title/${id}`, '_blank'); 
  };

  const goBack = () => {
    window.history.back();
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-m'>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title} ({movie.Year})</h2>
      <div className='buttons-know'>
      <button onClick={goToIMDb}>Go to IMDb</button>
      <button onClick={goBack}>Back to Search</button>
      </div>
    </div>
  );
}

export default MovieDetails;
