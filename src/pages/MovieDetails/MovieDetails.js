import React, { useEffect } from 'react'
import movieService from './../../services/movieService'
import './MovieDetails.css'
import { connect } from 'react-redux'

const MovieDetails = ({ movie, baseUrl, displaySizeBg, displaySizeCard, setCurrMovie,setConfigForFetch,rec }) => {
    useEffect(() => {
        setTimeout(() => {
            async function getData() {

                await setCurrMovie()
                await setConfigForFetch()
                // await setRecommendations(movie.id)
            }
            if (!movie) {
                getData()

            }
        }, 3000)

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
                                <div> {movie.release_date} |&nbsp;&nbsp;</div>
                                <div> {movie.runtime} min |&nbsp;&nbsp;</div>


                            </div>

                            <h5>{movie.tagline}</h5>

                        </div>
                        <p className='overview_txt'> {movie.overview}</p>

                        <div className='img_bg_wrapper'>
                            <img className='img_bg' src={`${baseUrl}${displaySizeBg}${movie.backdrop_path}`} />
                        </div>
                        <div className='img_card_wrapper'>
                            <img src={`${baseUrl}${displaySizeCard}${movie.poster_path}`} />
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

                    {movie.trailers ?
                        <div className="trailers_container" >
                            {movie.trailers.map((trailer, idx) =>
                                <iframe key={idx} id="video" width="420" height="345"
                                    src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="20" allowFullScreen >
                                </iframe>

                            )}

                        </div>
                        : <p>no trailer available</p>
                    }
                        <h3>More Like {movie.title}</h3>
                    <div className='rec_container'>
                        {rec !== null?
                    rec.map((singleRec)=>
                         <div>
                    <img src={`${baseUrl}${displaySizeCard}${singleRec.poster_path}`} />
                        <div>{singleRec.title}</div>
                         </div>   
                        
                    )   
                    :<h5>No recommendations available</h5>

                   
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
        rec:state.recommended

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
        },
        // setRecommendations: async (movieId) => {
            
        //     // 
        // },
        setCurrMovie: async() => {
            let res = localStorage.getItem('currMovie')
            res = JSON.parse(res)
            dispatch({ type: 'SET_CURR_MOVIE', data: res })
            const results = await movieService.getRecommendations(res.id)
            dispatch({ type: 'SET_RECOMMENDATIONS', data: results })



        }
        // setReccomendationsMovies:()=>{
        //     let 
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)