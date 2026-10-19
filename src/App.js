import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from './components/nav';
import Home from './pages/home';
import Movies from './pages/movies';
import MovieOverview from './pages/movieOverview'
import Footer from './components/footer';


function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />}/>
            <Route path="/movieOverview/:id" element={<MovieOverview />} />
          </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
