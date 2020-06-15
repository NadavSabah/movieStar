import React, { useEffect } from 'react'
import './Footer.css'
import addThis from '../../cmps/addthis/adddthis'
import yellow_star from './../../assets/imgs/star.svg'




const Footer = () => {
    useEffect(
        () => {
            async function getData() {
                addThis.start()
                loadAddThis()
            }
            getData()
        }
        , [])
    const loadAddThis = () => {
        return (
            <div className="share_wrapper">
                <div className="addthis_inline_share_toolbox"></div>
            </div>

        )
    }
    return (
        <footer className="footer">


            <div className="follow_wrapper">
                <img className="star_foot" src={yellow_star} />
                <p className="share_title futura">FOLLOW US</p>
                <img className="star_foot" src={yellow_star} />
            </div>
            {/* <div className="add-this"></div> */}
            {loadAddThis()}
        </footer>
    )

}
export default Footer