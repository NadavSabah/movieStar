import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WatchList from './pages/WatchList/WatchList'
import AboutUs from './pages/AboutUs/AboutUs'
import './App.css';
import Moviedetails from './pages/MovieDetails/MovieDetails';
import icon from './assets/imgs/icon.svg'
import check from './assets/imgs/check.svg'
import menu from './assets/imgs/menu.svg'
import arrow from './assets/imgs/rightArrow.svg'
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
  const toggleMenu = () => {
    console.log('toggleMenu function')
    var navBar = document.getElementsByClassName("main_nav_items")[0];
    console.log('navBar:', navBar)
    navBar.classList.toggle("width_nav");
    // if (element.classList.contains("width_nav")) {

    //   navBar.style.width = "0";
    // } else {
    //   navBar.classList.add("width_nav");
    //   // navBar.style.width = "300px";
    // }
  }

  return (


    <Router >

      <header id="navbar" className="main_nav_container">
        <div className="logo_app"><img className="logo_img" src={icon} />
          <img onClick={toggleMenu} className="menu" src={menu} />
          <div className="transition">

            <ul className="main_nav_items main_nav"  >
              {/* <ul className="main_nav_items main_nav" > */}
              <li className="main_nav_item">
                <NavLink className="item_name" exact to="/">Home
                <img className="arr_img" src={arrow} />
                </NavLink>

              </li>
              <li className="main_nav_item">
                <NavLink className="item_name" to="/WatchList">WatchList
                <img className="arr_img" src={arrow} />
                </NavLink>
              </li>
              <li className="main_nav_item">
                <NavLink className="item_name item_about" to="/AboutUs">AboutUs
                <img className="arr_img" src={arrow} />
                </NavLink>
              </li>
            </ul>
          </div>

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
