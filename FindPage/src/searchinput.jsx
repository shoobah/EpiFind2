import React             from 'react'
import ReactDOM          from 'react-dom'
import Radium            from 'radium'
import Config            from 'config'

import AutoComplete      from './hitviews/parts/autocomp'
import DidYouMean from './hitviews/parts/didyoumean'
import Tabs       from './hitviews/parts/tabs'
import Wait       from './hitviews/parts/wait'
import Lang       from './config/lang.json'
import QueryInput from './hitviews/parts/queryInput'

import Style from './style/searchInputStyle'

export default Radium(({query, handleText, handleKeyPress, handleAcClick, handleDymClick, tabList, handleFindClick, handleTabClick, lang, status, total, pagetotal, doctotal, autocompleteList, autocompleteSI, basecolor,  dymList, handleBlur}) => {
    let dateOrderStyle = {}
    let relOrderStyle = {}
    let isDateOrder = query.Order === 'date'
    let local = Lang[lang]                  
    return (
        <div style={Style.siMain}>            
            <h4 style={[Style.tab, Style.topTab]}>Sökresultat</h4>            
            <div style={Style.siBase}>                                
                <QueryInput query={query} handleText={handleText.bind(this)} isFocused={autocompleteSI === -1} handleKeyPress={handleKeyPress.bind(this)} handleBlur={handleBlur.bind(this)}/>
                <img src={Config.pathPrefix + '/images/quick-search-button-icon.png'} type="button" style={Style.searchButton} value={local.find} onClick={handleFindClick.bind(this, query.Text) } />                
                <AutoComplete list={autocompleteList} basecolor={basecolor} selectedIndex={autocompleteSI} highlight={query.Text.replace(/\s*$/,"")} handleAcClick={handleAcClick.bind(this) }/>                
                <Tabs tabList={tabList} handleTabClick={handleTabClick.bind(this)} total={total} pagetotal={pagetotal} doctotal={doctotal} />
                {status === 'fetching' ? <Wait /> : null }
            </div>                     
        </div>
    )
})
