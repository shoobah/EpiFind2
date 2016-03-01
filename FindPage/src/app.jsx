import React             from 'react'
import HitList           from './hitlist'
import SearchInput       from './searchinput'
import { connect }       from 'react-redux'
import Moment            from 'moment'
import Radium            from 'radium'
import {StyleRoot}       from 'radium'
import Lang              from './config/lang.json'
import { createHistory } from 'history'
import Styles            from './style/mainStyle'
import { doSearch, clearHits, setQuery, setTabs, getAutoComplete, autoCompleteReset, getDYM, dymReset, resetTabs, nextAutocompleteAlternative, previousAutocompleteAlternative, resetAutocompleteAlternative } from './data/actionCreators'

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, '%20') )
        }
    }
    return null
}

let unlisten = null

/**
 * En "smart" komponent som innehåller nästan all logik
 */
@Radium
class App extends React.Component {
    /** @constructor */
    constructor(props) {
        super(props)
        this.myQuery = {}
        this.history = createHistory()        
    }
    
    /** Hantera tangenttryck i sökrutan */
    handleText(e) {
        let newQ = Object.assign({}, this.props.query, {
            Text: e.target.value
        })
        this.props.setQuery(newQ)
        if (e.target.value && e.target.value.length > 2) {
            this.props.getAutoComplete(e.target.value)
        } else {
            this.props.autoCompleteReset()
        }
        this.forceUpdate()
    }

    /** 
     * Lägg till fält som ska finnas med i alla frågor, hämtar info från data- attribut
     * i root taggen. Kommer från EPi-egenskaper på find sidan.
     */
    addDataFields(q) {
        return Object.assign({}, q, {
            SearchRoot: this.props.searchroot,
            IncludeConnectors: this.props.connectors,
            IncludeMediafiles: this.props.mediafiles,
            SearchLanguage: this.props.searchlanguage
        })
    }

    handleKeyPress(e) {
        e.stopPropagation()
        if (e.which === 13) { //enter
            this.props.resetTabs()
            this.props.clearHits();
            
            let newQ;
            if(this.props.autocompleteSelectedIndex === -1){
                newQ = Object.assign({}, this.props.query, {
                Type: '',
                Skip: 0,
                Text: e.target.value,
            }, this.addDataFields())
            } else {
                newQ = Object.assign({}, this.props.query, {
                    Type: '',
                    Skip: 0,
                    Text: this.props.autocompleteList[this.props.autocompleteSelectedIndex]
                }, this.addDataFields())
            }
            
            this.props.resetTabs()                
            this.props.dymReset()                        
            this.updateQueryAndDoSearch(newQ)                        
            //väntar på att autoComplete ska köras färdigt, går den långsammare än 1 sekund, blir det problem.
            setTimeout(function(){
                this.props.autoCompleteReset();
                this.props.resetAutocompleteAlternative();
            }.bind(this), 1000);
            e.preventDefault()
        }
        else if(e.which === 38){ //uppknapp                      
           this.props.previousAutocompleteAlternative();          
        }
        else if(e.which === 40) { //nedknapp                        
            this.props.nextAutocompleteAlternative();            
        } 
    }

    handleFindClick() {
        let newQ = Object.assign({}, this.props.query, {
            Type: '',
            Skip: 0
        }, this.addDataFields())
        this.props.resetTabs()
        this.props.dymReset()
        this.updateQueryAndDoSearch(newQ)
    }

    handleAcClick(term) {
        let newQ = Object.assign({}, this.props.query, {
            Type: '',
            Text: term
        }, this.addDataFields())
        this.props.resetTabs()
        this.props.dymReset()
        this.updateQueryAndDoSearch(newQ)
    }

    handleDymClick(term) {
        let newQ = Object.assign({}, this.props.query, {
            Type: '',
            Text: term
        }, this.addDataFields())
        this.props.resetTabs()
        this.updateQueryAndDoSearch(newQ)
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    handleForward() {
        if (this.props.query.Skip + this.props.query.Take < this.props.total) {
            let newQ = Object.assign({}, this.props.query, {
                Skip: this.props.query.Skip + this.props.query.Take,
            }, this.addDataFields())
            this.updateQueryAndDoSearch(newQ)
        }
    }

    handleBackward() {
        if (this.props.query.Skip - this.props.query.Take >= 0) {
            let newQ = Object.assign({}, this.props.query, {
                Skip: this.props.query.Skip - this.props.query.Take
            }, this.addDataFields())
            this.updateQueryAndDoSearch(newQ)
        }
    }
    handleGoto(page) {
        let newQ = Object.assign({}, this.props.query, {
            Skip: this.props.query.Take * (page-1)
        }, this.addDataFields())
        this.updateQueryAndDoSearch(newQ)
    }

    handleTabClick(type) {
        let newTabs = []
        this.props.tabList.forEach((item) => {
            let newItem = Object.assign({}, item)
            newItem.IsActive = false
            if (newItem.Type === type) {
                newItem.IsActive = true
                
            }
            newTabs.push(newItem)
        })
        this.props.setTabs(newTabs)
        let newQ = Object.assign({}, this.props.query, {
            Type: type,
            Skip: 0
        }, this.addDataFields())
        this.updateQueryAndDoSearch(newQ)
    }
    
    handleBlur(){
        setTimeout(function(){this.props.autoCompleteReset();}.bind(this), 500);
    }

    removeUrlQuery() {
        this.history.push({
            ...location,
            search: ''
        })
}

updateQueryAndDoSearch(queryObject) {    
    this.props.autoCompleteReset()
    this.props.resetAutocompleteAlternative()
    this.removeUrlQuery()
    this.props.setQuery(queryObject)    
    this.props.getDYM(this.props.findURL, queryObject.Text)
    this.props.doSearch(queryObject)    
    window.scrollTo(0, 0);
}

componentDidMount() {
    Moment.locale(this.props.lang)
    let extQueryText = getQueryVariable('query')
    // let newQ = Object.assign({}, this.props.query, this.props.query)
    // this.props.setQuery(newQ)
    this.props.resetTabs();
    
    if (extQueryText) {
        let newQ = Object.assign({}, this.props.query, {
            Text: extQueryText
        }, this.addDataFields())
        this.updateQueryAndDoSearch(newQ)
    }
    
    unlisten = this.history.listen(location => { })    
}

componentWillUnmount() {
    unlisten()
}


render() {
    let lang = Lang[this.props.lang] ? this.props.lang : 'sv'
    return (
            <div key="mainDiv" style={Styles.baseContainer}>
                <SearchInput
                    handleText       = {this.handleText.bind(this) }
                    handleKeyPress   = {this.handleKeyPress.bind(this) }
                    handleBackward   = {this.handleBackward.bind(this) }
                    handleForward    = {this.handleForward.bind(this) }
                    handleFindClick  = {this.handleFindClick.bind(this) }
                    handleAcClick    = {this.handleAcClick.bind(this)}
                    handleDymClick   = {this.handleDymClick.bind(this)}
                    handleBlur       = {this.handleBlur.bind(this)}
                    query            = {this.props.query}
                    lang             = {lang}
                    cats             = {this.props.cats}
                    status           = {this.props.status}
                    tabList          = {this.props.tabList}
                    handleTabClick   = {this.handleTabClick.bind(this) }
                    total            = {this.props.total}
                    pagetotal        = {this.props.pageTotal}
                    doctotal         = {this.props.docTotal}
                    basecolor        = {this.props.basecolor}
                    autocompleteSI   = {this.props.autocompleteSelectedIndex}
                    autocompleteList = {this.props.autocompleteList}
                    dymList          = {this.props.dymList}
                    />
                <HitList
                    hits           = {this.props.hits}
                    total          = {this.props.total}
                    query          = {this.props.query}
                    failed         = {this.props.failed}
                    message        = {this.props.message}
                    handleBackward = {this.handleBackward.bind(this) }
                    handleForward  = {this.handleForward.bind(this) }
                    handleGoto     = {this.handleGoto.bind(this) }
                    lang           = {lang}
                    status         = {this.props.status}
                    />
            </div>
    )
}
}


function mapStateToProps(state) {
    return {
        query: state.find.query,
        total: state.find.total,
        pageTotal: state.find.pageTotal,
        docTotal: state.find.docTotal,
        hits: state.find.hits,
        failed: state.find.failed,
        message: state.find.message,
        cats: state.find.cats,
        status: state.find.status,
        tabList: state.find.tabList,
        autocompleteList: state.autocomplete.list,
        autocompleteSelectedIndex: state.autocomplete.selectedIndex,
        dymList: state.didyoumean.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doSearch: (query) => dispatch(doSearch(query)),
        setQuery: (query) => dispatch(setQuery(query)),
        clearHits: () => dispatch(clearHits()),
        setTabs: (tabs) => dispatch(setTabs(tabs)),
        resetTabs : () => dispatch(resetTabs()),
        getAutoComplete: (term) => dispatch(getAutoComplete(term)),
        autoCompleteReset: () => dispatch(autoCompleteReset()),
        getDYM: (term, url) => dispatch(getDYM(term, url)),
        dymReset: () => dispatch(dymReset()),
        nextAutocompleteAlternative: () => dispatch(nextAutocompleteAlternative()),
        previousAutocompleteAlternative: () => dispatch(previousAutocompleteAlternative()),
        resetAutocompleteAlternative: () => dispatch(resetAutocompleteAlternative())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
