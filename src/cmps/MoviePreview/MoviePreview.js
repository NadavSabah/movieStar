import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import movieService from '../../services/movieService'
import { NavLink } from 'react-router-dom'
import star from './../../assets/imgs/star.svg'
import empty_rec from './../../assets/imgs/Rectangle_empty.svg'
import filled_rec from './../../assets/imgs/Rectangle_filled.svg'
import './MoviePreview.css'



const MoviePreview = ({ imgUrl, data, setCurrMovie, recentlylist, isDark, watchList, handaleWatchList }) => {
    const [isInWatchList, setIsInWatchList] = useState(false)

    useEffect(() => {
        checkMovieInWatchList(data)
    }, [])

    const onSetCurrMovie = () => {
        setCurrMovie(data.id, recentlylist)

    }
    const checkMovieInWatchList = (movie, invokeWatchList = null) => {
        if (invokeWatchList) handaleWatchList(movie)
        const index = watchList.findIndex(watch => {
            return watch.id === movie.id
        })
        if (index !== -1) {
            setIsInWatchList(true)

        }
        else {
            setIsInWatchList(false)
        }
    }
    return (
        <div >
            <NavLink className="mp_link" to={'/' + data.id}>
                <div className='movie_card' onClick={onSetCurrMovie}>
                    <img className={"movie_img" + (isDark ? "" : " movie_shadow")} src={imgUrl} />
                </div>
            </NavLink>
            <div className="desc_tit">
                <div className="star_score">{data.vote_average}
                    <img className="img_star" src={star} />
                </div>
                <div className={"rec_img"} onClick={() => checkMovieInWatchList(data, true)}>
                    {isInWatchList ?
                        <img src={filled_rec} />
                        : <img src={empty_rec} />}
                </div>
            </div>
            <div className={'movie_name' + (isDark ? " bright_txt" : " dark_txt")}>{data.title}</div>
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