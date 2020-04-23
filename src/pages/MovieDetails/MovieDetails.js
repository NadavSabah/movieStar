import React, { useEffect } from 'react'
import movieService from './../../services/movieService'
import './MovieDetails.css'
import { connect } from 'react-redux'
import CastPreview from '../../cmps/CastPreview/CastPreview'
import MovieList from '../../cmps/MovieList/MovieList'

const MovieDetails = ({ history, movie, baseUrl, displaySizeBg, displaySizeCard, setCurrMovie, setConfigForFetch, recs, recentlyViewed, addToRecentlyList }) => {
    // let [genresToRender,setGenresToRender]=useState([])
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
        // let topPage = document.getElementsByClassName('.movie_title').focus()
        window.scrollTo(0, 0);
    }, [])


    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="movieDetails_container">

            {movie ?
                <div>


                    <div className='imgs_container'>
                        <div className='main_details'>
                            <h2 className='movie_title'>{movie.title}</h2>

                            <div className="info_container">
                                <div className='geners_container'>
                                    {
                                        movie.genres.map((genre, idx) => {
                                            if (idx >= movie.genres.length - 1) { return <div key={idx}>{genre.name} |&nbsp;&nbsp;</div> }
                                            else return <div key={idx}>{`${genre.name},`}&nbsp;&nbsp;</div>
                                        }
                                        )
                                    }
                                </div>
                                <div className="md_date_time_warapper">

                                    <div> {movie.release_date} |&nbsp;&nbsp;</div>
                                    <div> {movie.runtime} min |&nbsp;&nbsp;</div>
                                </div>


                            </div>

                            <h4>{movie.tagline}</h4>

                        </div>
                        <p className='overview_txt'> {movie.overview}</p>

                        <div className='img_bg_wrapper'>
                            <img className='img_bg' src={`${baseUrl}${displaySizeBg}${movie.backdrop_path}`} />
                            {/* <h1 style={{ color: 'orange', fontSize: '4em' }}>nadav sabah</h1> */}
                        </div>
                        <div class="md_img_data">


                            <div className='data_img_container'>

                                <div className='img_card_wrapper'>
                                    <img className="md_movie_img" src={`${baseUrl}${displaySizeCard}${movie.poster_path}`} />
                                </div>

                                <div className='side_data_container'>

                                    <div title={`base on ${movie.vote_count} votes  `}><b>Score</b><br />{movie.vote_average}</div>
                                    <div><b>Status</b><br />{movie.status}</div>
                                    <div><b>Budget</b><br />{numberWithCommas(movie.budget)}</div>
                                    <div><b>Reveune</b><br />{numberWithCommas(movie.revenue)}</div>
                                    <div>
                                        {
                                            movie.spoken_languages.length > 1 ? <div><b>Languages</b><br /></div>
                                                : <div><b>Language</b><br /> </div>}
                                        {
                                            movie.spoken_languages.map((lang, idx) =>
                                                <div key={idx}>{lang.name}</div>
                                            )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    {movie.videos.results ?
                        <div className="trailers_container" >
                            <h2 className="sub_title">Videos</h2>
                            {movie.videos.results.map((trailer, idx) =>
                                <iframe className="md_youtube" key={idx} id="video" width="420" height="345"
                                    src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="20" allowFullScreen >
                                </iframe>

                            )}

                        </div>
                        : <p>no trailer available</p>
                    }
                    <h2 className="sub_title">Movie Cast</h2>
                    {movie.credits.cast ?
                        <div className="cast_container">
                            {movie.credits.cast.map((actor) =>
                                <CastPreview key={actor.cast_id} actor={actor} baseUrl={baseUrl} displaySize={displaySizeCard} />

                            )}
                        </div>
                        : null
                    }

                    <h3 className="ml_title">More Like "{movie.title}"</h3>
                    {movie.recommendations.results ?
                        <MovieList list={movie.recommendations.results} />
                        : null
                    }

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
        recentlyViewed: state.recentlyViewed


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