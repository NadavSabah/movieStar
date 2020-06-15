import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom'
import './NavBar.css'
import iconYellow from './../../assets/imgs/icon_yellow.svg'
import iconBlack from './../../assets/imgs/icon_black.svg'
import menu from './../../assets/imgs/menu.svg'
import star_black from './../../assets/imgs/star_black.svg'
import open from './../../assets/imgs/star.svg'
import close from './../../assets/imgs/close_menu.svg'


const NavBar = ({ isOpen, setIsOpen }) => {

    useEffect(() => {
        setTopMenu()
    }, [])

    // playing with the navbar depending on screen width and scrolling

    const changeNavTexColor = (txtColor) => {
        let menuName = document.getElementsByClassName("item_name")
        for (var i = 0; i < menuName.length; i++) {
            menuName[i].style.color = txtColor;
        }
    }

    // global var 
    let prevScrollpos = window.pageYOffset;

    const setTopMenu = () => {
        let navBar = document.getElementById("navbar")
        let icon_yellow = document.getElementsByClassName("yellow_icon")

        navBar.style.top = "0";
        icon_yellow[0].style.display = 'block'
        changeNavTexColor('white')
        navBar.style.backgroundColor = '#00000000'
        navBar.style.justifyContent = 'space-between'
    }

    window.onscroll = function () {
        let navBar = document.getElementById("navbar")
        let icon_yellow = document.getElementsByClassName("yellow_icon")
        let icon_black = document.getElementsByClassName("black_icon")

        //for mobile
        let blackStarMenu = document.getElementsByClassName("black_star")
        let hamburgerMenu = document.getElementsByClassName("menu")

        let currentScrollPos = window.pageYOffset

        //if scrolling up
        if (prevScrollpos > currentScrollPos || currentScrollPos === 0) {

            //Top screen
            if (currentScrollPos < 75) {
                setTopMenu()

                if (window.innerWidth < 640) {
                    blackStarMenu[0].style.display = 'none'
                    hamburgerMenu[0].style.display = 'block'
                }
            }
            // rest of the screen(not Top)
            else {
                icon_yellow[0].style.display = 'none'
                icon_black[0].style.display = 'block'
                navBar.style.top = "0";
                navBar.style.backgroundColor = '#f5c518'
                changeNavTexColor('black')
                if (window.innerWidth < 640) {
                    changeNavTexColor('white')
                    navBar.style.justifyContent = 'center'
                    blackStarMenu[0].style.display = 'block'
                    hamburgerMenu[0].style.display = 'none'
                    icon_black[0].style.display = 'none'
                }

            }

        } else {
            navBar.style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen)
        let menu = document.getElementById("menu")
        if (window.innerWidth < 700) {
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
    }

    return (
        <header id="navbar">

            <div className="yellow_icon"><Link exact to="/"><img className="logo_img" src={iconYellow} /></Link></div>
            <div className="black_icon"> <Link exact to="/"><img className="logo_img" src={iconBlack} /></Link></div>
            <div>
                <img onClick={toggleMenu} className="black_star" src={star_black} />
                <img onClick={toggleMenu} className="menu" src={menu} />
            </div>

            <ul id="menu" className={"main_nav_items main_nav width_nav"}  >

                <li className="in_menu_star" onClick={toggleMenu}>  <img className={"menu_btn_star"} src={open} /></li>
                <li className="main_nav_item futura">
                    <NavLink onClick={toggleMenu} className="item_name" exact to="/">HOME
                        </NavLink>
                </li>
                <li className="main_nav_item futura">
                    <NavLink onClick={toggleMenu} className="item_name" to="/WatchList">WATCH LIST
                        </NavLink>
                </li>
                <li className="main_nav_item futura">
                    <NavLink onClick={toggleMenu} className="item_name" to="/AboutUs">ABOUT
                        </NavLink>
                </li>
                <li className="in_menu_close" onClick={toggleMenu}>  <img className="menu_btn_close" src={close} /></li>
            </ul>

        </header>

    )
}
export default NavBar