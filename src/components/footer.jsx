import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer__links">
              <Link to="/" className="nav__link">Home</Link>
              <Link to="/Movies" className="nav__link">Find a  Movie</Link>
              <Link to="" className="nav__link">Contact</Link>
          </div>
      <p>&copy; 2026 Movies API. All rights reserved.</p>
    </footer>
  )
}

export default Footer;