import axios from 'axios'
export default {
    getInputResults,
    getHttpReqConfig,
    getPopularList,
    getUpcomingList,
    getCurrMovieData,
    getRecommendations
}
const API = '5c90c388a02f4e1f5527d7ab55af038f'

async function getInputResults(userInput) {
    let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${userInput}`)
    console.log('this is res', res)
    return res.data.results

}
async function getHttpReqConfig() {
    let res = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${API}`)
    console.log('res.data.images.poster_sizes',res.data.images.poster_sizes)
    console.log('res.data.images.poster_sizes',res.data.images.poster_sizes[5])
    let displaySizeCard = res.data.images.poster_sizes[2]
    let displaySizeBg = res.data.images.poster_sizes[6]
    let baseUrl = res.data.images.secure_base_url
    return { displaySizeCard,displaySizeBg, baseUrl }
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
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US`)
    let trailers = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API}&language=en-US`)
    res.data.trailers = trailers.data.results
    localStorage.setItem('currMovie', JSON.stringify(res.data))

    return res.data
}

async function getRecommendations(movieId){
let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API}&language=en-US&page=1`)
return res.data.results
}
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