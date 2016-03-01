import React from 'react'
import Radium from 'radium'
import Config from 'config'
import Icon from './parts/icon'
import Breadcrumb from './parts/breadcrumb'
import Excerpt from './parts/excerpt'
import Styles from '../style/hitListStyle'
import Arrow from './parts/arrow'

export default Radium(({hit, id, lang, key}) => (
    <div key={key + 'v'} style={Styles.hitBase} data-type={hit.TypeName} className={'find_result'}>
        <a key={'bca' + id} href={Config.pathPrefix + hit.Url} style={Styles.breadcrumbItem}>
            <div key={'hitIcon-' + id} style={Styles.hitIcon}>
                <Icon ext={'html'} />
            </div>
            <div style={Styles.hitContent}>
                <span style={Styles.title} dangerouslySetInnerHTML={{__html:hit.Title}}>
                </span>
                <Excerpt excerpt={hit.Excerpt} key={'exc' + id}/>
            </div>
            <Breadcrumb breadcrumbs={hit.Breadcrumb} links={false} />
        </a>
    </div>
))
