import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './HomePage.css';
import UserInput from '../../cmps/UserInput/UserInput'
import MovieList from '../../cmps/MovieList/MovieList'
import movieService from '../../services/movieService';
import addThis from '../../cmps/addthis/adddthis'
import yellow_star from './../../assets/imgs/star.svg'


const API = '5c90c388a02f4e1f5527d7ab55af038f'

const HomePage = ({ inputResults, setConfigForFetch, setPopularList, popularList, setUpcomingList,
    upcomingList, recentlyViewed, loadRecentlyList, getLastSearch, isDark }) => {
    const [userInput, setUserInput] = useState('')

    useEffect(
        () => {
            async function getData() {
                addThis.start()
                loadAddThis()

                await setConfigForFetch()
                await setPopularList()
                await setUpcomingList()
                await getLastSearch()

                if (!recentlyViewed.length) loadRecentlyList()
                setTimeout(() => {

                }, 3000)
            }
            getData()
        }
        , [])



    const inputResult = (value) => {
        setUserInput(value)
    }
    const loadAddThis = () => {
        return (
            <div className="share_wrapper">
                <div className="addthis_inline_share_toolbox"></div>
            </div>

        )
    }

    return (
        <div>

            <UserInput inputResult={inputResult} />
            {inputResults ?
                <div className={(isDark ? "dark_bg" : "bright_bg")}>
                    {inputResults ?
                        <MovieList title={'SEARCH RESULT'} list={inputResults} />
                        : null
                    }
                </div>
                : null
            }
            {popularList ?
                <MovieList list={popularList} title={'POPULAR MOVIES'} />
                : null
            }
            <div className="light">


                {upcomingList ?
                    <div className={isDark ? "dark_bg" : "bright_bg"}>

                        <MovieList list={upcomingList} title={'COMING SOON'} />
                    </div>
                    : null
                }
            </div>
            {recentlyViewed.length ?
                <MovieList list={recentlyViewed} title={'RECENTLY VIEWED'} />
                : <div>
                    <h1 className='sub_title'>Recently Viewed</h1>
                    <h3 className='rv_no_history'>No history for now...</h3>
                </div>
            }
            <footer className="footer">


                <div className="follow_wrapper">
                    <img className="star_foot" src={yellow_star} />
                    <p className="share_title">MOVIESTAR APP</p>
                    <img className="star_foot" src={yellow_star} />
                </div>
                {/* <div className="add-this"></div> */}
                {loadAddThis()}
            </footer>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        inputResults: state.inputResults,
        displaySizeCard: state.displaySizeCard,
        baseUrl: state.baseUrl,
        popularList: state.popularList,
        upcomingList: state.upcomingList,
        watchList: state.watchList,
        recentlyViewed: state.recentlyViewed,
        isDark: state.isDark
    }
}
const mapDIspatchToProps = dispatch => {
    return {
        getLastSearch: async () => {
            const inputResults = await movieService.getInputResults()
            dispatch({ type: 'SET_INPUT_RESULTS', data: inputResults })
        },
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
        },
        loadRecentlyList: async () => {
            let recentlyList = await movieService.loadRecentlyList()
            if (recentlyList) {
                dispatch({ type: 'LOAD_RECENTLY_VIEWED', data: recentlyList })

            }
            else return
        },


    }
}


export default connect(mapStateToProps, mapDIspatchToProps)(HomePage)

