import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'

function getIcon(ext){
  return <img style={Styles.waitGifImage} src={Config.pathPrefix + '/images/Find/wait.gif'} />
}

export default Radium(({ext}) => {
  return(
        <div style={Styles.waitGif}>
          {getIcon()}
        </div>
    )
})
