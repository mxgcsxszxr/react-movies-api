import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieImg from "../assets/CINEMA-CLASSICS-POSTER.jpg"
import { Link } from "react-router-dom"

function Home() {
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSearch = (genre) => {
      navigate(`/movies`, {state: { genre }});
  };

  function onSearchKeyPress(key) {
    if (key === 'Enter') {
      handleSearch()
    } 
  }

  return (
    <>
      <section>
        <header>
          <div className="container">
            <div className="row header__row">
              <div className="header__description">
                <h1 className="header__description--title">The USs top movie search platform</h1>
                <h3 className="header__description--sub-title"><span className="yellow">FIND YOUR MOVIE BELOW</span></h3>
              </div>

              <div className="header__search">
                <input type="search" value={genre} className="header__search--bar" placeholder="Search for a movie genre. . ." onChange={(event) => setGenre(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSearch(genre)} />
                <button className="header__search--btn" onClick={() => handleSearch(genre)}>
                  <FontAwesomeIcon icon="magnifying-glass" />
                </button>
              </div>

              <div className="header__img">
                <figure className="header__img--wrapper">
                  <img className="header__img--image" src={MovieImg} alt=""  />
                </figure>
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  );
}

export default Home;