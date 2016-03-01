import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'
import Lang from '../../config/lang.json'
import Arrow from './arrow'
import PageDirectLinks from './pagedirectlinks'

export default Radium(({lang, fwd, back, from, to, goto, total, status}) => {
    let local = Lang[lang]
    let showForward = true
    let showBack = true
    let divStyle = Styles.arrowBox
    if (status != 'success' && status != 'fetching' || status === 'fetching' && total === 0) return null
    if (status === 'fetching') {
        divStyle = [Styles.arrowBox, Styles.faded]
    }
    if(from === 1)
    {
        showBack=false
    }
    if(to >= total)
    {
        showForward=false
    }
    return (
        <div style={divStyle}>
            <Arrow direction={'left'} onClick={back} show={showBack} />
            <PageDirectLinks from={from} to={to} total={total}  goto={goto}/>
            <Arrow direction={'right'} onClick={fwd} show={showForward}/>
        </div>
    )
})