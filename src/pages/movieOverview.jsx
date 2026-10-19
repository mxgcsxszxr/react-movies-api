import React from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import {  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MovieOverview() { 
  const { id } = useParams()
  const location = useLocation()
  console.log('location', location.state)
  const { movies, genres } = location.state || { movies: [], genres: [] }
  console.log('Movies:', movies);
  console.log('Genres:', genres)
  const movie = Array.isArray(movies) ? movies.find((movie) => +movie.id === +id) : null

  if (!movie) {
    return (
      <div>
        <h2>Movie not found</h2>
        <Link to='/movies'>Back to Movies</Link>
      </div>
    );
  }

  if (!genres) {
    console.error('Genres are undefined')
    return <p>No genres available</p>
  }

  const movieGenres = movie.genre_ids.map((genreId) => {
      const genreName = genres.find((g) => g.id === genreId);
      return genreName ? genreName.name : null;
    }).filter(Boolean)
  console.log('movies', movies)
  console.log('genres', genres)
 
  return (
    <>
      <section>
        <div id='movie__body'>
            <div className="container__movie--selected">
              <div className="row">
                <div className="movie__selected--top">
                  <div className="movie__selected--top--links">
                    <Link to='/movies' className='movie__selected--link'>
                      <FontAwesomeIcon icon='arrow-left' />
                    </Link>
                    <Link to='/movies' className='movie__selected--link'>
                      <h3 className="movie__selected--top--title">Movies</h3>
                    </Link>
                  </div>
                </div>
                <div className="movie__selected--row">
                  <div className='movie__selected--backdrop'>
                    <figure className="movie__backdrop">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="movie__backdrop--img" />
                    </figure>
                  </div>
                  <div className="movie__selected">
                    <figure className="movie__selected--figure">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie__selected--poster" />
                    </figure>
                    <div className="movie__selected--summary">
                      <h3 className="movie__selected--title">{movie.title}</h3>
                      <h4 className="movie__selected--genre">{movieGenres.join('  |  ')}</h4>
                      <div className="movie__selected--info">
                        <p className="movie__summary--release">{movie.release_date.slice(0, 4)}</p>
                        <p className="movie__summary--divider"> • </p>
                        <p className="movie__selected--rating">{movie.vote_average.toFixed(0)} / 10</p>
                        <p className="movie__summary--divider"> • </p> 
                        <p className="movie__selected--language">'{movie.original_language}'</p>
                      </div>
                      <div className="movie__selected--overview">
                        <h3 className="movie__selected--overview--title">
                          Overview
                        </h3>
                        <p className="movie__selected--overview--para">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

    <section>
      <div className="movies__selected--recommended">
        <div className="row">
          <div className="movie__selected--top">
            <h2 className="movie__selected--title--top">
              Recommended Movies
            </h2>
          </div>
          <div className="movies">
            {movies
            .filter((movie) => movie.vote_average.toFixed(0) >= '5' && +movie.id !== +id)
            .slice(0, 4)
            .map((movie) => (
              <div className="movie__card movie__card--recommended" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie__poster" />
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default MovieOverview;

