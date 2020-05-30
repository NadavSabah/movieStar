import React, { useEffect, useState } from 'react'
import movieService from './../../services/movieService'
import moment from 'moment'
import './MovieDetails.css'
import { connect } from 'react-redux'
import CastPreview from '../../cmps/CastPreview/CastPreview'
import MovieList from '../../cmps/MovieList/MovieList'
import star from '../../assets/imgs/star.svg'
import empty_rec from './../../assets/imgs/rectangle_md.svg'
import filled_rec from './../../assets/imgs/Rectangle_filled.svg'
// import rightArrow

const MovieDetails = ({ history, movie, baseUrl, displaySizeBg, displaySizeCard, setCurrMovie, setConfigForFetch,
    recs, recentlyViewed, addToRecentlyList, setAddWatchList, setDeleteWatchList, setIsSucMsg, watchList }) => {
    let [isInWatchList, setIsInWatchList] = useState(false)
    let [titlefontSize, setTitleFontSize] = useState('1.5em')
    let [manyGenres, setManyGenres] = useState(false)
    useEffect(() => {

        setTimeout(() => {

            async function getData() {
                await setConfigForFetch()
                await setCurrMovie(movie, history, recentlyViewed)

            }
            if (!movie) {
                getData()
            }


        }, 500)
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
        checkGenresLength(movie)
        checkMovieInWatchList(movie)
    }, [movie])

    const checkGenresLength = (movie) => {
        let screenWidth = window.innerWidth
        let numOfWords = []
        if (movie) {
            movie.genres.forEach((genre) => {
                numOfWords.push(genre.name)
            })
            numOfWords = numOfWords.join('').length
            if (numOfWords > 25 && screenWidth < 400) setManyGenres("2.8vw")
            else if (numOfWords > 20 && screenWidth < 400) {
                console.log('num of words is ', numOfWords)
                setManyGenres("3.5vw")
            }
            else if (numOfWords > 20 && screenWidth < 400) setManyGenres("4vw")
            else return null

        }
    }
    const setFontSizeBaseOnLength = (movieName) => {
        let movieWords = []
        movieWords = movieName.split('')
        let length = movieWords.length
        console.log('length is ', length)
        if (length > 20) {
            if (titlefontSize !== '0.9em') setTitleFontSize('0.9em')
        }
        else {
            if (titlefontSize !== '1.5em') setTitleFontSize('1.5em')
        }
    }
    const numberWithCommas = (num) => {
        return movieService.numToDisplay(num)
    }
    const handaleWatchList = () => {
        let { newWatchList, isAdded } = movieService.handaleWatchList(watchList, movie)
        if (isAdded) {
            setAddWatchList(newWatchList)
            setIsInWatchList(true)
            setIsSucMsg({ isShow: true, content: 'added to' })
            setTimeout(() => {
                setIsSucMsg(false)
            }, 1500)
        }
        else {
            setDeleteWatchList(newWatchList)
            setIsInWatchList(false)
            setIsSucMsg({ isShow: true, content: 'remove from' })
            setTimeout(() => {
                setIsSucMsg(false)
            }, 1500)
        }
    }

    const checkMovieInWatchList = (movie, invokeWatchList = null) => {
        console.log('checkMovieInWatchList function detailsFiles ', movie)
        if (invokeWatchList) handaleWatchList(movie)
        console.log('watchlist is:', watchList)
        console.log('movie is', movie)
        const index = watchList.findIndex(watch => {
            return watch.id === movie.id
        })
        if (index !== -1) {
            console.log('index is(in the if):', index)
            setIsInWatchList(true)
        }
        else {
            console.log('index is(in the else):', index)
            setIsInWatchList(false)
        }
    }

    return (
        <div className="movieDetails_container">

            {movie ?
                <div>
                    <div className='imgs_container'>
                        <div style={{ backgroundImage: `url(${baseUrl}${displaySizeBg}${movie.backdrop_path})` }} className='img_bg_wrapper'>
                            {/* <img className='img_bg' src={`${baseUrl}${displaySizeBg}${movie.backdrop_path}`} /> */}
                            <div className='main_details'>
                                <div className="leftside__movie">
                                    <div className="title_wrapper">
                                        <h2 className='movie_title'>{movie.title.toUpperCase()}</h2>
                                    </div>

                                    <div style={{ fontSize: manyGenres ? manyGenres : "" }} className="info_container">
                                        <div className="top_details">
                                            <div className='geners_container'>
                                                {
                                                    movie.genres.map((genre, idx) => {
                                                        if (idx >= movie.genres.length - 1) { return <div key={idx}>{genre.name} |&nbsp;&nbsp;</div> }

                                                        else return <div key={idx}>{`${genre.name},`}&nbsp;&nbsp;</div>
                                                    })
                                                }
                                            </div>
                                            <div className="md_date_time_wrapper">
                                                <div> {moment(movie.release_date).format('MMM YY')} |&nbsp;&nbsp;</div>
                                                <div> {movie.runtime} min |&nbsp;&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className="languages">
                                            {
                                                movie.spoken_languages.map((lang, idx) => {
                                                    if (idx >= movie.genres.length - 1) { return <div key={idx}>{lang.name} &nbsp;&nbsp;</div> }
                                                    else return <div key={idx}>{`${lang.name},`}&nbsp;&nbsp;</div>
                                                }
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="add_to_wl" onClick={handaleWatchList}>
                                    {isInWatchList ?
                                        <>
                                            <img className="wl_tag" src={filled_rec} />
                                            <p className={"add_remove_txt"} style={{ marginTop: "13px", marginBottom: "0" }}>Remove from<br />watchlist</p>
                                        </>
                                        :
                                        <>
                                            <img className="wl_tag" src={empty_rec} />
                                            <p className={"add_remove_txt"} style={{ marginTop: "13px", marginBottom: "0" }}>Add to<br />watchlist</p>

                                        </>
                                    }

                                </div>

                            </div>
                        </div>
                        <div className='side_data_container'>

                            <div className="sub_data" title={`base on ${movie.vote_count} votes  `}><span className="sub_tit">Score</span><div className="desc_tit">{movie.vote_average} <img className="img_star" src={star} /></div></div>
                            <div className="sub_data"><span className="sub_tit">Status</span><div className="desc_tit">{movie.status.toUpperCase()}</div></div>
                            <div className="sub_data"><span className="sub_tit">Budget</span><div className="desc_tit">{numberWithCommas(movie.budget)}</div></div>
                            <div className="sub_data"><span className="sub_tit">Reveune</span><div className="desc_tit">{numberWithCommas(movie.revenue)}</div></div>

                        </div>

                        <div className="overview_wrapper">

                            <h2 className="sub_title" style={{ margin: 0 }}>SUMMARY</h2>
                            <div className='overview_txt'>
                                <h4 className="movie_tagline">{movie.tagline}</h4>
                                <p style={{ margin: 0 }}> {movie.overview}</p>
                            </div>
                        </div>
                    </div>
                    {movie.videos.results ?
                        <div className="trailers_container" >
                            <h2 className="sub_title">VIDEOS</h2>.
                            <div className="video_wrapper">

                                {movie.videos.results.map((trailer, idx) =>
                                    <iframe className="md_youtube" key={idx} id="video"
                                        src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="20" allowFullScreen >
                                    </iframe>

                                )}
                            </div>

                        </div>
                        : <p>no trailer available</p>
                    }
                    <h2 style={{ paddingTop: "2vh" }} className="sub_title">MOVIE CAST</h2>
                    {movie.credits.cast ?
                        <div className="cast_container">
                            <div className="cast_scroll"></div>
                            {movie.credits.cast.map((actor) =>
                                <CastPreview key={actor.cast_id} actor={actor} baseUrl={baseUrl} />

                            )}
                        </div>
                        : null
                    }
                    <div className={"more_like_wrapper"}>
                        {movie.recommendations.results ?
                            <MovieList list={movie.recommendations.results} title={`MORE LIKE "${movie.title.toUpperCase()}"`} />
                            : null
                        }
                    </div>

                </div>

                : <div className="loader" />
            }
        </div >
    )

}
const mapStateToProps = state => {
    return {
        movie: state.currMovie,
        baseUrl: state.baseUrl,
        displaySizeCard: state.displaySizeCard,
        displaySizeBg: state.displaySizeBg,
        recentlyViewed: state.recentlyViewed,
        watchList: state.watchList
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
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
        },
        setIsSucMsg: ({ isShow, content }) => {
            dispatch({ type: 'SET_SHOW_SUC_MSG', data: { isShow, content } })
        },
        setCurrMovie: async (movie = null, history, recentlyList) => {
            console.log('recentlyList', recentlyList)
            if (!movie) {
                let res = localStorage.getItem('currMovie')
                res = JSON.parse(res)
                if (!res) {
                    history.push('/')
                }
                else {
                    dispatch({ type: 'SET_CURR_MOVIE', data: res })
                    //add recently viewed
                    const updatedList = await movieService.addToRecentlyList(res, recentlyList)
                    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', data: updatedList })
                    return
                }
            }
            else {
                if (movie.genre_ids) {
                    console.log('in the if movie.genre_ids ', movie)
                    movie = await movieService.getCurrMovieData(movie.id)
                }
                dispatch({ type: 'SET_CURR_MOVIE', data: movie })
                const updatedList = await movieService.addToRecentlyList(movie, recentlyList)
                dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', data: updatedList })
            }

        },
        addToRecentlyList: async (movie, recentlyList) => {
            const updatedList = await movieService.addToRecentlyList(movie, recentlyList)
            dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', data: updatedList })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)