import React, { useState } from 'react'
import { connect } from 'react-redux'
import movieService from '../../services/movieService'
import { NavLink } from 'react-router-dom'
import './MoviePreview.css'

import dots from '../../assets/imgs/3dots.svg'


const MoviePreview = ({ imgUrl, data, setCurrMovie, recentlylist, handaleWatchList }) => {
    const [showWindow, setShowWindow] = useState(false)

    const closeNote = () => {
        if (showWindow === true) setShowWindow(false)
    }
    const handleOptPicked = (e) => {
        e.stopPropagation()
        if (e.currentTarget.innerHTML === 'Add to watchlist') {
            setShowWindow(!showWindow)
            handaleWatchList(data)

        }
    }
    const handleNoteOpen = () => {
        setShowWindow(!showWindow)

    }
    const onSetCurrMovie = () => {
        setCurrMovie(data.id, recentlylist)

    }
    return (
        <div onClick={(e) => closeNote()}>
            <div className='add_wl_btn' className onClick={(e) => handleNoteOpen(e)}><img src={dots} /></div>
            <div className={"movie_note" + (showWindow ? "" : " movie_note_hide")}>
                {/* <div className={classNote}> */}
                <div onClick={handleOptPicked} className="movie_note_single">Add to watchlist</div>
                <div className="movie_note_single">Movie details</div>
            </div>
            <NavLink className="mp_link" to={'/' + data.id}>
                <div className='movie_card' onClick={onSetCurrMovie}>
                    <img className="movie_img" src={imgUrl} />
                    <div className='movie_name'>{data.title}</div>
                </div>
            </NavLink>
        </div>

    )
}
const mapStateToProps = state => {
    return {
        showNote: state.showNote
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