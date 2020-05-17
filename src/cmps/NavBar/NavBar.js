import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom'
import './NavBar.css'
import icon from './../../assets/imgs/icon_yellow.svg'
import menu from './../../assets/imgs/menu.svg'
import star_black from './../../assets/imgs/star_black.svg'
import open from './../../assets/imgs/star.svg'
import close from './../../assets/imgs/close_menu.svg'


const NavBar = ({ isOpen, setIsOpen }) => {
    useEffect(() => {
        setTopMenu()
    }, [])

    // playing with the navbar depending on screen width and scrolling


    // global var 
    let prevScrollpos = window.pageYOffset;
    let element = document.getElementById("navbar")
    let blackStarMenu = document.getElementsByClassName("black_star")
    let logoImg = document.getElementsByClassName("logo_img")
    let menuNames = document.getElementsByClassName("main_nav_items")

    const setTopMenu = () => {
        element = document.getElementById("navbar")
        element.style.backgroundColor = 'transparent'
        element.style.top = "2%";
        blackStarMenu[0].style.display = "none"
        logoImg[0].style.display = "block"
        menuNames[0].style.padding = "0px"
        element.classList.remove("yellow_nav");
    }

    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos || currentScrollPos === 0) {
            if (currentScrollPos <= 75) {
                setTopMenu()
            }
            else {
                // element.classList.add("yellow_nav")
                element.style.top = "0";
                element.style.backgroundColor = '#f5c518'
                element.style.display = "flex"
                if (window.innerWidth > 600) {
                    console.log('window.innerWidth', window.innerWidth)
                    blackStarMenu[0].style.display = "none"
                    menuNames[0].style.paddingTop = "8px"
                    logoImg[0].style.display = "none"
                }
                else {
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
        let menu = document.getElementById("menu")
        if (isOpen) {
            menu.style.opacity = "0"
            setTimeout(() => {
                menu.style.visibility = "hidden"
            }, 1000)
        }
        else {
            menu.style.opacity = "1"
            menu.style.visibility = "visible"
        }
    }

    return (
        <header id="navbar" className="main_nav_container">

            <div>

                <img onClick={toggleMenu} className="black_star" src={star_black} />
                <img onClick={toggleMenu} className="menu" src={menu} />
            </div>


            {/* <ul id ="menu" className={"main_nav_items main_nav" + (isOpen ? " width_nav" : "")}  > */}
            <ul id="menu" className={"main_nav_items main_nav width_nav"}  >

                <li onClick={toggleMenu} >  <img className={"in_menu_star menu_btn"} src={open} /></li>
                <li className="main_nav_item">
                    <NavLink onClick={toggleMenu} className="item_name" exact to="/">HOME
                        </NavLink>
                </li>
                <li className="main_nav_item">
                    <NavLink onClick={toggleMenu} className="item_name" to="/WatchList">WATCH LIST
                        </NavLink>
                </li>
                <li className="main_nav_item">
                    <NavLink onClick={toggleMenu} className="item_name" to="/AboutUs">ABOUT
                        </NavLink>
                </li>
                <li onClick={toggleMenu}>  <img className="in_menu_close menu_btn" src={close} /></li>
            </ul>

            <Link exact to="/"><img className="logo_img" src={icon} /></Link>


        </header>

    )
}
export default NavBar