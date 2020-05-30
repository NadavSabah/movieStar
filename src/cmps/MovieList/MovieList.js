import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './MovieList.css'
import movieService from '../../services/movieService'
import MoviePreview from '../MoviePreview/MoviePreview'

const MovieList = ({ list, title, baseUrl, displaySizeCard, watchList, setAddWatchList, setDeleteWatchList, recentlyViewed, setIsSucMsg }) => {

    // remove and add to wathlist
    const handaleWatchList = (movie) => {
        let { newWatchList, isAdded } = movieService.handaleWatchList(watchList, movie)
        if (isAdded) {
            setAddWatchList(newWatchList)
            setIsSucMsg({ isShow: true, content: 'added to' })
            setTimeout(() => {
                setIsSucMsg(false)
            }, 3000)
        }
        else {
            setDeleteWatchList(newWatchList)
            setIsSucMsg({ isShow: true, content: 'remove from' })
            setTimeout(() => {
                setIsSucMsg(false)
            }, 3000)
        }
    }

    return (<div className="list_container">
        {title ?
            <h2 className="sub_title">{title}</h2>
            : null
        }
        < div className='movies_container'  >

            {
                list ?
                    list.map((movieData, idx) =>


                        <div key={idx} className='movie_item'>

                            {movieData.poster_path ?
                                <>
                                    <MoviePreview
                                        watchList={watchList}
                                        handaleWatchList={handaleWatchList}
                                        recentlylist={recentlyViewed}
                                        imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} />
                                </>
                                : null
                            }
                        </div>
                    )
                    : null
            }
        </div >
    </div >
    )
}
const mapStateToProps = state => {
    return {
        baseUrl: state.baseUrl,
        displaySizeCard: state.displaySizeCard,
        watchList: state.watchList,
        recentlyViewed: state.recentlyViewed,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        setAddWatchList: (updatedWatchList) => {
            // const updatedWatchList = movieService.addToWatchList(movie, watchList)
            dispatch({ type: 'SET_ADD_WATCHLIST', data: updatedWatchList })
        },
        setDeleteWatchList: (updatedWatchList) => {
            // const updatedWatchList = movieService.DeleteFromWatchList(index, watchList)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: updatedWatchList })
        },
        setIsSucMsg: ({ isShow, content }) => {
            dispatch({ type: 'SET_SHOW_SUC_MSG', data: { isShow, content } })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieList)