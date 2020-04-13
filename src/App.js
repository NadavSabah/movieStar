import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WatchList from './pages/WatchList/WatchList'
import AboutUs from './pages/AboutUs/AboutUs'
import './App.css';
import Moviedetails from './pages/MovieDetails/MovieDetails';




function App() {
  return (


    <Router>

      <header className="main_nav_container">
        <div className="logo_app"></div>

        <nav className="main_nav">
          <ul className="main_nav_items">
            <li className="main_nav_item">
              <NavLink className="item_name" to="/">Home</NavLink>
            </li>
            <li className="main_nav_item">
              <NavLink className="item_name" to="/WatchList">WatchList</NavLink>
            </li>
            <li className="main_nav_item">
              <NavLink className="item_name" to="/AboutUs">AboutUs</NavLink>
            </li>
          </ul>
        </nav>

      </header>
        <Route path="/" exact component={HomePage} />
        <Route path="/WatchList" component={WatchList} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/:id" component={Moviedetails} />

    </Router>
  );
}

export default App;
