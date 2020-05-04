import axios from 'axios'
export default {
    getInputResults,
    getHttpReqConfig,
    getPopularList,
    getUpcomingList,
    getCurrMovieData,
    addToWatchList,
    DeleteFromWatchList,
    loadWatchList,
    addToRecentlyList,
    loadRecentlyList,
    setIsDarkMode

}
const API = '5c90c388a02f4e1f5527d7ab55af038f'

async function getInputResults(userInput = null) {
    let res;
    if (!userInput) {
        console.log('in the if !userInput')
        res = localStorage.getItem('inputResults')
        res = JSON.parse(res)
    }
    else {
        res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${userInput}`)
        res = res.data.results
        res.push({ userInput: userInput })
        localStorage.setItem('inputResults', JSON.stringify(res))
    }

    return res

}
async function getHttpReqConfig() {
    let baseUrl;
    let displaySizeCard;
    let displaySizeBg;
    let displaySizeWlBg;
    if (localStorage.getItem('generalConfig') === null) {
        let res = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${API}`)
        console.log('getHttpReqConfig function:', res)
        displaySizeCard = res.data.images.poster_sizes[2]
        displaySizeBg = res.data.images.poster_sizes[6]
        displaySizeWlBg = res.data.images.poster_sizes[5]
        baseUrl = res.data.images.secure_base_url
        localStorage.setItem('generalConfig', JSON.stringify({ displaySizeCard, displaySizeBg, displaySizeWlBg, baseUrl }))
        return { displaySizeCard, displaySizeBg, baseUrl, displaySizeWlBg }
    }
    else {
        let generalConfig = localStorage.getItem('generalConfig')
        generalConfig = JSON.parse(generalConfig)
        return generalConfig

    }
}

async function getPopularList() {
    if (localStorage.getItem('popularList') === null) {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=1`)
        localStorage.setItem('popularList', JSON.stringify(res.data.results))
        return res.data.results
    }
    else {
        let res = localStorage.getItem('popularList')
        res = JSON.parse(res)
        return res
    }
}

async function getUpcomingList() {
    if (localStorage.getItem('upcomingList') === null) {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1`)
        localStorage.setItem('upcomingList', JSON.stringify(res.data.results))
        return res.data.results
    }
    else {
        let res = localStorage.getItem('upcomingList')
        res = JSON.parse(res)
        return res
    }
}
// https://api.themoviedb.org/3/movie/419704/credits?api_key=5c90c388a02f4e1f5527d7ab55af038f


async function getCurrMovieData(movieId) {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US&append_to_response=videos,recommendations,credits`)
    console.log('res is (with append to response, did you see also recommendations?', res.data)
    localStorage.setItem('currMovie', JSON.stringify(res.data))

    return res.data
}



function addToWatchList(movie, watchList) {
    watchList.push(movie)
    localStorage.setItem('watchList', JSON.stringify(watchList))
    return watchList
}
function DeleteFromWatchList(index, watchList) {
    watchList.splice(index, 1)
    localStorage.setItem('watchList', JSON.stringify(watchList))
    return watchList
}

function loadWatchList() {
    if (localStorage.getItem('watchList') === null)
        return false
    else {
        let watchList = localStorage.getItem('watchList')
        watchList = JSON.parse(watchList)
        return watchList
    }
}

async function addToRecentlyList(movie, recentlyList) {
    if (movie) {

        const idx = recentlyList.findIndex(element => {
            return element.id === movie.id
        })
        if (idx !== -1) {
            recentlyList.splice(idx, 1)
            recentlyList.unshift(movie)
        }
        else recentlyList.unshift(movie)
    }
    if (recentlyList.length >= 20) recentlyList.splice(-1, 1)
    localStorage.setItem('recentlyList', JSON.stringify(recentlyList))
    return recentlyList
}
function loadRecentlyList() {
    if (localStorage.getItem('recentlyList') === null) return false
    else {
        let recentlyList = localStorage.getItem('recentlyList')
        recentlyList = JSON.parse(recentlyList)
        return recentlyList
    }

}

async function setIsDarkMode(isDark) {
    console.log('movieService isDark:', isDark)
    let res;
    // console.log('isDark is', isDark)
    if (isDark === false || isDark === true) {
        localStorage.setItem('DarkMode', JSON.stringify(isDark))
        res = isDark
    }
    else {
        // console.log('in the else isDark:', isDark)
        res = await localStorage.getItem('DarkMode')

    }

    console.log('res before return', res)
    return res

}



// async function getGenresByName(genresIds) {
//     let genresToRender = [];
//     const allGenres = await getGenresList()
//     console.log('allGenres',allGenres)
//     genresIds.forEach(id => {
//         let genreToRender = allGenres.find(genre => genre.id === id)
//         console.log('genreToRender',genreToRender)
//         if (genreToRender) genresToRender.push(genreToRender)
//     })
//     return genresToRender
// }
// function getInputResults(userInput){
    //     fetch(searchUrl(userInput))
    //     .then(res => res.json())
    //     .then(data => {
        //         console.log('data by search is ', data.results)
        //         // setImgsUrl(data.results)
        //         let res = data.results
        //         return res

        //     })

        // }


        //  const fetchUpcomingList = () => `https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1`
        // const getUpcomingList = () => {
            //     fetch(fetchUpcomingList())
            //         .then(res => res.json())
            //         .then(data => setUpcomingImgs(data.results))
            // }

