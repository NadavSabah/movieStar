import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './WatchListPreview.css'
import img from '../../assets/imgs/remove.svg'
import img1 from '../../assets/imgs/filled_remove.svg'

const WatchListPreview = ({ imgUrl, data, setCurrMovie, watchList, setDeleteWatchList }) => {

    const onSetCurrMovie = () => {
        setCurrMovie(data.id)
    }
    const deleteFavorite = () => {
        const index = watchList.findIndex(watch => {
            return watch.id === data.id
        })  
        setDeleteWatchList(index, watchList)
        window.location.reload()
        return false 
        // console.log('History:', props)
        // history.push(`/WatchList`)
    }
    // const  deleteFavorite = ()=>{ window.location.reload(); }
    return (

        // <div className="total_container">
                <div className='wl_container' onClick={onSetCurrMovie}>
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
                <img className="wl_remove" src={img} />
                <img className="wl_fremove" src={img1} />
            </a>
                </div>

        // </div>


    )
}
const mapDispatchToProps = dispatch => {
    return {

        setCurrMovie: async (movieId) => {
            let res = await movieService.getCurrMovieData(movieId)
            dispatch({ type: 'SET_CURR_MOVIE', data: res })
        },
        setDeleteWatchList: (index, watchList) => {
            const updatedWatchList = movieService.DeleteFromWatchList(index, watchList)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: updatedWatchList })
        }
    }
}
export default connect(null, mapDispatchToProps)(WatchListPreview)