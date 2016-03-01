import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Icon from './parts/icon'
import Excerpt from './parts/excerpt'
import Styles from '../style/hitListStyle'

export default Radium(({hit, id, lang}) => (
    <div style={Styles.hitBase} data-type={hit.TypeName} className={'find_result'}>
      <div key={'hitIcon-' + id} style={Styles.hitIcon}>
        <Icon ext={'null'} />
      </div>
      <div style={Styles.hitContent}>
        <a style={Styles.title} href={Config.pathPrefix + hit.Url}>{hit.Title}</a><br/>
        <Excerpt excerpt={hit.Excerpt} key={'exc' + id}/>
      </div>
    </div>
  ))