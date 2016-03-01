import {DYMSUCCESS, DYMFAILED, DYMSTART, DYMRESET} from '../actionCreators'

export function dymReducer(state = {list:[]}, action) {

    switch (action.type) {
        case DYMSUCCESS:
            return Object.assign({}, state, {
                list: action.response.hits
            })
        case DYMRESET:
            return Object.assign({}, state, {
                list: []
            })
        default:
            return state
    }
}
