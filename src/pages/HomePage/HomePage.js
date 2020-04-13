import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './HomePage.css';
import UserInput from '../../cmps/UserInput/UserInput'
import MoviePreview from '../../cmps/MoviePreview/MoviePreview'
import movieService from '../../services/movieService';

const API = '5c90c388a02f4e1f5527d7ab55af038f'

const HomePage = ({ inputResults, setConfigForFetch, setPopularList, popularList, setUpcomingList, upcomingList, baseUrl, displaySizeCard }) => {
    const [userInput, setUserInput] = useState('')

    //fetch more details about a movie
    const detailsUrl = id => `https://api.themoviedb.org/3/search/movie/${id}?api_key=${API}`

    useEffect(
        () => {
            async function getData() {
                await setConfigForFetch()
                await setPopularList()
                await setUpcomingList()
            }
            getData()
        }
        , [])

    const inputResult = (value) => {
        setUserInput(value)
    }

    return (
        <div>
            <UserInput inputResult={inputResult} />
            <h1 className="sub_title">Popular Movies</h1>
            <div className="movies_container">
                {popularList
                    ? popularList.map((movieData, idx) =>
                        <div key={idx} className="movie_item">
                            {movieData.poster_path ?

                                <MoviePreview imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} />
                                : null
                            }
                        </div>
                    )
                    : null
                }
            </div>
            {userInput ?
                <div>

                    <h1 className="sub_title">Search Results for {userInput}</h1>
                    <div className="movies_container">
                        {inputResults
                            ? inputResults.map((movieData, idx) =>
                                <div key={idx} className="movie_item">
                                    {movieData.poster_path ?
                                        <MoviePreview imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} />
                                        : null
                                    }
                                </div>
                            )
                            : <div className="loader" />
                        }
                    </div>
                </div>
                : null
            }
            <h1 className="sub_title">Coming soon...</h1>
            <div className="movies_container">
                {upcomingList
                    ? upcomingList.map((movieData, idx) =>
                        <div key={idx} className="movie_item">
                            {movieData.poster_path ?
                                <MoviePreview imgUrl={`${baseUrl}${displaySizeCard}${movieData.poster_path}`} data={movieData} />
                                : null
                            }
                        </div>
                    )
                    : <div className="loader" />
                }
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        inputResults: state.inputResults,
        displaySizeCard: state.displaySizeCard,
        baseUrl: state.baseUrl,
        popularList: state.popularList,
        upcomingList: state.upcomingList
    }
}
const mapDIspatchToProps = dispatch => {
    return {
        setConfigForFetch: async () => {
            const httpsConfig = await movieService.getHttpReqConfig()
            dispatch({ type: 'SET_HTTP_REQ_CONFIG', data: httpsConfig })
        },
        setPopularList: async () => {
            const popularList = await movieService.getPopularList()
            dispatch({ type: 'SET_POPULAR_LIST', data: popularList })
        },
        setUpcomingList: async () => {
            const upcomingList = await movieService.getUpcomingList()
            dispatch({ type: 'SET_UPCOMING_LIST', data: upcomingList })
        }
    }
}
export default connect(mapStateToProps, mapDIspatchToProps)(HomePage)