import React, { useEffect, useState } from 'react'
import movieService from './../../services/movieService'
import moment from 'moment'
import './MovieDetails.css'
import { connect } from 'react-redux'
import CastPreview from '../../cmps/CastPreview/CastPreview'
import MovieList from '../../cmps/MovieList/MovieList'
import star from '../../assets/imgs/star.svg'

const MovieDetails = ({ history, movie, baseUrl, displaySizeBg, displaySizeCard, setCurrMovie, setConfigForFetch,
    recs, recentlyViewed, addToRecentlyList, isDark }) => {
    let [titlefontSize, setTitleFontSize] = useState('1.5em')
    useEffect(() => {
        setTimeout(() => {
            async function getData() {

                await setConfigForFetch()
                await setCurrMovie(movie, history, recentlyViewed)
            }
            if (!movie) {
                getData()
            }
        }, 3000)
        console.log('didMount movieDetails')
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);


    }, [movie])

    const setFontSizeBaseOnLength = (movieName) => {

        let movieWords = []
        movieWords = movieName.split('')
        let length = movieWords.length
        console.log('movieWords', movieWords)
        console.log('length is ', length)
        if (length > 20) {
            if (titlefontSize !== '1em') setTitleFontSize('1em')
            console.log('length is longer than 15')

        }
        else {
            if (titlefontSize !== '1.5em') setTitleFontSize('1.5em')
            console.log('length is more than 15')
        }


    }
    const numberWithCommas = (num) => {
        return movieService.numToDisplay(num)


    }

    return (
        <div className="movieDetails_container">

            {movie ?
                <div>
                    <div className='imgs_container'>
                        <div className='img_bg_wrapper'>
                            <img className='img_bg' src={`${baseUrl}${displaySizeBg}${movie.backdrop_path}`} />
                            <div className='main_details'>
                                <h2 style={{ fontSize: titlefontSize }} className='movie_title'>{setFontSizeBaseOnLength(movie.title)}{movie.title.toUpperCase()}</h2>

                                <div className="info_container">
                                    <div className="top_details">
                                        <div className='geners_container'>
                                            {
                                                movie.genres.map((genre, idx) => {
                                                    if (idx >= movie.genres.length - 1) { return <div key={idx}>{genre.name} |&nbsp;&nbsp;</div> }
                                                    else return <div key={idx}>{`${genre.name},`}&nbsp;&nbsp;</div>
                                                }
                                                )
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
                            <div className='side_data_container'>

                                <div className="sub_data" title={`base on ${movie.vote_count} votes  `}><span className="sub_tit">Score</span><div className="desc_tit">{movie.vote_average} <img className="img_star" src={star} /></div></div>
                                <div className="sub_data"><span className="sub_tit">Status</span><div className="desc_tit">{movie.status.toUpperCase()}</div></div>
                                <div className="sub_data"><span className="sub_tit">Budget</span><div className="desc_tit">{numberWithCommas(movie.budget)}</div></div>
                                <div className="sub_data"><span className="sub_tit">Reveune</span><div className="desc_tit">{numberWithCommas(movie.revenue)}</div></div>

                            </div>
                        </div>
                        <div className="overview_wrapper">

                            <div className='overview_txt'>
                                <h2 style={{ margin: 0 }}>SUMMARY</h2>
                                <h4 className="movie_tagline">{movie.tagline}</h4>
                                <p style={{ margin: 0 }}> {movie.overview}</p>
                            </div>
                        </div>
                    </div>
                    {movie.videos.results ?
                        <div className="trailers_container" >
                            <h2 className="sub_title">VIDEOS</h2>
                            {movie.videos.results.map((trailer, idx) =>
                                <iframe className="md_youtube" key={idx} id="video" width="420" height="345"
                                    src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="20" allowFullScreen >
                                </iframe>

                            )}

                        </div>
                        : <p>no trailer available</p>
                    }
                    <h2 className="sub_title">MOVIE CAST</h2>
                    {movie.credits.cast ?
                        <div className="cast_container">
                            {movie.credits.cast.map((actor) =>
                                <CastPreview key={actor.cast_id} actor={actor} baseUrl={baseUrl} displaySize={displaySizeCard} />

                            )}
                        </div>
                        : null
                    }
                    <div className={isDark ? "bright_txt" : "dark_txt bright_bg"}>
                        {movie.recommendations.results ?
                            <MovieList list={movie.recommendations.results} title={`MORE LIKE "${movie.title.toUpperCase()}"`} />
                            : null
                        }
                    </div>

                </div>

                : <div className="loader" />
            }
        </div>
    )

}
const mapStateToProps = state => {
    return {
        movie: state.currMovie,
        baseUrl: state.baseUrl,
        displaySizeCard: state.displaySizeCard,
        displaySizeBg: state.displaySizeBg,
        recentlyViewed: state.recentlyViewed,
        isDark: state.isDark,


    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
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
            console.log('movie im mp page', movie)
            console.log('recently in mp page(before service', recentlyList)
            const updatedList = await movieService.addToRecentlyList(movie, recentlyList)
            dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', data: updatedList })
            console.log('recently in mp page(after service', recentlyList)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)