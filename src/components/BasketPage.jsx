import React, { useState, useEffect } from 'react';
import "./BasketPage.css";

const BasketPage = () => {
  const [movieLists, setMovieLists] = useState([]);

  useEffect(() => {
    const storedLists = localStorage.getItem('movieLists');
    if (storedLists) {
      setMovieLists(JSON.parse(storedLists));
    }
  }, []);

  return (
    <div className='main-b'>
      <h2>My Lists</h2>
      {movieLists.map((list, index) => {
        if (!list.title.trim()) {
          return null; 
        }
        return (
          <div className='ul-div' key={index}>
            <h3>{list.title}</h3>
            <ul>
              {list.movies.map((movie, movieIndex) => (
                <li key={movieIndex}>
                  {movie.title} ({movie.year})
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default BasketPage;

  


