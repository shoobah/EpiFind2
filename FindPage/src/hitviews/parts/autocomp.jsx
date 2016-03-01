import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/searchInputStyle'

export default Radium(({list, handleAcClick, basecolor, highlight, selectedIndex, handleKeyDown}) => {
    if(!list || list.length===0){
        return null
    }
                    
    return (
        <div style={[Styles.autoCompleteList]}>            
            {list.map((item, index) => (                
                <div key={'ac' + index} style={[Styles.autoCompleteItem, index+1 === list.length ? Styles.autoCompleteItemLast : null, selectedIndex === index ? Styles.autoCompleteSelected : null]} onClick={handleAcClick.bind(this, item)} onKeyDown={handleKeyDown}>
                    <b>{highlight}</b>
                    {item.replace(highlight, "")}
                </div>
            ))}            
        </div>
    )
})