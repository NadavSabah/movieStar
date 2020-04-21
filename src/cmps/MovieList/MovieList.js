import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './MovieList.css'
import movieService from '../../services/movieService'
import MoviePreview from '../MoviePreview/MoviePreview'

const MovieList = ({ list, baseUrl, displaySizeCard, watchList, setAddWatchList, setDeleteWatchList, recentlyViewed, setIsSucMsg }) => {

    // remove and add to wathlist
    const handaleWatchList = (movie) => {
        console.log('added/removed from watchlist')
        const index = watchList.findIndex(watch => {
            return watch.id === movie.id
        })
        if (index !== -1) {
            setDeleteWatchList(index, watchList)
            setIsSucMsg({ isShow: true, content: 'remove from' })
            setTimeout(() => {
                setIsSucMsg(false)

            }, 3000)
        }
        else {
            setAddWatchList(movie, watchList)
            setIsSucMsg({ isShow: true, content: 'added to' })
            setTimeout(() => {
                setIsSucMsg(false)

            }, 3000)
        }
    }

    return (
        < div className='movies_container' >
            {
                list ?
                    list.map((movieData, idx) =>
                        <div key={idx} className='movie_item'>

                            {movieData.poster_path ?

                                <MoviePreview handaleWatchList={handaleWatchList} imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} recentlylist={recentlyViewed} />
                                : null
                            }
                        </div>
                    )
                    : null
            }
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
        setAddWatchList: (movie, watchList) => {
            const updatedWatchList = movieService.addToWatchList(movie, watchList)
            dispatch({ type: 'SET_ADD_WATCHLIST', data: updatedWatchList })
        },
        setDeleteWatchList: (index, watchList) => {
            const updatedWatchList = movieService.DeleteFromWatchList(index, watchList)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: updatedWatchList })
        },
        setIsSucMsg: ({ isShow, content }) => {
            dispatch({ type: 'SET_SHOW_SUC_MSG', data: { isShow, content } })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieList)