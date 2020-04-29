const INITIAL_STATE = {
    inputResults: null,
    displaySizeCard: '',
    displaySizeBg: '',
    displaySizeWlBg: '',
    baseUrl: '',
    popularList: null,
    upcomingList: null,
    currMovie: null,
    recommended: null,
    watchList: [],
    recentlyViewed: [],
    isShowSucMsg: '',
    isDark: false
    // genresList:null
}
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_INPUT_RESULTS':
            return { ...state, inputResults: action.data }
        case 'SET_HTTP_REQ_CONFIG':
            return {
                ...state,
                displaySizeCard: action.data.displaySizeCard,
                displaySizeBg: action.data.displaySizeBg,
                displaySizeWlBg: action.data.displaySizeWlBg,
                baseUrl: action.data.baseUrl,
                // genresList: action.data.genresList
            }
        case 'SET_POPULAR_LIST':
            return { ...state, popularList: action.data }
        case 'SET_UPCOMING_LIST':
            return { ...state, upcomingList: action.data }
        case 'SET_CURR_MOVIE':
            return { ...state, currMovie: action.data }
        case 'SET_ADD_WATCHLIST':
            return { ...state, watchList: action.data }
        case 'SET_DELETE_WATCHLIST':
            return { ...state, watchList: action.data }
        case 'SET_WATCHLIST':
            return { ...state, watchList: action.data }
        case 'ADD_TO_RECENTLY_VIEWED':
            return { ...state, recentlyViewed: action.data }
        case 'LOAD_RECENTLY_VIEWED':
            return { ...state, recentlyViewed: action.data }
        case 'SET_SHOW_SUC_MSG':
            return { ...state, isShowSucMsg: action.data }
        case 'SET_DARK_MODE':
            return { ...state, isDark: action.data }

    }

    return state
}
export default reducer;