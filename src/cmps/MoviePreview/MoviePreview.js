import React from 'react'
import {connect} from 'react-redux'
import movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './MoviePreview.css'

const MoviePreview = ({ imgUrl, data,setCurrMovie }) => {
    const onSetCurrMovie = () => {
        setCurrMovie(data.id)

    }
    return (

        <Link to={'/' + data.id}>
            <div onClick={onSetCurrMovie}>

                <img className="single_movie" src={imgUrl} />
                <div className='single_movie_name'>{data.title}</div>
               
            </div>
        </Link>


    )
}
const mapDispatchToProps = dispatch => {
    return {

        setCurrMovie: async (movieId) => {
            let res = await movieService.getCurrMovieData(movieId)
            dispatch({type:'SET_CURR_MOVIE',data:res})
        }
    }
}
export default connect(null, mapDispatchToProps)(MoviePreview)