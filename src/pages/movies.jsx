import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Movies() {
  const location = useLocation()
  const genreFromHome = location.state?.genre
  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchGenre, setSearchGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayedGenre, setDisplayedGenre] = useState('');
  const hasMounted = useRef(false)


  useEffect(() => {
    const getMovieData = async () => {
      try {
        setLoading(true)
        const apiKey = '8a70dc076c350fc88e954662ecfe3c71';
        await new Promise(resolve => setTimeout(resolve, 2000))
        const { data: movieResp } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
        setMovies(movieResp.results)
        setFilteredMovies(movieResp.results)
        const { data: genreResp } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        setGenres(genreResp.genres)
        } catch (error) {
            console.error("Error fetching movie data:", error)
        } finally {
            setLoading(false)
        }
      };
      getMovieData();
  }, [])

  const getGenreId = useCallback((genre) => {
    const genreObject = genres.find(g => g.name.toLowerCase() === genre.toLowerCase())
    return genreObject ? genreObject.id : null
  }, [genres]);

  // const getGenreId = (genreName) => {
  //   const genreObject = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase())
  //   return genreObject ? genreObject.id : null
  // }

  useEffect(() => {
    if ( genreFromHome) {
      console.log(genreFromHome)
      console.log(hasMounted.current)
      if (genres.length > 0) {
        const genreId = getGenreId(genreFromHome)
        console.log("Genre ID:", genreId)
        if (genreId) {
            const results = movies.filter(movieItem => movieItem.genre_ids.includes(genreId));
            setFilteredMovies(results.slice(0, 6))
            setDisplayedGenre(capitalizeFirstLetter(genreFromHome))
        } else {
            setFilteredMovies(movies)
            setDisplayedGenre('')
        }
      } else {
        setFilteredMovies(movies)
        setDisplayedGenre('')
      }
   }
  }, [genreFromHome, genres, movies, getGenreId]) 

  const handleSearch = () => {
    setLoading(true)
    const genreId = getGenreId(searchGenre)
    const results = movies.filter(movieItem => 
      (genreId && movieItem.genre_ids.includes(genreId)) 
    )
    setFilteredMovies(results.slice(0, 6))
    setDisplayedGenre(capitalizeFirstLetter(searchGenre))
    setSearchGenre('')
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <>
    <section>
          <div className="movies__overlay">
    
          </div>
          <header>
            <div className="container">
              <div className="row header__row--movies">
                <div className="header__description">
                  <h1 className="header__description--title">The USs top movie search platform</h1>
                </div>
                
                  <div className="header__search--movies">       
                    <input type="text" id="genreSearch" value={searchGenre}  className="header__search--bar header__search--bar--movies" placeholder="Search for a movie genre. . ." onChange={(event) => setSearchGenre(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSearch()}/>
                    <button id="genreBtn" className="genre__btn" type="button" onClick={() => handleSearch(searchGenre)}>
                      <FontAwesomeIcon icon="magnifying-glass" />
                    </button>
                  </div>
    
              </div>
            </div>
          </header>
        </section>
    <section>
      <div className="container">
        <div className="row">
          <div className="movies__search">
            <h2 className="movies__title">  
              Search Results for {displayedGenre}: 
            </h2>

            <div className="movies__genres">
              <label className="genre__name">Search a Genere:</label>
              <div className="genre__search">
                <input type="text" id="genreSearch2" value={searchGenre} className="genre__input" onChange={(event) => setSearchGenre(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSearch()}placeholder="Genre. . ."  />
                <button id="genreBtn2" className="genre__btn" type="button" onClick={() => handleSearch(searchGenre)}>
                  <FontAwesomeIcon icon="circle-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="movies__results">
          <div className="movies">
            {/* <i className="fa-solid fa-spinner movies__loading--spinner"></i> */}
          </div>
        <div className="movies__list">
          {
            loading ? (
              new Array(20).fill(0).map((_, index) => 
                <div className="movie__card" key={index}>
                  <div className="movie__card--skeleton">
                    <div className="movie__poster--skeleton">
                    </div>
                    <div className="movie__info--skeleton">
                    </div>
                  </div>
                </div>
              )
            ) : (
            Array.isArray(movies) && movies.length > 0 ? (
            filteredMovies.map(movie => {
                const movieGenres = movie.genre_ids
                .map((genreId) => {
                  const genreName = genres.find((g) => g.id === genreId);
                  return genreName ? genreName.name : null;
                })
                .filter(Boolean);

                return (
                  <div id="results" className="movie__card" key={movie.id}>
                    <div className="movie__info" onClick={() => navigate(`/movieOverview/${movie.id}`, { state: { movies: movies, genres: genres } })}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' className="movie__poster" />
                      <h3>{movie.title}</h3>
                      <p>
                        <b>Genre: </b>
                        {movieGenres.join(' | ')}
                      </p>
                      <p>
                        <b>Rating: {movie.vote_average.toFixed(0)} / 10</b>
                      </p>
                    </div>
                  </div>
                ); 
              })) : (
                <p>No movies found for this genre.</p>
              )
            )
          }
       
              
          {/* <div className="movie--card--overlay">
            <p>
              More Info
            </p>
          </div> */}
        </div>
      </div>
    </section>
    </>
  );
}

export default Movies;