import { SEARCHSTART, SEARCHSUCCESS, SEARCHFAILED, CLEARHITS, SETQUERY, SETTABS, RESETTABS } from '../actionCreators'

let startState = {
    isEditing: false,
    fetchFailed: false,
    message: '',
    hits: [],
    total: 0,
    pageTotal: 0,
    docTotal: 0,
    page: 0,
    cast: [],
    tabList: [
        {
            Name: 'Alla',
            Type: '',
            IsActive: true
        },
        {
            Name: 'Sidor',
            Type: 'page'
        },
        {
            Name: 'Dokument',
            Type: 'doc'
        }
    ],
    query: {
        Text: '',
        Take: 10,
        Skip: 0,
        Order: '',
        MinDate: '1970-01-01',
        Type: '',
        Extensions: [],
    }
}

export function findReducer(state = startState, action) {
    switch (action.type) {
        case SEARCHSTART:
            return Object.assign({}, state, {
                status: 'fetching',
                fetchFailed: false,
                autocomplete: []                
            })
        case SEARCHSUCCESS:
            return Object.assign({}, state, {
                fetchFailed: false,
                status: 'success',
                message: action.message,
                hits: action.response.Hits,
                total: action.response.Total,
                query: action.query,
                cats: action.response.CategoriesList,
                pageTotal: action.response.PageTotal,
                docTotal: action.response.DocTotal
            })
        case SEARCHFAILED:
            return Object.assign({}, state, {
                status: 'failed',
                fetchFailed: true,
                message: action.message
            })
        case CLEARHITS:
            return Object.assign({}, state, {
                hits: [],
                status: 'clearing',
                total: 0,
                page: 0,
            })
        case SETQUERY:
            return Object.assign({}, state, {
                status: 'editing',
                query: action.query
            })
        case SETTABS:
            return Object.assign({}, state, {
                status: 'tabbing',
                tabList: action.tabList
            })
        case RESETTABS:
            return Object.assign({}, state, {
                status: 'tabbing',
                tabList: [
                    {
                        Name: 'Alla',
                        Type: '',
                        IsActive: true
                    },
                    {
                        Name: 'Sidor',
                        Type: 'page'
                    },
                    {
                        Name: 'Dokument',
                        Type: 'doc'
                    }                    
                ]
            })
        default:
            return state
    }
}
