import axios from 'axios'
export default {
    getInputResults,
    getHttpReqConfig,
    getPopularList,
    getUpcomingList,
    getCurrMovieData,
    loadWatchList,
    addToRecentlyList,
    loadRecentlyList,
    numToDisplay,
    handaleWatchList,


}
const API = '5c90c388a02f4e1f5527d7ab55af038f'

async function getInputResults(userInput = null) {
    let res;
    if (!userInput) {
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

async function getCurrMovieData(movieId) {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US&append_to_response=videos,recommendations,credits`)
    console.log('res is (with append to response, did you see also recommendations?', res.data)
    localStorage.setItem('currMovie', JSON.stringify(res.data))

    return res.data
}

function handaleWatchList(watchList, movie) {
    var index;
    let isAdded = true
    let newWatchList = []
    let item = watchList.filter((watch, idx) => {
        if (watch.id === movie.id) index = idx;
        return watch.id === movie.id
    })
    if (item.length) {
        newWatchList = DeleteFromWatchList(index, watchList)
        isAdded = false
        return { newWatchList, isAdded }
    }
    else {
        newWatchList = addToWatchList(movie, watchList)
        isAdded = true
        return { newWatchList, isAdded }
    }
}


function addToWatchList(movie, watchList) {
    console.log('addfunction')
    watchList.push(movie)
    localStorage.setItem('watchList', JSON.stringify(watchList))
    return watchList
}
function DeleteFromWatchList(index, watchList) {
    console.log('movieService delete from watchList')
    console.log('index', index)
    console.log('watchList', watchList)
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


function numToDisplay(num) {
    num = num.toString()
    if (num.length === 5) {
        num = num.substring(0, 2)
        return `${num}K`
    }
    else if (num.length === 6) {
        num = num.substring(0, 3)
        return `${num}K`
    }
    else if (num.length === 7) {
        num = num.substring(0, 1)
        return `${num}M`
    }
    else if (num.length === 8) {
        num = num.substring(0, 2)
        return `${num}M`
    }
    else if (num.length === 9) {
        num = num.substring(0, 3)
        return `${num}M`
    }
    else if (num.length === 10) {
        num = num.substring(0, 4)
        return `${num}M`
    }
    else if (num.length === 11) {

        num = num.substring(0, 1)
        return `${num}B`
    }
}



