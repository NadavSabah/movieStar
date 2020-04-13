const INITIAL_STATE = {
    inputResults: '',
    displaySizeCard: '',
    displaySizeBg: '',
    baseUrl: '',
    popularList: null,
    upcomingList: null,
    currMovie: null,
    recommended:null
}
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_INPUT_RESULTS':
            return { ...state, inputResults: action.data }
        case 'SET_HTTP_REQ_CONFIG':
            return { ...state, displaySizeCard: action.data.displaySizeCard, displaySizeBg: action.data.displaySizeBg, baseUrl: action.data.baseUrl }
        case 'SET_POPULAR_LIST':
            return { ...state, popularList: action.data }
        case 'SET_UPCOMING_LIST':
            return { ...state, upcomingList: action.data }
        case 'SET_CURR_MOVIE':
            return { ...state, currMovie: action.data }
        case 'SET_RECOMMENDATIONS':
            return { ...state, recommended: action.data }
    }

    return state
}
export default reducer;