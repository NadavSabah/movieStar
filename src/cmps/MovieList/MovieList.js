import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './MovieList.css'
import movieService from '../../services/movieService'
import MoviePreview from '../MoviePreview/MoviePreview'

const MovieList = ({ list, title, baseUrl, displaySizeCard, watchList, setAddWatchList, setDeleteWatchList, recentlyViewed, setIsSucMsg }) => {
    const [showWindow, setShowWindow] = useState(false)
    const [noteId, setNoteId] = useState(null)

    const closeNote = () => {
        console.log('closing')
        if (showWindow === true) setShowWindow(false)
    }
    const handleOptPicked = (e, movie) => {
        console.log('e.currentTarget.innerHTM', e.currentTarget.innerHTML)
        e.stopPropagation()
        if (e.currentTarget.innerHTML === 'Add to watchlist') {
            setShowWindow(!showWindow)
            handaleWatchList(movie)
        }

    }

    const handleNoteOpen = (e, { id }) => {

        console.log('the id is ', id)
        if (noteId) {
            if (id !== noteId) {
                console.log('in the if')
                setTimeout(() => {

                    setShowWindow(true)
                }, 0)

            }
        }
        setNoteId(id)

        setShowWindow(!showWindow)

    }

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

    return (<div onClick={closeNote} className="list_container">
        {title ?
            <h1 className="sub_title">{title}</h1>
            : null
        }
        < div className='movies_container' >
            <div>

            </div>
            {
                list ?
                    list.map((movieData, idx) =>
                        <div key={idx} className='movie_item'>

                            {movieData.poster_path ?
                                <div>
                                    {noteId === movieData.id ?
                                        <div className={"movie_note" + (showWindow ? "" : " movie_note_hide")}>

                                            <div onClick={(e) => { handleOptPicked(e, movieData) }} className="movie_note_single">Add to watchlist</div>
                                            <NavLink to={'/' + movieData.id}>
                                                <div className="movie_note_single">Movie details</div>
                                            </NavLink>
                                        </div>
                                        : null
                                    }
                                    <MoviePreview handleNoteOpen={handleNoteOpen} handaleWatchList={handaleWatchList} imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} recentlylist={recentlyViewed} />
                                </div>
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