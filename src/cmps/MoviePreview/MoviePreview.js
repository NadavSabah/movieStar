import React, { useState } from 'react'
import { connect } from 'react-redux'
import movieService from '../../services/movieService'
import { NavLink } from 'react-router-dom'
import './MoviePreview.css'

import dots from '../../assets/imgs/3dots.svg'


const MoviePreview = ({ imgUrl, data, setCurrMovie, recentlylist, handleNoteOpen, isDark }) => {

    const onSetCurrMovie = () => {
        setCurrMovie(data.id, recentlylist)

    }
    return (
        <div >
            <div className='add_wl_btn' onClick={(e) => handleNoteOpen(e, data)}>
                <img src={dots} />
            </div>

            <NavLink className="mp_link" to={'/' + data.id}>
                <div className='movie_card' onClick={onSetCurrMovie}>
                    <img className={"movie_img"} src={imgUrl} />
                    <div className={'movie_name' + (isDark ? " bright_txt" : " dark_txt")}>{data.title}</div>
                </div>
            </NavLink>
        </div>

    )
}
const mapStateToProps = state => {
    return {
        showNote: state.showNote,
        isDark: state.isDark
    }
}
const mapDispatchToProps = dispatch => {
    return {

        setCurrMovie: async (movieId, recentlylist) => {
            let res = await movieService.getCurrMovieData(movieId)
            dispatch({ type: 'SET_CURR_MOVIE', data: res })
            const updatedList = await movieService.addToRecentlyList(res, recentlylist)
            dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', data: updatedList })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MoviePreview)