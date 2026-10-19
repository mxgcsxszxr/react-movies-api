import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/movies-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {

  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

    return (
      <section>
        <nav>
          <div className="row nav__row">
            <div className="logo">
              <figure className="logo__wrapper">
                <img className="logo__img" src={Logo} alt="" />
              </figure>
            </div>
            <div className="nav__links">
              <Link to="/" className="nav__link">Home</Link>
              <Link to="/Movies" className="nav__link">Find a  Movie</Link>
              <Link to="" className="nav__link nav__link--contact">Contact</Link>
            </div>
          </div>
          <button className="btn__menu--open" onClick= {openMenu()}>
            <FontAwesomeIcon icon="bars" />     
          </button>
          <div className="menu__backdrop">
            <button className="btn__menu btn__menu--close" onClick= {closeMenu()}>
              {/* <FontAwesomeIcon icon="times" />      */}
            </button>
            <ul className="menu__links">
              <li className="menu__list">
                <a href="index.html" className="menu__link" onClick= {closeMenu()}>Home</a>
              </li>
              <li className="menu__list">
                <a href="movies.html" className="menu__link" onClick= {closeMenu()}>Find a Movie</a>
              </li>
              <li className="menu__list">
                <a className="menu__link no-cursor" onClick= {closeMenu()}>Contact</a>
              </li>
            </ul>
          </div>
      </nav>
    </section>
  )
}

export default Nav;