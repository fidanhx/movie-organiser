import React, { useState, useEffect } from 'react';
import './Menu.css';

function MovieListApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [listTitle, setListTitle] = useState('');
  const [createNewListClicked, setCreateNewListClicked] = useState(false);
  const [savedLists, setSavedLists] = useState([]);
  

  const api_key = '1b3ecc3';
  const omdb_url = 'http://www.omdbapi.com/';

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const defaultResponse = await fetch(`${omdb_url}?s=marvel&apikey=${api_key}`);
        const defaultData = await defaultResponse.json();
        if (defaultData.Search) {
          setSearchResults(defaultData.Search);
        }
      } catch (error) {
        console.error('Error fetching default movies:', error);
      }
    };

    fetchDefaultMovies();
  }, []);

  const searchMovies = async () => {
    try {
      const response = await fetch(`${omdb_url}?s=${searchTerm}&apikey=${api_key}`);
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const addMovieToList = (movieId, movieTitle, movieYear) => {

  const isMovieAlreadySelected = selectedMovies.some(movie => movie.id === movieId);

    if (isMovieAlreadySelected) {
      alert('This movie is already added!');
      return;
    }

    const newMovie = { id: movieId, title: movieTitle, year: movieYear };
    setSelectedMovies([...selectedMovies, newMovie]);
  }

  const createNewList = () => {
  if (!selectedMovies.length) {
    alert('Please add movies to create a list!');
    return;
  }

  if (!listTitle.trim()) {
    alert('List name cannot be empty!');
    return;
  }  
    
  const existingList = lists.find((list) => list.title.toLowerCase() === listTitle.toLowerCase());
  if (existingList) {
    alert('A list with the same name already exists!');
    return;
  }

    const newList = { title: listTitle, movies: selectedMovies };
    setLists([...lists, newList]);
    localStorage.setItem('movieLists', JSON.stringify([...lists, newList]));
    // setListTitle(''); 
    setCreateNewListClicked(true); 
  };


  useEffect(() => {
    const storedLists = localStorage.getItem('savedLists');
    if (storedLists) {
      setSavedLists(JSON.parse(storedLists));
    }
  }, []);


  //   const removeMovieFromList = (movieId) => {
  //   const updatedList = selectedMovies.filter((movie) => movie.id !== movieId);
  //   setSelectedMovies(updatedList);
  // };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  const removeMovieFromList = (movieId) => {
    if (!createNewListClicked) {
      const updatedList = selectedMovies.filter((movie) => movie.id !== movieId);
      setSelectedMovies(updatedList);
    }
  };
  
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  const selectList = (index) => {
    setCurrentList(lists[index]);
    setSelectedMovies(lists[index].movies);
  };

  const handleDetailsClick = (movieId) => {
    window.location.href = `/details/${movieId}`;
  };
  
  const goToBasket = () => {
    window.location.href = '/basket'; 
  };

  return (
    <div className='main'>
      <div className='header'>
        <h1>Movie Organiser</h1>
      </div>
      <div className='all-parts'>
      <div className='all-search'>
      <div className='search'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='search-b' onClick={searchMovies}>Search</button>
      </div>
      <div className='search-rs'>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <span>
                {movie.Title} ({movie.Year})
              </span>
              <button onClick={() => addMovieToList(movie.imdbID, movie.Title, movie.Year)}>Add to List</button>
              <button onClick={() => handleDetailsClick(movie.imdbID)}>Details</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className='list-movies'>
        <h2>Selected Movies</h2>

        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Enter List Name"
        />

        <ul>
          {selectedMovies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.year}){' '}
              <button onClick={() => removeMovieFromList(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>

        <div className='buttons'>
        <button onClick={createNewList}>Save</button>
       
        <button onClick={goToBasket}>Go to Basket</button>
        </div>
      </div>
      </div>
      <div id="basket-section"></div>
    </div>
  );
}

export default MovieListApp;