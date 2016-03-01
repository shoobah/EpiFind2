import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/searchInputStyle'
import Lang from '../../config/lang.json'

export default Radium(({lang, qText, list, handleDymClick, basecolor}) => {
    if (!list || list.length === 0) {
        return null
    }
    let local = Lang[lang]
    let liList = []
    list.map((item, index) => {
        if (qText != item.query) {
            liList.push(
                <li key={'dym' + index} style={Styles.dymItem}  onClick={handleDymClick.bind(this, item.query)}>{item.query}</li>
            )
        }
    })
    if(!liList || liList.length === 0) return null
    return (
        <div style={[Styles.dymDiv, Styles[basecolor]]}>
            <span>{local.didyoumean}</span>
            <ul style={Styles.dymList}>
                {liList}
            </ul>
        </div>
    )
})