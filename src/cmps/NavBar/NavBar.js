import React, { useState } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom'
import './NavBar.css'
import icon from './../../assets/imgs/icon.svg'
import menu from './../../assets/imgs/menu.svg'
import arrow from './../../assets/imgs/rightArrow.svg'
import sun from './../../assets/imgs/sun.svg'
import moon from './../../assets/imgs/moon.svg'


const NavBar = ({ isOpen, setIsOpen, setDarkMode }) => {

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
        setIsOpen(!isOpen)
    }
    const handleOnChange = (event) => {
        let checkbox = document.querySelector('input[type="checkbox"]');
        setDarkMode(!checkbox.checked)

        console.log('the event is', event)
        console.log('checkbox.checked', checkbox.checked)
    }
    return (
        <header id="navbar" className="main_nav_container">
            {/* <NavBar /> */}
            <div className="logo_app" >

                <img onClick={toggleMenu} className="menu" src={menu} />

                <ul className={"main_nav_items main_nav" + (isOpen ? " width_nav" : "")}  >
                    <li className="main_nav_item dark_mode  ">
                        <img className="img_moon" src={moon} />
                        <label className="switch">
                            <input onChange={(e) => handleOnChange(e)} type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <img className="img_sun" src={sun} />
                    </li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name" exact to="/">Home
                <img className="arr_img" src={arrow} />
                        </NavLink>
                    </li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name" to="/WatchList">WatchList
                <img className="arr_img" src={arrow} />
                        </NavLink>
                    </li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name item_about" to="/AboutUs">AboutUs
                <img className="arr_img" src={arrow} />
                        </NavLink>
                    </li>
                </ul>

                <Link onClick={() => setIsOpen(false)} exact to="/"><img className="logo_img" src={icon} /></Link>
            </div>

        </header>

    )
}
export default NavBar