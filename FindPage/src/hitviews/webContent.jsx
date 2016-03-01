import React from 'react'
import Radium from 'radium'
import Config from 'config'
import Icon from './parts/icon'
import Breadcrumb from './parts/breadcrumb'
import Excerpt from './parts/excerpt'
import Styles from '../style/hitListStyle'

export default Radium(({hit, style, titleStyle, id, lang}) => (
    <div style={Styles.hitContent} data-type={hit.TypeName} className={'find_result'}>
      <div>
        <Icon ext={'rss'} />
        <a style={Styles.title} href={hit.Url}>{hit.Title}</a><br/>
      </div>
      <div>
        <Excerpt excerpt={hit.Excerpt} key={'exc' + id}/>
        <Breadcrumb breadcrumbs={hit.Breadcrumb} />
      </div>
    </div>
  ))
