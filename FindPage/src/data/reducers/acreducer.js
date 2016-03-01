import {ACSUCCESS, ACFAILED, ACSTART, ACRESET, NEXT_AUTOCOMPLETE_ALTERNATIVE, PREVIOUS_AUTOCOMPLETE_ALTERNATIVE, RESET_AUTOCOMPLETE_ALTERNATIVE} from '../actionCreators'

export function autocompleteReducer(state = {list:[], selectedIndex:-1}, action) {
    switch (action.type) {
        case ACSUCCESS:
            return Object.assign({}, state, {
                list: action.response
            })
        case ACRESET:
            return Object.assign({}, state, {
                list: []
            })
        case NEXT_AUTOCOMPLETE_ALTERNATIVE:
            if(state.list.length > 0){
                if(state.selectedIndex + 1 >= state.list.length){
                    return state  
                } else {
                    return Object.assign({}, state, {
                        selectedIndex: state.selectedIndex + 1
                    });
                }                
            }
            else {
                return Object.assign({}, state, {
                   selectedIndex: -1 
                });
            }                                
        case PREVIOUS_AUTOCOMPLETE_ALTERNATIVE:
            if(state.list.length > 0){
                if(state.selectedIndex - 1 < -1){
                    return state  
                } else {
                    return Object.assign({}, state, {
                        selectedIndex: state.selectedIndex - 1
                    });
                }                
            }
            else {
                return Object.assign({}, state, {
                   selectedIndex: -1 
                });
            }             
        case RESET_AUTOCOMPLETE_ALTERNATIVE:
            return Object.assign({}, state, {
                selectedIndex: -1
            })
        default:
            return state
    }
}