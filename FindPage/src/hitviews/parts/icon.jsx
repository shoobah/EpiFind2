import React  from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'

function getIcon(ext) {
    if(Config.knownExtensions.indexOf(ext) === -1){
        ext = "unknown"
    }
    return <img style={Styles.searchhiticon} src={Config.pathPrefix + '/images/Find/' + ext + '.png'} />
}

export default Radium(({ext}) => {
    return (getIcon(ext))
})
