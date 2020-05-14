import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom'
import './NavBar.css'
import icon from './../../assets/imgs/icon_yellow.svg'
import menu from './../../assets/imgs/menu.svg'
import star_black from './../../assets/imgs/star_black.svg'
import star from './../../assets/imgs/star.svg'


const NavBar = ({ isOpen, setIsOpen, setDarkMode, isDark }) => {
    // useEffect(() => {
    //     let checkbox = document.querySelector('input[type="checkbox"]');
    //     checkbox.checked = isDark

    // }, [])

    // playing with the navbar depending on screen width and scrolling
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        let element = document.getElementById("navbar")
        let blackStarMenu = document.getElementsByClassName("black_star")
        let logoImg = document.getElementsByClassName("logo_img")
        let menuNames = document.getElementsByClassName("main_nav_items")
        if (prevScrollpos > currentScrollPos || currentScrollPos === 0) {
            if (currentScrollPos <= 75) {
                element.style.backgroundColor = 'transparent'
                element.style.top = "2%";
                blackStarMenu[0].style.display = "none"
                logoImg[0].style.display = "block"
                menuNames[0].style.padding = "0px"

                element.classList.remove("yellow_nav");
            }
            else {
                element.style.top = "0";
                element.style.backgroundColor = '#f5c518'
                element.style.display = "flex"
                if (window.innerWidth > 600) {
                    console.log('window.innerWidth', window.innerWidth)
                    blackStarMenu = "none"
                    menuNames[0].style.paddingTop = "8px"
                    logoImg[0].style.display = "none"
                }
                else {
                    console.log('in the else')
                    console.log('window.innerWidth', window.innerWidth)

                    blackStarMenu[0].style.display = "block"
                    logoImg[0].style.display = "none"
                }

                element.classList.add("yellow_nav");
            }

        } else {
            element.style.top = "-60px";
            blackStarMenu[0].style.display = "none"



        }
        prevScrollpos = currentScrollPos;
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    // const handleOnChange = (event) => {
    //     let checkbox = document.querySelector('input[type="checkbox"]');
    //     setDarkMode(!checkbox.checked)
    // }
    return (
        <header id="navbar" className="main_nav_container">
            <div className="logo_app" >
                <img onClick={toggleMenu} className="black_star" src={star_black} />
                <img onClick={toggleMenu} className="menu" src={menu} />


                <ul className={"main_nav_items main_nav" + (isOpen ? " width_nav" : "")}  >
                    {/* <li className="main_nav_item dark_mode  ">
                        <img className="img_moon" src={moon} />
                        <label className="switch">
                            <input onChange={(e) => handleOnChange(e)} type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <img className="img_sun" src={sun} />
                    </li> */}
                    <li onClick={toggleMenu} >  <img className={"in_menu_star"} src={star} /></li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name" exact to="/">HOME
                        </NavLink>
                    </li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name" to="/WatchList">WATCH LIST
                        </NavLink>
                    </li>
                    <li className="main_nav_item">
                        <NavLink onClick={() => setIsOpen(false)} className="item_name" to="/AboutUs">ABOUT
                        </NavLink>
                    </li>
                </ul>

                <Link onClick={() => setIsOpen(false)} exact to="/"><img className="logo_img" src={icon} /></Link>
            </div>

        </header>

    )
}
export default NavBar