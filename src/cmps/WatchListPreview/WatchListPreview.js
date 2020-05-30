import React from 'react'
import { connect } from 'react-redux'
import movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './WatchListPreview.css'
import remove from '../../assets/imgs/remove.svg'
import remove_fill from '../../assets/imgs/filled_remove.svg'

const WatchListPreview = ({ imgUrl, data, setCurrMovie, watchList, setDeleteWatchList }) => {

    const onSetCurrMovie = () => {
        setCurrMovie(data.id)
    }
    const deleteFavorite = () => {
        let movieToDelete = document.getElementById(`${data.id}`)
        setDeleteWatchList(watchList, data)
        movieToDelete.style.opacity = "0"
        setTimeout(() => {
            movieToDelete.style.display = "none"
        }, 500)
        return false

    }
    return (

        <div id={`${data.id}`} className={'wl_container'} onClick={onSetCurrMovie}>
            <Link className="mp_wl_link" to={'/' + data.id}>

                <div className="wl_content">

                    <h3 className='wl_title'>{data.title}</h3>
                    <div className='wl_rate'>{data.vote_average}</div>
                    <div className='wl_date'>{data.release_date}</div>
                    <div className='wl_overview'>{data.overview}</div>
                </div>
                <img className="wl_movie_img" src={imgUrl} />
            </Link>

            <a onClick={deleteFavorite} className='romove_container'>
                <img className="wl_remove" src={remove} />
                <img className="wl_fremove" src={remove_fill} />
            </a>
        </div>

    )
}

const mapDispatchToProps = dispatch => {
    return {

        setCurrMovie: async (movieId) => {
            let res = await movieService.getCurrMovieData(movieId)
            dispatch({ type: 'SET_CURR_MOVIE', data: res })
        },
        setDeleteWatchList: (watchList, movie) => {
            const updatedWatchList = movieService.handaleWatchList(watchList, movie)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: updatedWatchList.newWatchList })
        }
    }
}
export default connect(null, mapDispatchToProps)(WatchListPreview)