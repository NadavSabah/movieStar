import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WatchList from './pages/WatchList/WatchList'
import AboutUs from './pages/AboutUs/AboutUs'
import './App.css';
import Moviedetails from './pages/MovieDetails/MovieDetails';
import icon from './assets/imgs/icon.svg'
import check from './assets/imgs/check.svg'
import { connect } from 'react-redux'




function App({ msg }) {
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-60px";

    }
    prevScrollpos = currentScrollPos;
  }
  return (


    <Router >

      <header id="navbar" className="main_nav_container">
        <div className="logo_app"><img className="logo_img" src={icon} />
          <ul className="main_nav_items main_nav" >
            <li className="main_nav_item">
              <NavLink className="item_name" exact to="/">Home</NavLink>
            </li>
            <li className="main_nav_item">
              <NavLink className="item_name" to="/WatchList">WatchList</NavLink>
            </li>
            <li className="main_nav_item">
              <NavLink className="item_name item_about" to="/AboutUs">AboutUs</NavLink>
            </li>
          </ul>
        </div>


        {/* <nav className="main_nav"> */}

        {/* </nav> */}

      </header>
      {msg.isShow ?
        // <div className="suc_msg_wrapper">

        <div className="suc_msg">
          <img className="msg_check_img" src={check} />
          {`Successfully ${msg.content} your WatchList`}</div>
        // </div>
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


const mapStaeToProps = state => {
  return {
    msg: state.isShowSucMsg
  }
}

export default connect(mapStaeToProps)(App);
