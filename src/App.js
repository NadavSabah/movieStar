import React, { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from './hooks/useOnClickOutside'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WatchList from './pages/WatchList/WatchList'
import AboutUs from './pages/AboutUs/AboutUs'
import './App.css';
import Moviedetails from './pages/MovieDetails/MovieDetails';
import check from './assets/imgs/check.svg'
import { connect } from 'react-redux'
import NavBar from './cmps/NavBar/NavBar'

function App({ msg, setDarkMode, isDark }) {
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#2d2d2d"
      document.body.style.color = "white";
    }
    else {
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "black";

    }

  }
    , [isDark])

  const [isOpen, setIsOpen] = useState(false)

  const node = useRef();

  useOnClickOutside(node, () => setIsOpen(false));
  return (

    <Router className="router" >
      <div ref={node}>
        <NavBar setDarkMode={setDarkMode} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {msg.isShow ?
        <div className="suc_msg">
          <img className="msg_check_img" src={check} />
          {`Successfully ${msg.content} your WatchList`}</div>
        : null
      }

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/WatchList" component={WatchList} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/:id" component={Moviedetails} />
      </Switch>

    </Router>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setDarkMode: (isDark) => {
      dispatch({ type: 'SET_DARK_MODE', data: isDark })
    }
  }
}
const mapStaeToProps = state => {
  return {
    msg: state.isShowSucMsg,
    isDark: state.isDark

  }
}

export default connect(mapStaeToProps, mapDispatchToProps)(App);
