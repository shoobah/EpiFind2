import React from 'react'
import Radium from 'radium'
import Icon from './parts/icon'
import Config from 'config'
import Styles from '../style/hitListStyle'
import Breadcrumb from './parts/breadcrumb'

export default ({hit, style, titleStyle, key}) => (
    <div key={key + 'v'} style={Styles.hitBase} data-type={hit.TypeName} className={'find_result'}>
      <div key={'hitIcon-' + id} style={Styles.hitIcon}>
        <Icon ext={'html'} />
      </div>
      <div style={Styles.hitContent}>
        <a style={Styles.title} href={Config.pathPrefix + hit.Url}>{hit.Title}
            <img srcSet={Config.pathPrefix + hit.Url} style={{height: '100px'}} />
        </a>
        <Breadcrumb breadcrumbs={hit.Breadcrumb} />
      </div>
    </div>
)
