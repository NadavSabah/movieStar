import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import WatchListPreview from '../../cmps/WatchListPreview/WatchListPreview'
import movieService from '../../services/movieService'
import './WatchList.css'

const WatchList = ({ watchList, baseUrl, displaySizeCard,
    loadWatchList, setConfigForFetch, setDeleteWatchList }) => {
    const [isWlEmpty, setIsWlEmpty] = useState(true)
    useEffect(() => {
        async function getData() {
            if (!watchList.length) loadWatchList()
            await setConfigForFetch()
        }
        getData()
    }, [])
    useEffect(() => {
        if (!watchList.length) setIsWlEmpty(true)
        else setIsWlEmpty(false)

    }, [watchList])
    const deleteFavorite = (movie) => {
        let movieToDelete = document.getElementById(`${movie.id}`)
        movieToDelete.style.opacity = "0"
        setTimeout(() => {
            movieToDelete.style.display = "none"
            setDeleteWatchList(watchList, movie)
            if (!watchList.length) setIsWlEmpty(true)
        }, 500)

        return false

    }
    return (
        <div className="wl_page">
            {watchList.length || !isWlEmpty
                ? watchList.map((movieData, idx) =>
                    <div key={idx} >
                        {/* <button onClick={() => hadaleWatchList(movieData)}>Add</button> */}
                        {movieData.poster_path ?

                            <WatchListPreview
                                watchList={watchList}
                                imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`}
                                deleteFavorite={deleteFavorite}
                                data={movieData}
                            />
                            : null
                        }
                    </div>
                )
                :
                <div>
                    <p className="empty_wl"> Your watchlist is empty</p>
                </div>
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        watchList: state.watchList,
        baseUrl: state.baseUrl,
        displaySizeCard: state.displaySizeCard,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
        },
        setDeleteWatchList: (watchList, movie) => {
            const { newWatchList } = movieService.handaleWatchList(watchList, movie)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: newWatchList })
        },
        loadWatchList: async () => {
            let watchList = await movieService.loadWatchList()
            if (watchList) {
                dispatch({ type: 'SET_WATCHLIST', data: watchList })

            }
            else return
            //if watchList in redux
            //if watchList in localStorage
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchList)