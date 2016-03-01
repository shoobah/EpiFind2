import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'

function getIcon(direction, onClick, show){
    if(!show){
        return <span></span>
    }
    let name = 'arrow_left1x'
    if(direction === 'right'){
        name = 'arrow_right1x'
    }
  return <img style={[Styles.arrow, Styles.noselect, Styles[direction]]} onClick={onClick} src={Config.pathPrefix + '/images/Find/' + name + '.png'} />
}

export default Radium(({direction, onClick, show}) => {
  return(getIcon(direction, onClick, show))
})
