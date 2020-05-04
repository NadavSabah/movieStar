import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import WatchListPreview from '../../cmps/WatchListPreview/WatchListPreview'
import movieService from '../../services/movieService'

const WatchList = ({ watchList, baseUrl, displaySizeCard, setAddWatchList,
    setDeleteWatchList, loadWatchList, setConfigForFetch, displaySizeWlBg }) => {
    useEffect(() => {
        async function getData() {
            if (!watchList.length) loadWatchList()
            await setConfigForFetch()

        }
        getData()

    }, [])

    return (
        <div>
            {watchList.length
                ? watchList.map((movieData, idx) =>
                    <div key={idx} >
                        {/* <button onClick={() => hadaleWatchList(movieData)}>Add</button> */}
                        {movieData.poster_path ?

                            <WatchListPreview
                                watchList={watchList}
                                imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} />
                            : null
                        }
                    </div>
                )
                :
                <div>

                    <h4 style={{ marginTop: '75px', textAlign: 'center' }}>Your watchlist is empty</h4>
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
        displaySizeWlBg: state.displaySizeWlBg

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
        },
        setAddWatchList: (movie, watchList) => {
            const updatedWatchList = movieService.addToWatchList(movie, watchList)
            dispatch({ type: 'SET_ADD_WATCHLIST', data: updatedWatchList })
        },
        setDeleteWatchList: (index, watchList) => {
            const updatedWatchList = movieService.DeleteFromWatchList(index, watchList)
            dispatch({ type: 'SET_DELETE_WATCHLIST', data: updatedWatchList })
        },
        loadWatchList: async () => {
            let watchList = await movieService.loadWatchList()
            if (watchList) {
                // let watchList = movieService.loadWatchList(watchList)
                dispatch({ type: 'SET_WATCHLIST', data: watchList })

            }
            else return
            //if watchList in redux
            //if watchList in localStorage
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchList)